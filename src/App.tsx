import Header from './components/Header'
import ControlPanel from './components/ControlPanel'
import TransictionTable from './components/TransictionTable'
import Tape from './components/Tape'
import { useState, useEffect } from 'react';
import './App.css'


function App() {
  const [state, setState] = useState('q0') // estado em uso vigente
  const [symbol, setSymbol] = useState('>') // Simbolo do alfabeto de fita que está sendo lido
  const [needle, setNeedle] = useState(0) // Índice na fita
  const [instruction, setInstruction] = useState('') // Instrução que será realizada
  const [steps, setSteps] = useState(0) // Armazena a quantidade de passos necessários para concluir a computação
  const [flag, setFlag] = useState(0) // Armazena em qual etapa está (leitura da tabela, escrita na fita, etc)
  const [auto, setAuto] = useState(false) // flag para execução automatica
  const [cell, setCell] = useState<Array<string>>(['']) // armazena a leitura da tabela
  const [miliseconds, setMiliseconds] = useState(500); // Velocidade na execução automatica
  const [error, setError] = useState('')

  useEffect(() => {
    if (flag === 0 && auto) {
      if (instruction == 'P') {
        setAuto(prev => !prev)
        return;
      } else {
        setTimeout(() => {
          setFlag(1)
        }, miliseconds)
      }
    }
  },[flag, auto])

  return (
   <div className="w- h-screen flex flex-col bg-gray-950">
      <Header />
      <div className="hidden flex-1 md:flex flex-col p-4 gap-4 min-h-0">
        <div className="flex flex-row gap-4 flex-1 min-h-0">
          <div className="min-2-0 basis-2/5 2xl:basis-1/5  flex-1">
            <ControlPanel 
              state={state} setState={setState}
              setNeedle={setNeedle}
              setSymbol={setSymbol}
              instruction={instruction} setInstruction={setInstruction}
              steps={steps}
              auto={auto} setAuto={setAuto} setFlag={setFlag}
              setSteps={setSteps}
              miliseconds={miliseconds} setMiliseconds={setMiliseconds}
              error={error} setError={setError}
            />
          </div>
          <div className="min-w-0 basis-3/5 2xl:basis-4/5 flex-1">
            <TransictionTable 
              state={state} setState={setState}
              symbol={symbol}
              setCell={setCell}
              flag={flag} setFlag={setFlag}
              setInstruction={setInstruction}
              setError={setError}
              setAuto={setAuto}
            />
          </div>
        </div>
        <div className="flex-shrink-0">
          <Tape
            needle={needle} setNeedle={setNeedle} 
            instruction={instruction} setInstruction={setInstruction}
            setSymbol={setSymbol}
            flag={flag} setFlag={setFlag}
            cell={cell} setSteps={setSteps}
            setState={setState}
            setAuto={setAuto}
            setError={setError}
          />
        </div>
      </div>
      <div className='md:hidden m-auto p-4 w-fit items-center text-center flex flex-col bg-gray-700 rounded-2xl border-1 border-gray-500 text-gray-300'>
        <span className=''>Versão mobile em desenvolvimento,<br/> por favor use uma tela maior.</span>
      </div>
    </div>

  )
}

export default App
