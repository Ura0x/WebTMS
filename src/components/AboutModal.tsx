import { useTuring } from '../context/TuringContext'

function AboutModal() {
  const { showAboutModal, setShowAboutModal, setShowExamplesModal } = useTuring();

  const handleClose = () => {
    setShowAboutModal(false);
    localStorage.setItem('webtms_visited', '1');
  };

  if (!showAboutModal) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-30"
      onClick={handleClose}
    >
      <div
        className="relative bg-gray-900 text-white p-6 rounded-xl max-w-lg w-full shadow-xl mx-4 border border-gray-700 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-red-500 hover:text-red-400 transition-colors cursor-pointer font-bold text-sm"
        >
          X
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">Sobre o Simulador</h2>

        <p className="mb-3 text-gray-300">
          Este simulador foi desenvolvido para ajudar na visualização e no estudo prático
          de uma <strong className="text-white">Máquina de Turing</strong>, seguindo a metodologia didática do
          <strong className="text-white"> Prof. Dr. Roberto Tenório Figueiredo</strong>.
        </p>

        <p className="mb-3 text-gray-300">
          O projeto foi realizado como Trabalho de Conclusão de Curso (TCC) por <strong className="text-white">Fabio Ura</strong>,
          com o objetivo de tornar o aprendizado mais acessível e interativo para estudantes de computação.
        </p>

        <p className="mb-3 text-gray-300">
          Para facilitar o aprendizado, o simulador adota algumas convenções importantes:
        </p>

        <ul className="list-disc list-inside mb-3 text-gray-300 space-y-1">
          <li>A máquina é definida formalmente como uma <strong className="text-white">nôntupla</strong>.</li>
          <li>O <strong className="text-white">estado inicial</strong> é sempre <code className="bg-gray-800 px-1 rounded">q0</code>.</li>
          <li>Existe <strong className="text-white">apenas um estado final</strong>.</li>
          <li>O <strong className="text-white">delimitador de fita</strong> é sempre o símbolo <code className="bg-gray-800 px-1 rounded">&gt;</code>.</li>
          <li>O <strong className="text-white">símbolo branco</strong> (vazio) na fita é sempre representado pela letra <code className="bg-gray-800 px-1 rounded">b</code>.</li>
        </ul>

        <p className="mb-3 text-gray-300">
          É possível importar e exportar máquinas no formato <code className="bg-gray-800 px-1 rounded">.json</code> (máquina completa com tabela, fita e estado final).
          Veja também alguns{' '}
          <span
            className="text-purple-400 underline hover:text-purple-300 cursor-pointer"
            onClick={() => { handleClose(); setShowExamplesModal(true); }}
          >
            exemplos de máquinas
          </span>{' '}
          prontas para carregar.
        </p>

        <p className="mb-3 text-gray-300">
          Essas definições ajudam a padronizar o uso da máquina e tornam mais fácil compreender
          os conceitos teóricos na prática.
        </p>

        <h3 className="text-lg font-semibold mb-2 text-white">Atalhos de teclado</h3>
        <ul className="list-disc list-inside mb-3 text-gray-300 space-y-1">
          <li><kbd className="bg-gray-800 px-2 py-0.5 rounded text-xs">Espaço</kbd> — Iniciar / pausar execução automática</li>
          <li><kbd className="bg-gray-800 px-2 py-0.5 rounded text-xs">Seta direita →</kbd> — Executar um passo</li>
          <li><kbd className="bg-gray-800 px-2 py-0.5 rounded text-xs">Seta esquerda ←</kbd> — Desfazer um passo</li>
        </ul>

        <p className="mt-4 text-center text-gray-300">
          Saiba mais no canal do professor:&nbsp;
          <a
            href="https://www.youtube.com/@osfedera"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 underline hover:text-purple-300"
          >
            youtube.com/@osfedera
          </a>
        </p>
      </div>
    </div>
  );
}

export default AboutModal
