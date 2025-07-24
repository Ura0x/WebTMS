import type { Tuple } from "../types/TmTuple";

interface TupleModalProps {
  isOpen: boolean;
  onClose: () => void;
  tuple: Tuple;
  setTuple: React.Dispatch<React.SetStateAction<Tuple>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
}

function TupleModal({ isOpen, onClose, tuple, setTuple, setError }: TupleModalProps) {

    const handleFinalStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFinalState = e.target.value.trim();

        if (newFinalState === tuple.initState) {
        setError('Estado final não pode ser igual ao estado inicial');
        } else {
            setError('');
            setTuple(prev => ({
                ...prev,
                finState: newFinalState
            }));
        }
    };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/70 z-40"
      onClick={onClose}
    >
      <div
        className="relative bg-gray-900 rounded-lg p-6 shadow-lg max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 bg-gray-900 p-1 w-7 rounded-full text-red-500 hover:text-red-400 hover:cursor-pointer font-bold text-sm"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">Nôntupla da Máquina de Turing</h2>
        <div className="flex flex-col gap-1 text-gray-400">
            {/* Conjunto de estados */}
            <div className="flex gap-1 items-baseline" title="conjunto de estados">
                <span className="font-semibold text-lg">Q:</span>
                <span className="font-normal text-sm"> {Array.from(new Set([...tuple.states, tuple.finState])).filter(el => el != '').join(', ')}</span> 
            </div>

            {/* Alfabeto */}
            <div className="flex gap-1 items-baseline" title="alfabeto">
                <span className="font-semibold text-lg">Σ:</span>
                <span className="font-normal text-sm"> {tuple.alphabet.join(', ')}</span> 
            </div>

            {/* Estado inicial */}
            <div className="flex gap-1 items-baseline" title="estado inicial">
                <span className="font-semibold text-lg">S<sub>0</sub>:</span>
                <span className="font-normal text-sm">{tuple.initState}</span> 
            </div>

            {/* Estados final */}
            <div className="flex gap-1 items-baseline" title="Estado final">
                <span className="font-semibold text-lg">F:</span>
                <span className="font-normal text-sm">
                    <input
                        type="text"
                        value={tuple.finState || ''}
                        onChange={handleFinalStateChange}
                        className="bg-gray-800 rounded px-2 w-22 py-1 text-sm"
                        placeholder="digite aqui"
                    />    
                </span> 
            </div>

            {/* Função de transição */}
            <div className="flex gap-1 items-baseline" title="função de transição">
                <span className="font-semibold text-lg">δ:</span>
                <span className="font-normal text-sm">{tuple.transFunction}</span> 
            </div>

            {/* Alfabeto de fita */}
            <div className="flex gap-1 items-baseline" title="alfabeto de fita">
                <span className="font-semibold text-lg">Σ<sub>F</sub>:</span>
                <span className="font-normal text-sm"> {tuple.tapeAlphabet.join(', ')}</span> 
            </div>

            {/* Delimitador de fita */}
            <div className="flex gap-1 items-baseline" title="delimitador de fita">
                <span className="font-semibold text-lg">&gt;:</span>
                <span className="font-normal text-sm">{tuple.tapeDelimitator}</span> 
            </div>

            {/* Branco de fita */}
            <div className="flex gap-1 items-baseline" title="branco de fita">
                <span className="font-semibold text-lg">B:</span>
                <span className="font-normal text-sm">{tuple.blank}</span> 
            </div>

            {/* Conjunto de estados não-finais */}
            <div className="flex gap-1 items-baseline" title="conjunto de estados não-finais">
                <span className="font-semibold text-lg">R:</span>
                <span className="font-normal text-sm"> {tuple.nonFinalStates.filter(el => el != tuple.finState).join(', ')}</span> 
            </div>
        </div>
      </div>
    </div>
  );
}

export default TupleModal;
