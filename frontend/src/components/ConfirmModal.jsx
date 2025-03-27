export default function ConfirmModal({ isOpen, onClose, onConfirm, mensagem }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center relative">
          <h2 className="text-lg font-semibold mb-4">Confirmação</h2>
          <p className="text-sm text-gray-700 mb-6">{mensagem}</p>
  
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-sm"
            >
              Cancelar
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white text-sm"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    );
  }
  