import { useTuring } from '../context/TuringContext'

function ErrorModal() {
  const { error, setError } = useTuring();

  if (!error) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative bg-gray-950 border border-gray-700 text-white p-6 rounded-xl shadow-lg max-w-md w-full mx-4">
        <button
          onClick={() => setError('')}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-gray-800 hover:bg-gray-700 text-red-500 hover:text-red-400 transition-colors cursor-pointer font-bold text-sm"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-3 text-red-500">Erro!</h2>
        <p className="text-red-300">{error}</p>
      </div>
    </div>
  );
}

export default ErrorModal
