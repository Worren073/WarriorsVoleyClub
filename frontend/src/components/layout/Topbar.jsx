import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Topbar = ({ title }) => {
  const { user } = useAuth();

  return (
    <header className="h-20 bg-white border-b border-zinc-100 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="font-headline text-2xl font-black text-primary tracking-tight uppercase italic">{title}</h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex flex-col items-end">
          <span className="font-headline font-bold text-sm text-primary">{user?.first_name} {user?.last_name}</span>
          <span className="text-zinc-500 font-body text-[10px] uppercase tracking-widest leading-none">{user?.role}</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center p-0.5 overflow-hidden shadow-sm">
          {user?.avatar ? (
            <img src={user.avatar} alt="Profile" className="w-full h-full object-cover rounded-[10px]" />
          ) : (
            <span className="material-symbols-outlined text-zinc-400">person</span>
          )}
        </div>
        <button className="material-symbols-outlined text-zinc-400 hover:text-primary transition-colors p-2 rounded-lg hover:bg-zinc-50">notifications</button>
      </div>
    </header>
  );
};

export default Topbar;
