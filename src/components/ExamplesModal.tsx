import { useTuring } from '../context/TuringContext'
import { examples } from '../data/examples'

function ExamplesModal() {
  const { showExamplesModal, setShowExamplesModal, loadMachine } = useTuring();

  if (!showExamplesModal) return null;

  const handleSelect = (index: number) => {
    loadMachine(examples[index]);
    setShowExamplesModal(false);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-40"
      onClick={() => setShowExamplesModal(false)}
    >
      <div
        className="relative bg-gray-900 rounded-xl p-6 shadow-lg max-w-md w-full mx-4 border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setShowExamplesModal(false)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-red-500 hover:text-red-400 transition-colors cursor-pointer font-bold text-sm"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">Exemplos</h2>
        <p className="text-sm text-gray-400 mb-4">
          Selecione um exemplo para carregar a tabela, fita e estado final.
        </p>
        <div className="flex flex-col gap-2">
          {examples.map((ex, i) => (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              className="text-left p-3 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-600 transition-colors cursor-pointer"
            >
              <span className="font-semibold text-white">{ex.name}</span>
              <p className="text-xs text-gray-400 mt-1">{ex.description}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ExamplesModal
