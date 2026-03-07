import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Tuple, LogEntry, Snapshot, MachineData } from '../types/TmTuple';

const INIT_ROWS = 2;
const INIT_COLS = 4;
const MAX_ROWS = 32;
const MAX_COLS = 10;
const MAX_STEPS = 10000;

function createInitialTable(): string[][] {
  return Array.from({ length: INIT_ROWS }, (_, row) =>
    Array.from({ length: INIT_COLS }, (_, col) => {
      if (col === 0 && row !== 0) return `q${row - 1}`;
      return '';
    })
  );
}

function createInitialTape(): string[] {
  return Array.from({ length: 100 }, (_, i) => (i === 0 ? '>' : 'b'));
}

const initialTuple: Tuple = {
  states: [],
  alphabet: [],
  initState: 'q0',
  finState: '',
  transFunction: 'Tabela de transição',
  tapeDelimitator: '>',
  blank: 'b',
  nonFinalStates: [],
  tapeAlphabet: [],
};

interface TuringContextType {
  currentState: string;
  symbol: string;
  needle: number;
  instruction: string;
  steps: number;
  isRunning: boolean;
  speed: number;
  setSpeed: (ms: number) => void;

  table: string[][];
  setTable: React.Dispatch<React.SetStateAction<string[][]>>;
  updateTableCell: (row: number, col: number, value: string) => void;
  addRow: () => void;
  addColumn: () => void;
  removeRow: () => void;
  removeColumn: () => void;
  resetTable: () => void;

  tape: string[];
  updateTapeCell: (index: number, value: string) => void;
  resetTape: () => void;
  shift: number;
  setShift: React.Dispatch<React.SetStateAction<number>>;

  tuple: Tuple;
  setTuple: React.Dispatch<React.SetStateAction<Tuple>>;

  executeStep: () => void;
  toggleAuto: () => void;
  resetExecution: () => void;
  stopExecution: () => void;
  undoStep: () => void;
  loadMachine: (data: MachineData) => void;

  log: LogEntry[];

  error: string;
  setError: (msg: string) => void;
  showAboutModal: boolean;
  setShowAboutModal: (show: boolean) => void;
  showTupleModal: boolean;
  setShowTupleModal: (show: boolean) => void;
  showExamplesModal: boolean;
  setShowExamplesModal: (show: boolean) => void;
  tupleIndicator: boolean;
}

const TuringContext = createContext<TuringContextType | null>(null);

export function useTuring() {
  const ctx = useContext(TuringContext);
  if (!ctx) throw new Error('useTuring deve ser usado dentro de TuringProvider');
  return ctx;
}

