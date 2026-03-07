import reset from '../assets/reset.svg'
import step from '../assets/step.svg'
import play from '../assets/play.svg'
import pause from '../assets/pause.svg'
import timer from '../assets/timer.svg'
import { useTuring } from '../context/TuringContext'

function ControlPanel() {
  const {
    currentState, instruction, steps,
    isRunning, speed, setSpeed,
    executeStep, toggleAuto, resetExecution, undoStep,
    log,
  } = useTuring();

  const statusText = instruction === 'P' ? 'Concluído' : isRunning ? 'Executando' : 'Parado';
  const statusColor = instruction === 'P' ? 'text-green-500' : isRunning ? 'text-yellow-400' : 'text-gray-400';
  const canUndo = log.length > 0;

  return (
    <div className="h-full bg-gray-700 text-sm text-white p-4 md:p-6 rounded-md border border-gray-500">
      <span className="font-bold text-lg xl:text-2xl">Painel de Controle</span>

      {/* Mobile: info à esquerda, controles à direita */}
      <div className='flex flex-row md:hidden gap-4 mt-2'>
        <div className='flex flex-col gap-1 flex-1'>
          <span className="font-medium">
            Status: <span className={`font-semibold ${statusColor}`}>{statusText}</span>
          </span>
          <span>Estado: <span className="font-semibold">{currentState}</span></span>
          <span>Passos: <span className="font-semibold">{steps}</span></span>
        </div>
        <div className='flex flex-col gap-2 items-end'>
          <div className="flex gap-2 text-xs font-semibold">
            <button
              onClick={toggleAuto}
              className={`flex gap-1 items-center rounded-lg ${isRunning ? 'bg-orange-600 hover:bg-orange-500' : 'bg-green-600 hover:bg-green-500'} px-3 py-2 transition-colors cursor-pointer`}
              title='Espaço: play/pause'
            >
              <img src={isRunning ? pause : play} className='w-4' />
              {isRunning ? 'Parar' : 'Executar'}
            </button>
            <button
              onClick={executeStep}
              className="flex gap-1 items-center rounded-lg bg-blue-600 hover:bg-blue-500 px-3 py-2 transition-colors cursor-pointer"
              title='Seta direita: um passo'
            >
              <img src={step} className='w-4' />
              Passo
            </button>
            <button
              onClick={undoStep}
              disabled={!canUndo}
              className={`flex items-center rounded-lg px-3 py-2 transition-colors cursor-pointer ${canUndo ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-900 opacity-40 cursor-not-allowed'}`}
              title='Seta esquerda: voltar'
            >
              <img src={step} className='w-4' style={{ transform: 'scaleX(-1)' }} />
            </button>
            <button
              onClick={resetExecution}
              className="flex items-center rounded-lg px-3 py-2 bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer"
              title='Reiniciar execução'
            >
              <img src={reset} className='w-4' />
            </button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <img src={timer} alt="Velocidade" className='w-5 flex-shrink-0' />
            <input
              type="range"
              min={100}
              max={3000}
              step={100}
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="flex-1 min-w-0 range-slider"
              style={{
                background: `linear-gradient(to right, #B340FF 0%, #B340FF ${((speed - 100) / 2900) * 100}%, #4b5563 ${((speed - 100) / 2900) * 100}%, #4b5563 100%)`
              }}
            />
            <span className="text-nowrap text-xs">{speed} ms</span>
          </div>
        </div>
      </div>

      {/* Desktop: layout vertical */}
      <div className='hidden md:flex flex-col gap-3 lg:gap-4 mt-3'>
        <div className='flex flex-col gap-1'>
          <span className="font-medium">
            Status: <span className={`font-semibold text-base ${statusColor}`}>{statusText}</span>
          </span>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <span>Estado atual: <span className="font-semibold">{currentState}</span></span>
            <span>Passos: <span className="font-semibold">{steps}</span></span>
          </div>
        </div>

        <div className='flex flex-col gap-2'>
          <span className="font-medium text-base">Controles</span>
          <div className="flex flex-row flex-wrap gap-2 text-xs font-semibold">
            <button
              onClick={toggleAuto}
              className={`flex gap-2 justify-center items-center min-w-9 lg:w-[110px] rounded-lg ${isRunning ? 'bg-orange-600 hover:bg-orange-500' : 'bg-green-600 hover:bg-green-500'} p-2 transition-colors cursor-pointer`}
              title='Espaço: play/pause'
            >
              <img src={isRunning ? pause : play} className='w-4' />
              <span className='hidden lg:inline'>{isRunning ? 'Parar' : 'Executar'}</span>
            </button>
            <button
              onClick={executeStep}
              className="flex gap-2 items-center rounded-lg bg-blue-600 hover:bg-blue-500 p-2 transition-colors cursor-pointer"
              title='Seta direita: um passo'
            >
              <img src={step} className='w-4' />
              <span className='hidden lg:inline'>Um passo</span>
            </button>
            <button
              onClick={undoStep}
              disabled={!canUndo}
              className={`flex gap-2 items-center rounded-lg p-2 transition-colors cursor-pointer ${canUndo ? 'bg-gray-900 hover:bg-gray-800' : 'bg-gray-900 opacity-40 cursor-not-allowed'}`}
              title='Seta esquerda: voltar passo'
            >
              <img src={step} className='w-4' style={{ transform: 'scaleX(-1)' }} />
              <span className='hidden lg:inline'>Voltar</span>
            </button>
            <button
              onClick={resetExecution}
              className="flex gap-2 items-center rounded-lg p-2 bg-gray-900 hover:bg-gray-800 transition-colors cursor-pointer"
              title='Reiniciar execução'
            >
              <img src={reset} className='w-5' />
              <span className='hidden lg:inline'>Reiniciar</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label htmlFor="speed" className="flex-shrink-0 w-6">
            <img src={timer} alt="Velocidade" />
          </label>
          <input
            id="speed"
            type="range"
            min={100}
            max={3000}
            step={100}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="flex-1 min-w-0 max-w-64 range-slider"
            style={{
              background: `linear-gradient(to right, #B340FF 0%, #B340FF ${((speed - 100) / 2900) * 100}%, #4b5563 ${((speed - 100) / 2900) * 100}%, #4b5563 100%)`
            }}
          />
          <span className="text-white text-nowrap text-xs">{speed} ms</span>
        </div>

        <div className="text-xs text-gray-500">
          Atalhos: Espaço (play/pause) · → (passo) · ← (voltar)
        </div>
      </div>
    </div>
  );
}

export default ControlPanel
