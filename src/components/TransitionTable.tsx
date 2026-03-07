import { useRef, useEffect } from 'react'
import { downloadMachineJSON, parseMachineJSON } from '../utils/MachineFile'
import { useTuring } from '../context/TuringContext'

function TransitionTable() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const activeCellRef = useRef<HTMLTableCellElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    currentState, symbol, steps,
    table, updateTableCell, addRow, addColumn, removeRow, removeColumn, resetTable,
    tape, tuple, loadMachine,
    setError, stopExecution,
    tupleIndicator, setShowTupleModal,
  } = useTuring();

  useEffect(() => {
    if (activeCellRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const cell = activeCellRef.current;
      const cellRect = cell.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      if (cellRect.left < containerRect.left || cellRect.right > containerRect.right) {
        cell.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
      if (cellRect.top < containerRect.top || cellRect.bottom > containerRect.bottom) {
        cell.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
      }
    }
  }, [currentState, symbol, steps]);

  const handleExportJSON = () => {
    const tapeData = tape.filter((_, i) => i === 0 || tape.slice(i).some(c => c !== 'b'));
    downloadMachineJSON({
      table,
      tape: tapeData,
      finState: tuple.finState,
    });
  };

  return (
    <div className="h-full flex flex-col bg-gray-700 text-sm text-white p-4 md:p-6 rounded-md border border-gray-500">
      <div className='flex flex-wrap gap-x-4 gap-y-1 items-baseline mb-3'>
        <span className='font-bold text-xl md:text-2xl'>Tabela de transição</span>
        <span
          className={`underline px-2 py-1 rounded-md text-gray-400 font-semibold cursor-pointer hover:text-gray-200 transition-colors ${tupleIndicator ? 'animate-bg-pulse' : ''}`}
          onClick={() => setShowTupleModal(true)}
        >
          Nôntupla
        </span>
      </div>

      <div className='flex flex-wrap gap-2 mb-3 font-semibold text-xs'>
        <button onClick={addRow} className='rounded-lg px-3 py-2 bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer'>+ Estado</button>
        <button onClick={removeRow} className='rounded-lg px-3 py-2 bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer'>- Estado</button>
        <button onClick={addColumn} className='rounded-lg px-3 py-2 bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer'>+ Símbolo</button>
        <button onClick={removeColumn} className='rounded-lg px-3 py-2 bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer'>- Símbolo</button>
        <button onClick={resetTable} className='rounded-lg px-3 py-2 bg-red-600 hover:bg-red-500 transition-colors cursor-pointer'>Apagar tabela</button>
        <label className='rounded-lg px-3 py-2 bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer'>
          Importar JSON
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const reader = new FileReader();
              reader.onload = (ev) => {
                const content = ev.target?.result as string;
                const machine = parseMachineJSON(content);
                if (machine) {
                  loadMachine(machine);
                } else {
                  setError('Arquivo JSON inválido');
                }
              };
              reader.readAsText(file);
              if (fileInputRef.current) fileInputRef.current.value = '';
              setError('');
              stopExecution();
            }}
            className='hidden'
          />
        </label>
        <button
          onClick={handleExportJSON}
          className='rounded-lg px-3 py-2 bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer'
        >
          Exportar máquina
        </button>
      </div>

      <div ref={scrollRef} className='overflow-auto'>
        <table className='border-separate border-spacing-1'>
          <tbody>
            {table.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, colIndex) => {
                  const isOrigin = rowIndex === 0 && colIndex === 0;
                  const isStateCol = colIndex === 0 && rowIndex > 0;
                  const isSymbolRow = rowIndex === 0 && colIndex > 0;
                  const isHeader = isOrigin || isStateCol || isSymbolRow;

                  const isActiveRow = rowIndex > 0 && row[0] === currentState;
                  const isActiveCol = colIndex > 0 && table[0][colIndex] === symbol;
                  const isActiveCell = isActiveRow && isActiveCol;

                  let bgClass = 'bg-gray-900';
                  if (isOrigin) {
                    bgClass = 'bg-gray-500 text-black';
                  } else if (isActiveCell) {
                    bgClass = 'bg-amber-600';
                  } else if (isStateCol && isActiveRow) {
                    bgClass = 'bg-amber-800';
                  } else if (isSymbolRow && isActiveCol) {
                    bgClass = 'bg-amber-800';
                  } else if (isHeader) {
                    bgClass = 'bg-gray-950';
                  }

                  return (
                    <td key={colIndex} ref={isActiveCell ? activeCellRef : undefined}>
                      <input
                        type="text"
                        className={`rounded-md text-white px-1 py-1 ${colIndex === 0 ? 'w-16 md:w-20' : 'w-20 md:w-24'} h-9 md:h-10 text-center text-xs md:text-sm font-semibold placeholder:text-gray-600 focus:ring-2 focus:ring-purple-500 ${bgClass}`}
                        value={cell}
                        placeholder={isOrigin ? 'Q \\ Σ' : ''}
                        onChange={(e) => updateTableCell(rowIndex, colIndex, e.target.value)}
                        disabled={isOrigin || colIndex === 0}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TransitionTable
