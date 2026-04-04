import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Inicio', icon: 'grid_view', path: '/dashboard' },
    { name: 'Atletas', icon: 'groups', path: '/athletes' },
    { name: 'Pagos', icon: 'payments', path: '/payments' },
    { name: 'Horarios', icon: 'calendar_month', path: '/schedules' },
    { name: 'Competencias', icon: 'emoji_events', path: '/competitions' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-primary/60 backdrop-blur-sm z-[45] lg:hidden animate-in fade-in duration-300"
          onClick={onClose}
        ></div>
      )}

      <aside className={`fixed left-0 top-0 h-screen w-64 bg-primary text-white flex flex-col z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 border-b border-white/10">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="font-headline font-black text-xl tracking-tight leading-none italic uppercase">
              GUERREROS <br /> <span className="text-secondary-fixed">VC</span>
            </div>
          </Link>
        </div>

        <nav className="flex-grow py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl font-headline font-bold text-sm transition-all ${isActive
                  ? 'bg-secondary text-on-secondary shadow-lg scale-105'
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 mt-auto border-t border-white/10 bg-black/40">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary font-black">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="font-headline font-bold text-sm truncate">{user?.username || 'Usuario'}</p>
              <p className="font-body text-[10px] text-zinc-500 uppercase tracking-widest truncate">{user?.role || 'Staff'}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full mt-2 flex items-center gap-4 px-4 py-3 text-error hover:bg-error/10 rounded-xl transition-all font-headline font-bold text-sm uppercase"
          >
            <span className="material-symbols-outlined">logout</span>
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
