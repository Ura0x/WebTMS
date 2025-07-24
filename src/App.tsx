import Header from './components/Header'
import ControlPanel from './components/ControlPanel'
import TransictionTable from './components/TransictionTable'
import Tape from './components/Tape'
import ErrorModal from './components/ErrorModal'
import TupleModal from './components/TupleModal'
import AboutModal from './components/AboutModal'
import { useState, useEffect } from 'react';
import type { Tuple } from './types/TmTuple'
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
  const [error, setError] = useState('') // Armazena e ativa a mensagem de erro
  const [showAboutModal, setShowAboutModal] = useState(false); // auto-explicativo
  const [isTupleModalOpen, setIsTupleModalOpen] = useState(false); // auto explicativo ne
  const [tupleIndicator, setTupleIndicator] = useState(false) // Se o botao da tuple vai brilhar ou n
  const [tuple, setTuple] = useState<Tuple>({
    states: [],
    alphabet: [],
    initState: 'q0',
    finState: '',
    transFunction: 'Tabela de transição',           
    tapeDelimitator: '>',       
    blank: 'b',                  
    nonFinalStates: [],
    tapeAlphabet: []
  }); // também é auto explicativo né, armazena os dados da nôntupla da MT

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

  useEffect(() => {
    if (tupleIndicator) {
      setTimeout(() => {
        setTupleIndicator(false);
      }, 10000)
    }
  }, [tupleIndicator])

  return (
   <div className="w- h-screen flex flex-col bg-gray-950">
      <Header
        setShowAboutModal={setShowAboutModal}
      />
      <div className="hidden flex-1 md:flex flex-col p-4 gap-2 min-h-0">
        <div className="flex flex-row gap-2 flex-1 min-h-56">
          <div className="min-w-0 basis-2/7 2xl:basis-1/5  flex-1">
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
          <div className="min-w-0 basis-5/7 2xl:basis-4/5 flex-1">
            <TransictionTable 
              state={state} setState={setState}
              symbol={symbol} setSymbol={setSymbol}
              setCell={setCell}
              flag={flag} setFlag={setFlag}
              setInstruction={setInstruction}
              setError={setError}
              setAuto={setAuto}
              tuple={tuple} setTuple={setTuple}
              setIsTupleModalOpen={setIsTupleModalOpen}
              tupleIndicator={tupleIndicator} setTupleIndicator={setTupleIndicator}
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
      <ErrorModal 
        error={error}
        setError={setError}
      />
      <TupleModal 
        isOpen={isTupleModalOpen} 
        onClose={() => setIsTupleModalOpen(false)}
        tuple={tuple}
        setTuple={setTuple}
        setError={setError}
        />
        {showAboutModal && <AboutModal onClose={() => setShowAboutModal(false)} />}
    </div>

  )
}

export default App
