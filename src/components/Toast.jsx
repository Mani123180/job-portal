import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, X, Info } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-400" />,
    info: <Info className="w-5 h-5 text-sky-400" />
  };

  const bgColors = {
    success: 'border-emerald-500/20 bg-slate-900/90 text-emerald-100 shadow-emerald-500/5',
    error: 'border-rose-500/20 bg-slate-900/90 text-rose-100 shadow-rose-500/5',
    warning: 'border-amber-500/20 bg-slate-900/90 text-amber-100 shadow-amber-500/5',
    info: 'border-sky-500/20 bg-slate-900/90 text-sky-100 shadow-sky-500/5'
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-lg transition-all duration-300 transform translate-y-0 animate-fade-in ${bgColors[type]}`}>
      {icons[type]}
      <span className="text-sm font-medium">{message}</span>
      <button 
        onClick={onClose} 
        className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 transition-all"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
