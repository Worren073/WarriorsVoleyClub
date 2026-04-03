import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PublicNavbar = () => {
  const { user, isAdmin, isCoach, isStaff, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const dropdownTimer = useRef(null);
  const navigate = useNavigate();
  
  // Condición para mostrar Atletas y Pagos (entrenadores, staff o administradores)
  const canManage = isAdmin || isCoach || isStaff;

  const closeDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowDropdown(false);
      setIsClosing(false);
    }, 300); // Coincide con la duración de la animación en index.css
  };

  const handleMouseEnter = () => {
    if (dropdownTimer.current) {
      clearTimeout(dropdownTimer.current);
      dropdownTimer.current = null;
    }
    if (isClosing) {
      setIsClosing(false);
      setShowDropdown(true);
    }
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => {
      closeDropdown();
    }, 2000);
  };

  const toggleDropdown = () => {
    if (showDropdown) {
      closeDropdown();
    } else {
      setShowDropdown(true);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl flex justify-between items-center px-8 h-16 max-w-full font-headline border-b border-zinc-100">
      <Link to="/" className="text-xl font-black text-zinc-900 tracking-tight">
        Guerreros de Maporal VC
      </Link>
      
      <div className="hidden md:flex items-center space-x-8 font-bold tracking-tight text-sm uppercase">
        <Link 
          to="/" 
          className="text-zinc-900 border-b-2 border-zinc-900 pb-1"
        >
          Inicio
        </Link>
        
        {canManage && (
          <>
            <Link 
              to="/athletes" 
              className="text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Atletas
            </Link>
            <Link 
              to="/payments" 
              className="text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              Pagos
            </Link>
          </>
        )}

        <Link 
          to="/schedules" 
          className="text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          Horarios
        </Link>
        <Link 
          to="/competitions" 
          className="text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          Competencias
        </Link>
      </div>

      <div className="flex items-center space-x-4 relative">
        <span className="material-symbols-outlined text-zinc-900 cursor-pointer p-2 hover:bg-zinc-100 rounded-full transition-all">
          notifications
        </span>
        
        {user && (
          <div 
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <span 
              className={`material-symbols-outlined text-zinc-900 cursor-pointer p-2 hover:bg-zinc-100 rounded-full transition-all duration-300 ${showDropdown ? 'bg-zinc-100 rotate-90' : ''}`}
              onClick={toggleDropdown}
            >
              settings
            </span>

            {showDropdown && (
              <div className={`absolute right-0 top-full mt-2 w-56 bg-white border border-zinc-100 rounded-xl shadow-2xl p-2 z-50 ${isClosing ? 'animate-slide-up' : 'animate-slide-down'}`}>
                {/* Dashboard (Solo Staff/Admin) */}
                {canManage && (
                  <Link 
                    to="/dashboard" 
                    className="flex items-center space-x-2 p-3 hover:bg-zinc-50 rounded-lg transition-colors text-zinc-700 font-bold text-xs uppercase tracking-wider"
                    onClick={() => setShowDropdown(false)}
                  >
                    <span className="material-symbols-outlined text-lg text-secondary">dashboard</span>
                    <span>Dashboard</span>
                  </Link>
                )}

                {/* Vínculo Público: Mi Perfil */}
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 p-3 hover:bg-zinc-50 rounded-lg transition-colors text-zinc-700 font-bold text-xs uppercase tracking-wider"
                  onClick={() => setShowDropdown(false)}
                >
                  <span className="material-symbols-outlined text-lg text-zinc-500">account_circle</span>
                  <span>Mi Perfil</span>
                </Link>

                <div className="border-t border-zinc-100 my-1"></div>

                {/* Botón: Modo Oscuro */}
                <button 
                  className="w-full flex items-center justify-between p-3 hover:bg-zinc-50 rounded-lg transition-colors text-zinc-700 font-bold text-xs uppercase tracking-wider text-left"
                  onClick={() => console.log('Modo oscuro click')}
                >
                  <div className="flex items-center space-x-2">
                    <span className="material-symbols-outlined text-lg text-zinc-500">dark_mode</span>
                    <span>Modo Oscuro</span>
                  </div>
                  <div className="w-8 h-4 bg-zinc-200 rounded-full relative">
                    <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full transition-all"></div>
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {user ? (
          <button 
            onClick={handleLogout}
            className="py-2 px-6 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-all font-bold text-xs uppercase"
          >
            Cerrar Sesión
          </button>
        ) : (
          <Link to="/login">
            <button className="py-2 px-6 bg-zinc-900 text-white rounded-full hover:bg-zinc-800 transition-all font-bold text-xs uppercase">
              Ingresar
            </button>
          </Link>
        )}
      </div>
    </nav>
  )
}

export default PublicNavbar


