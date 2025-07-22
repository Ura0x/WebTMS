import { useState, useEffect, useRef } from 'react'
import Needle from '../assets/needle.svg'

type Props = {
  needle: number;
  setNeedle: React.Dispatch<React.SetStateAction<number>>;
  instruction:string;
  setInstruction: React.Dispatch<React.SetStateAction<string>>
  setSymbol: React.Dispatch<React.SetStateAction<string>>;
  flag: number;
  setFlag: React.Dispatch<React.SetStateAction<number>>;
  cell: Array<string>;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  setState: React.Dispatch<React.SetStateAction<string>>;
  setAuto: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
};


function Tape({needle, setNeedle, instruction, setInstruction, setSymbol, flag, setFlag, cell, setSteps, setState, setAuto, setError}: Props) {
    const tapeRefs = useRef<(HTMLInputElement | null)[]>([]);

    const [shift, setShift] = useState<number>(0);
    const [countOne, setCountOne] = useState<number>(0);

    const [tape, setTape] = useState<string[]>(() => 
        Array.from({length: 100}, (_, index) => {
          if (index == 0) {
            return '>';
          }
          return 'b';
        })
      )

    const handleTapeChange = (index: number, value: string) => {
        value = value.trim();
        
        setTape(prevTape => {
            let newTape = prevTape;
            if (index >= prevTape.length - 30) {
            newTape = [...prevTape, ...Array(50).fill('b')];
            } else {
            newTape = [...prevTape];
            }

            newTape[index] = value.length > 1 ? value[0] : value.length == 0 ? 'b' : value;

            return newTape;
        });
    };

    const resetTape = () => {
        setTape(Array.from({length: 100}, (_, index) => {
          if (index == 0) {
            return '>';
          }
          return 'b';
        }))

        setAuto(false);
        setInstruction('')
        setError('')
        setNeedle(0);
        setSteps(0);
        setState('q0');
        setSymbol('>')
    }

    useEffect(() => {
        if (flag == 2) {
            if (tape[needle] == '>' && cell[1] != '>') {
                setError('nao pode sobrescrever o limitador de fita');
                setFlag(0);
                setAuto(false)
                return;
            }

            handleTapeChange(needle, cell[1]);

            if (cell[2] == 'R') {
                if (needle == tape.length - 1) {
                    setError("Fora do escopo da fita")
                    setFlag(0);
                    setAuto(false)
                    return;
                } 
                if (shift != 0) {
                    setShift(prev => prev + 1)
                }
                setSymbol(tape[needle+1]);
                setNeedle(prev => prev+1);
            }
            else if (cell[2] == 'L') {
                if (needle <= 0) {
                    setError("Fora do escopo da fita");
                    setFlag(0);
                    setAuto(false)
                    return;
                }
                if (shift != 0) {
                    setShift(prev => prev - 1)
                }

                setSymbol(tape[needle-1]);
                setNeedle(prev => prev-1);
            }
            setSteps(prev => prev + 1);
            setState(cell[0]);
            setInstruction(cell[2]);
            setFlag(0)
        }
    }, [flag])

    useEffect(() => {
        const sum = tape.reduce((acc, curr) => curr === "1" ? acc + Number(curr) : acc, 0);
        setCountOne(sum);
    }, [tape])

    return (
        <div className="bg-gray-700 text-sm text-white p-6 rounded-2xl border-1 border-gray-500">
            <div className='flex gap-8 items-baseline mb-4'>
                <div className='flex flex-col'>
                    <span className='font-bold text-2xl'>Fita Semi-Infinita da Máquina de Turing</span>
                    {(instruction == 'P' || instruction == "") &&
                        <span className='font-semibold text-xs text-gray-400'>Contagem de 1s da fita: {countOne}</span>
                    }
                </div>
                <div className='flex gap-2 mb-4 font-semibold text-xs'>
                    <button onClick={() => setShift(0)} className='rounded-lg p-2 bg-gray-900 hover:cursor-pointer'>Centralizar</button>
                    <button onClick={resetTape} className='rounded-lg p-2 bg-red-500 hover:cursor-pointer'>Apagar fita</button>
                    <button onClick={() => setShift(prev => prev+5)} className='rounded-lg p-2 bg-gray-900 hover:cursor-pointer'>← Esquerda</button>
                    <button onClick={() => setShift(prev => prev-5)} className='rounded-lg p-2 bg-gray-900 hover:cursor-pointer'>→ Direita</button>
                </div>
                
            </div>

            

            <div className='flex border border-gray-500 rounded-md p-1 gap-4 w-full overflow-hidden'>
                <div className='flex w-full p-1 gap-1 translate-x-2/6 transition-transform' style={{ transform: `translateX(${-(needle - shift)  * 52  }px)` }}>
                    { tape.map((el, i) => (
                        <div key={i} className='flex flex-col items-center'>
                            <input
                            ref={el => { tapeRefs.current[i] = el }}
                            type='text'
                            value={el != 'b' ? el : ''}
                            placeholder='b'
                            onChange={(e) => {
                                handleTapeChange(i, e.target.value);

                                // Se digitou algo e existe próximo:
                                if (e.target.value && i+1 < tape.length) {
                                tapeRefs.current[i+1]?.focus();
                                }
                            }}
                            disabled={el == '>'}
                            className={`w-9 h-9 rounded-xs text-center placeholder:text-gray-500 text-basis font-bold transition-all ${needle == i ? "bg-purple-700 scale-110" : "bg-gray-600" }`}
                            />
                            {i === needle &&
                            <div className='mt-3 w-4'>
                                <img src={Needle} alt="" />
                            </div>
                            }
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Tape;