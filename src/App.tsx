import { TuringProvider } from './context/TuringContext'
import Header from './components/Header'
import ControlPanel from './components/ControlPanel'
import TransitionTable from './components/TransitionTable'
import Tape from './components/Tape'
import HistoryLog from './components/HistoryLog'
import ErrorModal from './components/ErrorModal'
import TupleModal from './components/TupleModal'
import AboutModal from './components/AboutModal'
import ExamplesModal from './components/ExamplesModal'
import './App.css'

function App() {
  return (
    <TuringProvider>
      <div className="w-full h-screen flex flex-col bg-gray-950">
        <Header />

        {/* Desktop */}
        <div className="hidden md:flex flex-1 flex-row p-4 gap-2 min-h-0">
          <div className="flex-1 min-w-0 flex flex-col gap-2">
            <div className="flex flex-row gap-2 flex-1 min-h-56">
              <div className="min-w-0 basis-2/7 2xl:basis-1/5 flex-1">
                <ControlPanel />
              </div>
              <div className="min-w-0 basis-5/7 2xl:basis-4/5 flex-1">
                <TransitionTable />
              </div>
            </div>
            <div className="flex-shrink-0">
              <Tape />
            </div>
          </div>
          <div className="w-64 2xl:w-72 flex-shrink-0">
            <HistoryLog />
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden flex flex-col flex-1 overflow-auto p-2 gap-2">
          <ControlPanel />
          <TransitionTable />
          <Tape />
          <HistoryLog />
        </div>

        <ErrorModal />
        <TupleModal />
        <AboutModal />
        <ExamplesModal />
      </div>
    </TuringProvider>
  );
}

export default App
