import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const [isHovered, setIsHovered] = React.useState(false);

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

      <aside 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed left-0 top-0 h-screen bg-primary text-white flex flex-col z-50 transition-all duration-300 transform ${isOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'} ${isHovered ? 'lg:w-64 shadow-2xl' : 'lg:w-20'} overflow-hidden`}
      >
        <div className="p-6 border-b border-white/10 flex items-center h-24 overflow-hidden">
          <Link to="/" className="hover:opacity-80 transition-opacity">
            <div className="font-headline font-black text-xl tracking-tight leading-none italic uppercase flex items-center gap-3 whitespace-nowrap">
              <span className="text-secondary-fixed text-3xl">G</span>
              {(isHovered || isOpen) && (
                <span className="animate-in fade-in slide-in-from-left-4 duration-500 flex flex-nowrap gap-1">
                  UERREROS <span className="text-secondary-fixed">VC</span>
                </span>
              )}
            </div>
          </Link>
        </div>

        <nav className="flex-grow py-6 px-3 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl font-headline font-bold text-sm transition-all relative group whitespace-nowrap ${isActive
                  ? 'bg-secondary text-on-secondary shadow-lg scale-105'
                  : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <span className="material-symbols-outlined flex-shrink-0">{item.icon}</span>
              {(isHovered || isOpen) && (
                <span className="animate-in fade-in slide-in-from-left-4 duration-500">
                  {item.name}
                </span>
              )}
              {/* Tooltip for mini sidebar */}
              {!isHovered && !isOpen && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-zinc-800 text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl border border-white/5">
                  {item.name}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-3 mt-auto border-t border-white/10 bg-black/20">
          <div className="flex items-center gap-3 p-2 whitespace-nowrap overflow-hidden">
            <div className="w-10 h-10 rounded-full bg-secondary-fixed flex-shrink-0 flex items-center justify-center text-secondary font-black border-2 border-secondary/20 shadow-inner">
              {user?.username?.charAt(0).toUpperCase() || 'U'}
            </div>
            {(isHovered || isOpen) && (
              <div className="overflow-hidden animate-in fade-in slide-in-from-left-4 duration-500">
                <p className="font-headline font-bold text-sm truncate">{user?.username || 'Usuario'}</p>
                <p className="font-body text-[10px] text-zinc-500 uppercase tracking-widest truncate">{user?.role || 'Staff'}</p>
              </div>
            )}
          </div>
          <button
            onClick={logout}
            className="w-full mt-2 flex items-center gap-4 px-4 py-3 text-error hover:bg-error/10 rounded-xl transition-all font-headline font-bold text-sm uppercase group whitespace-nowrap overflow-hidden"
          >
            <span className="material-symbols-outlined flex-shrink-0">logout</span>
            {(isHovered || isOpen) && (
              <span className="animate-in fade-in slide-in-from-left-4 duration-500">
                Cerrar Sesión
              </span>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
