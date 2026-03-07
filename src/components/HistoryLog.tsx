import { useEffect, useRef } from 'react'
import { useTuring } from '../context/TuringContext'

function HistoryLog() {
  const { log } = useTuring();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [log]);

  return (
    <div className="bg-gray-800 rounded-md p-3 border border-gray-600 h-full flex flex-col">
      <span className="text-xs font-semibold text-gray-400 flex-shrink-0">
        Histórico de execução {log.length > 0 && `(${log.length} ${log.length === 1 ? 'passo' : 'passos'})`}
      </span>
      <div ref={scrollRef} className="flex-1 overflow-y-auto mt-1 text-xs text-gray-300 font-mono space-y-1 min-h-0">
        {log.length === 0 ? (
          <span className="text-gray-600 italic">Nenhum passo executado</span>
        ) : (
          log.map((entry, i) => (
            <div key={i} className="bg-gray-900 rounded px-2 py-1.5 border border-gray-700 space-y-0.5">
              <div className="text-gray-500 font-semibold">Passo #{String(entry.step).padStart(2, '0')}</div>
              <div>Estado: <span className="text-purple-400">{entry.state}</span></div>
              <div>Leu: <span className="text-amber-400">"{entry.readSymbol}"</span></div>
              <div>Escreveu: <span className="text-amber-400">"{entry.writeSymbol}"</span></div>
              <div>Direção: {entry.direction === 'P' ? 'Parou' : entry.direction === 'R' ? 'Direita (R)' : 'Esquerda (L)'}</div>
              <div>Próximo: <span className="text-purple-400">{entry.nextState}</span></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HistoryLog
