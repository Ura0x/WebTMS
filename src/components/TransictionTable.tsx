import { useState, useEffect, useRef } from 'react'
import { handleFileUpload } from '../utils/FileReader';
import { exportTableAsCSV } from '../utils/ExportTable';
import type { Tuple } from '../types/TmTuple'




const maxRows = 32;
const maxColumns = 10;
const initRows = 2;
const initColumns = 4;

type Props = {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>
    symbol: string;
    setSymbol: React.Dispatch<React.SetStateAction<string>>
    setCell: React.Dispatch<React.SetStateAction<Array<string>>>
    flag: number;
    setFlag: React.Dispatch<React.SetStateAction<number>>;
    setInstruction: React.Dispatch<React.SetStateAction<string>>;
    setError: React.Dispatch<React.SetStateAction<string>>;
    setAuto: React.Dispatch<React.SetStateAction<boolean>>;
    tuple: Tuple;
    setTuple: React.Dispatch<React.SetStateAction<Tuple>>;
    setIsTupleModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    tupleIndicator: boolean;
    setTupleIndicator: React.Dispatch<React.SetStateAction<boolean>>;
};

function TransictionTable({state, setState, symbol, setSymbol, flag, setFlag, setInstruction, setCell, setError, setAuto, tuple, setTuple, setIsTupleModalOpen, tupleIndicator, setTupleIndicator}:Props) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [table, setTable] = useState<string[][]>(() =>
        Array.from({ length: initRows }, (_, rowIndex) =>
          Array.from({ length: initColumns }, (_, colIndex) => {
            if (colIndex === 0 && rowIndex !== 0) {
              return `q${rowIndex-1}`;
            }
            return "";
          })
        )
      );

    const resetTable = () => {
        setTable(Array.from({ length: initRows }, (_, rowIndex) =>
        Array.from({ length: initColumns }, (_, colIndex) => {
            if (colIndex === 0 && rowIndex !== 0) {
            return `q${rowIndex-1}`;
            }
            return "";
        })
        ))
        setState("q0");
        setInstruction("");
        setError('')
        setAuto(false)
    }

    const handleTableChange = (row: number, col: number, value: string) => {
        const newTable = [...table];
        newTable[row][col] = value;
        setTable(newTable);
        setError('')
        setAuto(false)
    };

    const addRow = () => {
        if (table.length >= maxRows) return;
        const newRow = Array(table[0].length).fill("");
        newRow[0] = `q${table.length-1}`
        setTable([...table, newRow]);
    };

    const addColumn = () => {
        if (table[0].length >= maxColumns) return;
        const updated = table.map((row) => [...row, ""]);
        setTable(updated);
    };

    useEffect(() => {
        if (flag == 1) {
            if (!tuple.finState) {
                setError("Defina o estado final na Nôntupla")
                setFlag(0);
                setAuto(false);
                setTupleIndicator(true);
                return;
            }
            const symbolIndex = table[0].indexOf(symbol)
            if (symbolIndex == -1 || symbol == '') {
                setError(`Símbolo "${symbol}" não encontrado no alfabeto de fita`);
                setFlag(0);
                setAuto(false);
                return;
            }

            const stateIndex = table.findIndex(subArray => subArray[0] === state) 
            if (stateIndex == -1) {
                setError(`Estado "${state}" inválido`);
                setFlag(0);
                setState("q0");
                setInstruction("");
                setSymbol(">")
                setAuto(false);

                return;
            }

            const cell = table[stateIndex][symbolIndex].split(" ");

            if (cell.length != 3) {
                setError(`Célula má formatada em ${state} lendo "${symbol}"`);
                setFlag(0);
                setAuto(false);

                return;
            }

            if (cell[2] == 'P' && cell[0] != tuple.finState) {
                setError('Função não pode terminar em um estado não-final. Edite na nôntupla')
                setTupleIndicator(true);
                setFlag(0);
                setAuto(false);

                return;
            }

            if (!['R', 'L', 'P'].includes(cell[2])) {
                setError(`Instrução inválida em ${state} lendo "${symbol}"`);
                setFlag(0);
                setAuto(false);

                return;
            }

            if (!table[0].includes(cell[1])) {
                setError(`Símbolo "${cell[1]}" não pertence ao alfabeto de fita.`);
                setFlag(0);
                setAuto(false);

                return;
            }

            setCell(cell);
            
            setFlag(2);
        }
    }, [flag])

    useEffect(() => {
        const tapeAlph = table[0].slice(1).filter(el => el.length > 0);
        const alph = tapeAlph.filter((el) => el != '>' && el != 'b');

        const states = Array.from(new Set([...table.map(row => row[0]).slice(1), tuple.finState]))
        const nonFinalStates = states.filter(el => el != tuple.finState);

        setTuple(prev => {
            if (!prev) return prev;
            return {
                ...prev,
                tapeAlphabet: tapeAlph,
                alphabet: alph,
                states: states,
                nonFinalStates: nonFinalStates,
            };
        });
    }, [table]);


    return (
        <div className="h-full flex flex-col bg-gray-700 text-sm text-white p-6 rounded-md border-1 border-gray-500">
            <div className='flex gap-4 items-baseline mb-4'>
                <span className='font-bold text-2xl'>Tabela de transição</span>
                <span className={`underline p-1 rounded-md text-gray-400 font-semibold hover:cursor-pointer ${tupleIndicator ? "animate-bg-pulse" : ""}`} onClick={() => setIsTupleModalOpen(true)}>Nôntupla</span>
            </div>
            <div className='flex gap-2 mb-4 font-semibold text-xs'>
                <button onClick={addRow} className='rounded-lg p-2 bg-gray-900 hover:cursor-pointer'>+ Estado</button>
                <button onClick={addColumn} className='rounded-lg p-2 bg-gray-900 hover:cursor-pointer'>+ Símbolo</button>
                <button onClick={resetTable} className='rounded-lg p-2 bg-red-500 hover:cursor-pointer'>Apagar tabela</button>
                <label className='rounded-lg p-2 bg-gray-900 hover:cursor-pointer text-center'>
                    Importar tabela
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".csv,.txt"
                        onChange={(e) => {
                        handleFileUpload(e, setTable);

                        if (fileInputRef.current) {
                            fileInputRef.current.value = "";
                        }

                        setError('')
                        setAuto(false);

                    }}
                    className='hidden'
                    />
                </label>
                <button
                    onClick={() => exportTableAsCSV(table, "tabela.csv")}
                    className='rounded-lg p-2 bg-gray-900 hover:cursor-pointer'
                    >
                    Exportar tabela em CSV
                </button>
            </div>
            <div className='overflow-auto'>
                <table>
                    <tbody>
                    {table.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={colIndex} className='border-4 border-gray-700 rounded-2xl'>
                            <input
                                type="text"
                                className={`rounded-lg text-white px-2 py-1 ${colIndex === 0 ? 'w-20' : 'w-[85px]'} h-10 text-center font-semibold placeholder:text-black ${(rowIndex==0 && colIndex==0)? "bg-gray-400 text-black": (row[0] == state && table[0][colIndex] == symbol) ? "bg-amber-600" :(rowIndex == 0 || colIndex == 0) ? "bg-gray-950" : "bg-gray-900 "}`}
                                value={cell}
                                placeholder={(rowIndex == 0 && colIndex == 0)? 'Q \\ Σ': ''}
                                onChange={(e) =>
                                handleTableChange(rowIndex, colIndex, e.target.value)
                                }
                                disabled={(rowIndex==0 && colIndex==0) || colIndex==0}
                            />
                            </td>
                        ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TransictionTable;