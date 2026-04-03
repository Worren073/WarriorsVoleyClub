import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import PublicNavbar from './PublicNavbar';
import { useAuth } from '../../context/AuthContext';

const DashboardLayout = ({ children, title = 'Dashboard' }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  // Si no hay usuario, mostramos el layout público (sin sidebar, con navbar superior)
  if (!user) {
    return (
      <div className="min-h-screen bg-surface-container-low font-body selection:bg-secondary selection:text-white">
        <PublicNavbar />
        <main className="pt-20 px-4 md:px-8 max-w-7xl mx-auto animate-in fade-in duration-500">
          <header className="mb-8">
            <h1 className="font-headline text-3xl font-black text-primary tracking-tight uppercase italic underline decoration-secondary decoration-4 underline-offset-8">
              {title}
            </h1>
          </header>
          {children}
        </main>
      </div>
    );
  }

  // Layout original para usuarios autenticados
  return (
    <div className="min-h-screen bg-surface-container-low flex font-body selection:bg-secondary selection:text-white">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 lg:ml-64 min-h-screen flex flex-col transition-all duration-300">
        <div className="flex items-center">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden p-4 text-primary bg-white border-b border-zinc-100 h-20"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <div className="flex-1">
            <Topbar title={title} />
          </div>
        </div>
        
        <div className="p-4 md:p-8 h-full">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

