import { useRef } from 'react'
import NeedleIcon from '../assets/needle.svg'
import { useTuring } from '../context/TuringContext'

const CELL_SIZE = 40; // w-9 (36px) + gap-1 (4px)

function Tape() {
  const tapeRefs = useRef<(HTMLInputElement | null)[]>([]);
  const {
    needle, instruction,
    tape, updateTapeCell, resetTape,
    shift, setShift,
  } = useTuring();

  const countOnes = tape.reduce((acc, curr) => (curr === '1' ? acc + 1 : acc), 0);
  const showCount = instruction === 'P' || instruction === '';

  const offset = (needle - shift) * CELL_SIZE + CELL_SIZE / 2;

  return (
    <div className="bg-gray-700 text-sm text-white p-4 md:p-6 rounded-md border border-gray-500">
      <div className='flex flex-col md:flex-row gap-2 md:gap-6 items-start md:items-baseline mb-3'>
        <div className='flex flex-col'>
          <span className='font-bold text-lg lg:text-2xl'>Fita Semi-Infinita</span>
          <span className='font-semibold text-xs text-gray-400 h-4'>
            {showCount && `Contagem de 1s: ${countOnes}`}
          </span>
        </div>
        <div className='flex flex-wrap gap-2 font-semibold text-xs'>
          <button onClick={() => setShift(0)} className='rounded-lg px-3 py-2 bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer'>Centralizar</button>
          <button onClick={resetTape} className='rounded-lg px-3 py-2 bg-red-600 hover:bg-red-500 transition-colors cursor-pointer'>Apagar fita</button>
          <button onClick={() => setShift(prev => prev + 5)} className='rounded-lg px-3 py-2 bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer'>← Esquerda</button>
          <button onClick={() => setShift(prev => prev - 5)} className='rounded-lg px-3 py-2 bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer'>Direita →</button>
        </div>
      </div>

      <div className='border border-gray-500 rounded-md p-2 w-full overflow-hidden'>
        <div
          className='flex gap-1 transition-transform duration-300'
          style={{ transform: `translateX(calc(50% - ${offset}px))` }}
        >
          {tape.map((el, i) => (
            <div key={i} className='flex flex-col items-center flex-shrink-0 h-14'>
              <input
                ref={ref => { tapeRefs.current[i] = ref }}
                type='text'
                value={el !== 'b' ? el : ''}
                placeholder='b'
                onChange={(e) => {
                  updateTapeCell(i, e.target.value);
                  if (e.target.value && i + 1 < tape.length) {
                    tapeRefs.current[i + 1]?.focus();
                  }
                }}
                disabled={i === 0}
                className={`w-9 h-9 rounded text-center font-bold transition-all focus:ring-2 focus:ring-purple-500 ${
                  i === 0
                    ? 'bg-gray-800 text-gray-400 cursor-not-allowed'
                    : needle === i
                      ? 'bg-purple-700 scale-110 ring-2 ring-purple-400'
                      : 'bg-gray-600 placeholder:text-gray-500 hover:bg-gray-500'
                }`}
              />
              {i === needle && (
                <img src={NeedleIcon} className='mt-1 w-4' alt="" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tape
