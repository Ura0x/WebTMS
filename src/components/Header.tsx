import logo from '../assets/cpu.svg'
import github from '../assets/github.svg'

function Header() {


    return (
        <div className="w-full flex gap-4 bg-gray-900 border-b-1 border-gray-700 py-5 items-center px-4">
            <div className='w-full flex gap-4'>
                <img src={logo} alt="logo do website" className='w-12' />
                <div className='flex flex-col'>
                    <span className='font-bold text-3xl bg-gradient-to-r from-[#8200db] to-[#02c477] bg-clip-text text-transparent'>Simulador de Máquina de Turing</span>
                    <span className='font-normal text-basis text-gray-400'>Simule e visualize o funcionamento de uma Máquina de Turing</span>
                </div>
            </div>
            <div>
                <div>
                    <a href="https://github.com/Ura0x/WebTMS" target="_blank" rel="noopener noreferrer"><img src={github} alt="" className='w-8 hover:cursor-pointer' /></a>
                    
                </div>
            </div>
        </div>
    )   
}

export default Header