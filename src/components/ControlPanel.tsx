import reset from '../assets/reset.svg'
import step from '../assets/step.svg'
import play from '../assets/play.svg'
import pause from '../assets/pause.svg'
import timer from '../assets/timer.svg'

type Props = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>
  setNeedle: React.Dispatch<React.SetStateAction<number>>
  setSymbol: React.Dispatch<React.SetStateAction<string>>
  steps: number
  instruction: string
  setInstruction: React.Dispatch<React.SetStateAction<string>>
  auto: boolean;
  setAuto: React.Dispatch<React.SetStateAction<boolean>>;
  setFlag: React.Dispatch<React.SetStateAction<number>>;
  setSteps: React.Dispatch<React.SetStateAction<number>>;
  miliseconds: number;
  setMiliseconds: React.Dispatch<React.SetStateAction<number>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

function ControlPanel ({state, setState, instruction, setInstruction, steps, auto, setAuto, setFlag, setNeedle, setSymbol, setSteps, miliseconds, setMiliseconds, setError}:Props) {


    const handleAuto = () => {
        if (instruction != 'P') {
            setAuto(prev => !prev);
        }
    }

    const nextStep = () => {
        if (instruction != 'P') {
            setFlag(1);
        }
    }

    const handleResetAll = () => {
        setState('q0');
        setNeedle(0);
        setSymbol('>')
        setInstruction('')
        setSteps(0)
        setError('')
        setAuto(false)
    }

    return (
        <div className="flex flex-col overflow-auto h-full bg-gray-700 text-sm text-white p-6 rounded-2xl border-1 border-gray-500">
            <div className="mb-4">
               <span className="font-bold text-2xl">Painel de Controle</span>
            </div>
            <div className="flex justify-between">
                <div className='flex flex-col gap-4'>
                    <span className="font-medium">Status da Simulação</span>
                    <div className="flex gap-3 items-baseline mt-2">
                        <span className={`font-medium text-base ${instruction == "P" ? "text-green-500" : auto ? "Executando" : "Parado"  }`}>{instruction == "P" ? "Concluído" : auto ? "Executando" : "Parado"  }</span> 
                        <span>Estado atual: <span className="font-medium">{state}</span></span> 
                        <span>Passos: <span className="font-medium">{steps}</span></span>
                    </div>
                    <div>
                        <span className="font-medium text-base">Controles</span>
                        <div className="flex flex-row flex-wrap gap-2 text-xs font-semibold 2xl:text-sm">
                            <button onClick={handleAuto} className={`flex gap-2 text-nowrap items-center w-[100px] rounded-lg ${auto ? "bg-orange-600" : "bg-green-500"}  p-2 f hover:cursor-pointer`}><img src={auto ? pause : play} className='w-4'/>{auto ? "Parar" : "Executar"}</button>
                            <button onClick={nextStep} className="flex gap-2 text-nowrap items-center rounded-lg bg-blue-500 p-2  hover:cursor-pointer"><img src={step} className='w-4'/>Um passo</button>
                            <button onClick={handleResetAll} className="flex gap-2 text-nowrap items-center rounded-lg p-2 bg-gray-900 hover:cursor-pointer"><img src={reset} className='w-5'/>Reiniciar execução</button>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <label htmlFor="speed" className="text-white w-10"><img src={timer} alt="" /></label>
                        <input
                            id="speed"
                            type="range"
                            min={100}
                            max={3000}
                            step={100} // opcional, pra ajustar de 100 em 100
                            value={miliseconds}
                            onChange={(e) => setMiliseconds(Number(e.target.value))}
                            className="w-64 range-slider"
                            style={{
                                background: `linear-gradient(
                                to right,
                                #B340FF 0%,
                                #B340FF ${(miliseconds - 100) / (3000 - 100) * 100}%,
                                #4b5563 ${(miliseconds - 100) / (3000 - 100) * 100}%,
                                #4b5563 100%
                                )`
                            }}
                        />
                        <span className="text-white text-nowrap">{miliseconds} ms</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ControlPanel;