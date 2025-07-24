
interface ErrorModalProps {
  error: string;
  setError: (msg: string) => void;
}

function ErrorModal({ error, setError }: ErrorModalProps) {
  if (!error) return null; 

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="relative bg-gray-950 border-2 border-gray-900 text-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <button
          onClick={() => setError('')}
          className="absolute top-2 right-2 bg-gray-900 p-1 w-7 rounded-full text-red-500 hover:text-red-400 hover:cursor-pointer font-bold text-sm"
        >
          X
        </button>
        <h2 className="text-xl font-semibold mb-4 text-red-500">Erro!</h2>
        <span className="text-red-300">{error}</span>
      </div>
    </div>
  );
}

export default ErrorModal;