export function TuringProvider({ children }: { children: ReactNode }) {
  const [currentState, setCurrentState] = useState('q0');
  const [symbol, setSymbol] = useState('>');
  const [needle, setNeedle] = useState(0);
  const [instruction, setInstruction] = useState('');
  const [steps, setSteps] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(500);

  const [table, setTable] = useState<string[][]>(createInitialTable);
  const [tape, setTape] = useState<string[]>(createInitialTape);
  const [tuple, setTuple] = useState<Tuple>(initialTuple);

  const [shift, setShift] = useState(0);

  const [log, setLog] = useState<LogEntry[]>([]);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);

  const [error, setError] = useState('');
  const [showAboutModal, setShowAboutModal] = useState(() => {
    return !localStorage.getItem('webtms_visited');
  });
  const [showTupleModal, setShowTupleModal] = useState(false);
  const [showExamplesModal, setShowExamplesModal] = useState(false);
  const [tupleIndicator, setTupleIndicator] = useState(false);

  // --- Tabela ---

  const updateTableCell = useCallback((row: number, col: number, value: string) => {
    setTable(prev => prev.map((r, ri) =>
      ri === row ? r.map((c, ci) => (ci === col ? value : c)) : r
    ));
    setError('');
    setIsRunning(false);
  }, []);

  const addRow = useCallback(() => {
    setTable(prev => {
      if (prev.length >= MAX_ROWS) return prev;
      const newRow = Array(prev[0].length).fill('');
      newRow[0] = `q${prev.length - 1}`;
      return [...prev, newRow];
    });
  }, []);

  const addColumn = useCallback(() => {
    setTable(prev => {
      if (prev[0].length >= MAX_COLS) return prev;
      return prev.map(row => [...row, '']);
    });
  }, []);

  const removeRow = useCallback(() => {
    setTable(prev => {
      if (prev.length <= 2) return prev;
      return prev.slice(0, -1);
    });
  }, []);

  const removeColumn = useCallback(() => {
    setTable(prev => {
      if (prev[0].length <= 2) return prev;
      return prev.map(row => row.slice(0, -1));
    });
  }, []);

  const resetTable = useCallback(() => {
    setTable(createInitialTable());
    setCurrentState('q0');
    setInstruction('');
    setError('');
    setIsRunning(false);
    setLog([]);
    setSnapshots([]);
  }, []);

  // --- Fita ---

  const updateTapeCell = useCallback((index: number, value: string) => {
    value = value.trim();
    setTape(prev => {
      const newTape = index >= prev.length - 30
        ? [...prev, ...Array(50).fill('b')]
        : [...prev];
      newTape[index] = value.length > 1 ? value[0] : value.length === 0 ? 'b' : value;
      return newTape;
    });
  }, []);

  const resetTape = useCallback(() => {
    setTape(createInitialTape());
    setIsRunning(false);
    setInstruction('');
    setError('');
    setNeedle(0);
    setSteps(0);
    setCurrentState('q0');
    setSymbol('>');
    setShift(0);
    setLog([]);
    setSnapshots([]);
  }, []);

  // --- Execução ---

  const executeStep = useCallback(() => {
    if (instruction === 'P') return;

    if (steps >= MAX_STEPS) {
      setError(`Limite de ${MAX_STEPS} passos atingido. A execução foi interrompida.`);
      setIsRunning(false);
      return;
    }

    if (!tuple.finState) {
      setError('Defina o estado final na Nôntupla');
      setTupleIndicator(true);
      setIsRunning(false);
      return;
    }

    const symbolIndex = table[0].indexOf(symbol);
    if (symbolIndex === -1 || symbol === '') {
      setError(`Símbolo "${symbol}" não encontrado no alfabeto de fita`);
      setIsRunning(false);
      return;
    }

    const stateIndex = table.findIndex(row => row[0] === currentState);
    if (stateIndex === -1) {
      setError(`Estado "${currentState}" inválido`);
      setCurrentState('q0');
      setInstruction('');
      setSymbol('>');
      setIsRunning(false);
      return;
    }

    const parts = table[stateIndex][symbolIndex].trim().split(/\s+/);
    if (parts.length !== 3) {
      setError(`Célula má formatada em ${currentState} lendo "${symbol}"`);
      setIsRunning(false);
      return;
    }

    const [nextState, writeSymbol, direction] = parts;

    if (!['R', 'L', 'P'].includes(direction)) {
      setError(`Instrução inválida em ${currentState} lendo "${symbol}"`);
      setIsRunning(false);
      return;
    }

    if (direction === 'P' && nextState !== tuple.finState) {
      setError('Função não pode terminar em um estado não-final. Edite na nôntupla');
      setTupleIndicator(true);
      setIsRunning(false);
      return;
    }

    if (!table[0].includes(writeSymbol)) {
      setError(`Símbolo "${writeSymbol}" não pertence ao alfabeto de fita.`);
      setIsRunning(false);
      return;
    }

    if (tape[needle] === '>' && writeSymbol !== '>') {
      setError('Não é possível sobrescrever o limitador de fita');
      setIsRunning(false);
      return;
    }

    if (direction === 'L' && needle <= 0) {
      setError('Fora do escopo da fita');
      setIsRunning(false);
      return;
    }

    // Salvar snapshot antes de aplicar
    setSnapshots(prev => [...prev, {
      currentState, symbol, needle, tape: [...tape], instruction, steps, shift,
    }]);

    setLog(prev => [...prev, {
      step: steps + 1,
      state: currentState,
      readSymbol: symbol,
      writeSymbol,
      direction,
      nextState,
    }]);

    // Aplicar mudanças
    const newTape = needle >= tape.length - 30
      ? [...tape, ...Array(50).fill('b')]
      : [...tape];
    newTape[needle] = writeSymbol;

    let newNeedle = needle;
    if (direction === 'R') {
      newNeedle = needle + 1;
      if (shift !== 0) setShift(prev => prev + 1);
    } else if (direction === 'L') {
      newNeedle = needle - 1;
      if (shift !== 0) setShift(prev => prev - 1);
    }

    setTape(newTape);
    setNeedle(newNeedle);
    setSymbol(newTape[newNeedle]);
    setCurrentState(nextState);
    setInstruction(direction);
    setSteps(prev => prev + 1);
    setError('');

    if (direction === 'P') {
      setIsRunning(false);
    }
  }, [currentState, symbol, needle, tape, table, tuple.finState, instruction, shift, steps]);

  const toggleAuto = useCallback(() => {
    if (instruction !== 'P') {
      setIsRunning(prev => !prev);
    }
  }, [instruction]);

  const resetExecution = useCallback(() => {
    setCurrentState('q0');
    setNeedle(0);
    setSymbol('>');
    setInstruction('');
    setSteps(0);
    setError('');
    setIsRunning(false);
    setShift(0);
    setLog([]);
    setSnapshots([]);
  }, []);

  const stopExecution = useCallback(() => {
    setIsRunning(false);
  }, []);

  const undoStep = useCallback(() => {
    if (snapshots.length === 0) return;
    const last = snapshots[snapshots.length - 1];
    setCurrentState(last.currentState);
    setSymbol(last.symbol);
    setNeedle(last.needle);
    setTape([...last.tape]);
    setInstruction(last.instruction);
    setSteps(last.steps);
    setShift(last.shift);
    setIsRunning(false);
    setError('');
    setSnapshots(prev => prev.slice(0, -1));
    setLog(prev => prev.slice(0, -1));
  }, [snapshots]);

  const loadMachine = useCallback((data: MachineData) => {
    setTable(data.table);
    const tapeData = data.tape.length > 0 ? data.tape : ['>'];
    setTape([...tapeData, ...Array(Math.max(0, 100 - tapeData.length)).fill('b')]);
    setTuple(prev => ({ ...prev, finState: data.finState }));
    setCurrentState('q0');
    setSymbol('>');
    setNeedle(0);
    setInstruction('');
    setSteps(0);
    setError('');
    setIsRunning(false);
    setShift(0);
    setLog([]);
    setSnapshots([]);
  }, []);

  // --- Execução automática ---
  const executeStepRef = useRef(executeStep);
  executeStepRef.current = executeStep;

  useEffect(() => {
    if (!isRunning || instruction === 'P') return;
    const timer = setTimeout(() => {
      executeStepRef.current();
    }, speed);
    return () => clearTimeout(timer);
  }, [isRunning, instruction, speed, steps]);

  // --- Atalhos de teclado ---
  const toggleAutoRef = useRef(toggleAuto);
  const undoStepRef = useRef(undoStep);
  toggleAutoRef.current = toggleAuto;
  undoStepRef.current = undoStep;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          toggleAutoRef.current();
          break;
        case 'ArrowRight':
          e.preventDefault();
          executeStepRef.current();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          undoStepRef.current();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // --- Atualizar tupla quando tabela muda ---
  useEffect(() => {
    const tapeAlph = table[0].slice(1).filter(el => el.length > 0);
    const alph = tapeAlph.filter(el => el !== '>' && el !== 'b');
    const states = Array.from(new Set([...table.map(row => row[0]).slice(1), tuple.finState]));
    const nonFinalStates = states.filter(el => el !== tuple.finState);

    setTuple(prev => ({
      ...prev,
      tapeAlphabet: tapeAlph,
      alphabet: alph,
      states,
      nonFinalStates,
    }));
  }, [table, tuple.finState]);

  // --- Timeout do indicador da tupla ---
  useEffect(() => {
    if (!tupleIndicator) return;
    const timer = setTimeout(() => setTupleIndicator(false), 10000);
    return () => clearTimeout(timer);
  }, [tupleIndicator]);

  const value: TuringContextType = {
    currentState, symbol, needle, instruction, steps, isRunning, speed, setSpeed,
    table, setTable, updateTableCell, addRow, addColumn, removeRow, removeColumn, resetTable,
    tape, updateTapeCell, resetTape, shift, setShift,
    tuple, setTuple,
    executeStep, toggleAuto, resetExecution, stopExecution, undoStep, loadMachine,
    log,
    error, setError,
    showAboutModal, setShowAboutModal,
    showTupleModal, setShowTupleModal,
    showExamplesModal, setShowExamplesModal,
    tupleIndicator,
  };

  return (
    <TuringContext.Provider value={value}>
      {children}
    </TuringContext.Provider>
  );
}
