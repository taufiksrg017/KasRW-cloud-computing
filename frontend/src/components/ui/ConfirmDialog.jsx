import { AlertTriangle, X } from 'lucide-react';

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, confirmText = 'Ya, Hapus' }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-xl w-full max-w-md mx-4 animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
            </div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">{title}</h3>
          </div>
          <button onClick={onCancel} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-slate-700">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-600 dark:text-gray-300">{message}</p>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/50 rounded-b-xl">
          <button onClick={onCancel} className="btn-secondary">Batal</button>
          <button
            onClick={onConfirm}
            className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-4 py-2.5 rounded-lg transition-colors"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;