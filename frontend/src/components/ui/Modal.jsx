import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-primary/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Content */}
      <div className="relative w-full max-w-2xl bg-surface surface-card shadow-2xl p-0 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
        <div className="border-b border-zinc-100 px-8 py-6 flex items-center justify-between bg-zinc-50/50">
          <h3 className="font-headline text-2xl font-black text-primary italic uppercase tracking-tight">{title}</h3>
          <button 
            onClick={onClose}
            className="material-symbols-outlined text-zinc-400 hover:text-rose-600 transition-colors p-2 rounded-lg hover:bg-rose-50"
          >
            close
          </button>
        </div>
        <div className="px-8 py-8 overflow-y-auto max-h-[80vh]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
