import logo from '../assets/cpu.svg'
import github from '../assets/github.svg'
import { useTuring } from '../context/TuringContext'

function Header() {
  const { setShowAboutModal, setShowExamplesModal } = useTuring();

  return (
    <div className="w-full flex gap-3 md:gap-4 bg-gray-900 border-b border-gray-700 py-3 md:py-5 items-center px-4">
      <div className='flex-1 flex gap-3 md:gap-4 items-center min-w-0'>
        <img src={logo} alt="logo" className='w-8 md:w-12 flex-shrink-0' />
        <div className='flex flex-col min-w-0'>
          <span className='font-bold text-base sm:text-lg md:text-3xl bg-gradient-to-r from-[#8200db] to-[#02c477] bg-clip-text text-transparent truncate'>
            Simulador de Máquina de Turing
          </span>
          <span className='hidden md:block font-normal text-sm text-gray-400'>
            Simule e visualize o funcionamento de uma Máquina de Turing
          </span>
        </div>
      </div>
      <div className='flex gap-2 flex-shrink-0'>
        <button
          onClick={() => setShowExamplesModal(true)}
          className='flex w-9 h-9 bg-gray-800 items-center justify-center rounded-full hover:bg-gray-700 transition-colors cursor-pointer'
          title='Exemplos'
        >
          <svg className='w-[18px] h-[18px] text-gray-200' viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button
          onClick={() => setShowAboutModal(true)}
          className='flex w-9 h-9 bg-gray-800 items-center justify-center rounded-full hover:bg-gray-700 transition-colors cursor-pointer'
          title='Sobre'
        >
          <span className='text-lg font-semibold text-gray-200'>?</span>
        </button>
        <a
          href="https://github.com/Ura0x/WebTMS"
          target="_blank"
          rel="noopener noreferrer"
          className='flex w-9 h-9 items-center justify-center rounded-full hover:bg-gray-800 transition-colors'
          title='GitHub'
        >
          <img src={github} alt="GitHub" className='w-6 h-6' />
        </a>
      </div>
    </div>
  );
}

export default Header
