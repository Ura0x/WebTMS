interface AboutModalProps {
  onClose: () => void;
}

function AboutModal({ onClose }: AboutModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-30"
      onClick={onClose}
    >
        <div
            className="relative bg-gray-900 text-white p-6 rounded-xl max-w-lg w-full shadow-xl"
            onClick={(e) => e.stopPropagation()} 
        >
            <button
                onClick={onClose}
                className="absolute top-2 right-2 bg-gray-900 p-1 w-7 rounded-full text-red-500 hover:text-red-400 hover:cursor-pointer font-bold text-sm"
            >
                X
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">🧠 Sobre o Simulador</h2>
            <p className="mb-3">
            Este simulador foi desenvolvido para ajudar na visualização e no estudo prático
            de uma <strong>Máquina de Turing</strong>, seguindo a metodologia didática do 
            <strong> Prof. Dr. Roberto Tenório Figueiredo</strong>.
            </p>
            <p className="mb-3">
            Para facilitar o aprendizado, o simulador adota algumas convenções importantes:
            </p>
            <ul className="list-disc list-inside mb-3">
            <li>A máquina é definida formalmente como uma <strong>nôntupla</strong>.</li>
            <li>O <strong>estado inicial</strong> é sempre <code>q0</code>.</li>
            <li>Existe <strong>apenas um estado final</strong>.</li>
            <li>O <strong>delimitador de fita</strong> é sempre o símbolo <code>&gt;</code>.</li>
            <li>O <strong>símbolo branco</strong> (vazio) na fita é sempre representado pela letra <code>b</code>.</li>
            </ul>
            <p>
            Essas definições ajudam a padronizar o uso da máquina e tornam mais fácil compreender
            os conceitos teóricos na prática.
            </p>
            <p className="mt-3 text-center">
            📺 Saiba mais no canal do professor:&nbsp;
            <a 
                href="https://www.youtube.com/@osfedera" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-purple-400 underline"
            >
                youtube.com/@osfedera
            </a>
            </p>
        </div>
    </div>
  );
};

export default AboutModal;