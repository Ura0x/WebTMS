import { useTuring } from '../context/TuringContext'

function TupleModal() {
  const { showTupleModal, setShowTupleModal, tuple, setTuple, setError } = useTuring();

  const handleFinalStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (value === tuple.initState) {
      setError('Estado final não pode ser igual ao estado inicial');
    } else {
      setError('');
      setTuple(prev => ({ ...prev, finState: value }));
    }
  };

  if (!showTupleModal) return null;

  const allStates = Array.from(new Set([...tuple.states, tuple.finState])).filter(el => el !== '');

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-40"
      onClick={() => setShowTupleModal(false)}
    >
      <div
        className="relative bg-gray-900 rounded-xl p-6 shadow-lg max-w-lg w-full mx-4 border border-gray-700"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setShowTupleModal(false)}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-red-500 hover:text-red-400 transition-colors cursor-pointer font-bold text-sm"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">Nôntupla da Máquina de Turing</h2>
        <div className="flex flex-col gap-2 text-gray-300">
          <div className="flex gap-2 items-baseline" title="Conjunto de estados">
            <span className="font-semibold text-lg text-white">Q:</span>
            <span className="text-sm">{allStates.join(', ')}</span>
          </div>

          <div className="flex gap-2 items-baseline" title="Alfabeto">
            <span className="font-semibold text-lg text-white">Σ:</span>
            <span className="text-sm">{tuple.alphabet.join(', ')}</span>
          </div>

          <div className="flex gap-2 items-baseline" title="Estado inicial">
            <span className="font-semibold text-lg text-white">S<sub>0</sub>:</span>
            <span className="text-sm">{tuple.initState}</span>
          </div>

          <div className="flex gap-2 items-center" title="Estado final">
            <span className="font-semibold text-lg text-white">F:</span>
            <input
              type="text"
              value={tuple.finState || ''}
              onChange={handleFinalStateChange}
              className="bg-gray-800 border border-gray-600 rounded-md px-3 py-1 text-sm w-24 focus:ring-2 focus:ring-purple-500"
              placeholder="ex: qf"
            />
          </div>

          <div className="flex gap-2 items-baseline" title="Função de transição">
            <span className="font-semibold text-lg text-white">δ:</span>
            <span className="text-sm">{tuple.transFunction}</span>
          </div>

          <div className="flex gap-2 items-baseline" title="Alfabeto de fita">
            <span className="font-semibold text-lg text-white">Σ<sub>F</sub>:</span>
            <span className="text-sm">{tuple.tapeAlphabet.join(', ')}</span>
          </div>

          <div className="flex gap-2 items-baseline" title="Delimitador de fita">
            <span className="font-semibold text-lg text-white">&gt;:</span>
            <span className="text-sm">{tuple.tapeDelimitator}</span>
          </div>

          <div className="flex gap-2 items-baseline" title="Branco de fita">
            <span className="font-semibold text-lg text-white">B:</span>
            <span className="text-sm">{tuple.blank}</span>
          </div>

          <div className="flex gap-2 items-baseline" title="Conjunto de estados não-finais">
            <span className="font-semibold text-lg text-white">R:</span>
            <span className="text-sm">{tuple.nonFinalStates.filter(el => el !== tuple.finState).join(', ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TupleModal
