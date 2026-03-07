export type Tuple = {
  states: Array<string>;
  alphabet: Array<string>;
  initState: string;
  finState: string;
  transFunction: string;
  tapeDelimitator: string;
  blank: string;
  nonFinalStates: Array<string>;
  tapeAlphabet: Array<string>;
};

export interface LogEntry {
  step: number;
  state: string;
  readSymbol: string;
  writeSymbol: string;
  direction: string;
  nextState: string;
}

export interface Snapshot {
  currentState: string;
  symbol: string;
  needle: number;
  tape: string[];
  instruction: string;
  steps: number;
  shift: number;
}

export interface MachineData {
  name?: string;
  description?: string;
  table: string[][];
  tape: string[];
  finState: string;
}
