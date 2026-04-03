import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const PublicNavbar = () => {
  const { user, isAdmin, isCoach, isStaff } = useAuth();
  
  // Condición para mostrar Atletas y Pagos (entrenadores, staff o administradores)
  const canManage = isAdmin || isCoach || isStaff;

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl flex justify-between items-center px-8 h-16 max-w-full font-headline">
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

      <div className="flex items-center space-x-4">
        <span className="material-symbols-outlined text-zinc-900 cursor-pointer p-2 hover:bg-zinc-100 rounded-full transition-all">
          notifications
        </span>
        <span className="material-symbols-outlined text-zinc-900 cursor-pointer p-2 hover:bg-zinc-100 rounded-full transition-all">
          settings
        </span>
        <Link to={user ? "/dashboard" : "/login"}>
          <button className="btn-primary py-2 px-6">
            {user ? 'Dashboard' : 'Ingresar'}
          </button>
        </Link>
      </div>
    </nav>
  )
}

export default PublicNavbar


