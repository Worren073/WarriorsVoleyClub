import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsSubmitting(true);
    const result = await login(username, password);
    setIsSubmitting(false);

    if (result.success) {
      Swal.fire({
        icon: 'success',
        title: '¡Bienvenido!',
        text: 'Inicio de sesión exitoso.',
        timer: 1500,
        showConfirmButton: false,
        background: '#f8f9fa',
        color: '#191c1d',
      });
      navigate('/dashboard');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de Acceso',
        text: result.error || 'Credenciales incorrectas.',
        confirmButtonColor: '#000000',
        background: '#f8f9fa',
        color: '#191c1d',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-container-low px-4 font-body">
      <div className="max-w-md w-full surface-card shadow-2xl space-y-8 p-10 border-none">
        <div className="text-center">
          <div className="font-headline font-black text-2xl text-primary tracking-tight uppercase mb-2">
            Guerreros de Maporal VC
          </div>
          <h2 className="text-3xl font-bold text-zinc-900">Iniciar Sesión</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Ingresa al sistema de gestión estratégica
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-bold text-zinc-700 uppercase tracking-wider">
                Usuario
              </label>
              <input
                id="username"
                type="text"
                required
                className="mt-1 block w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                placeholder="Nombre de usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-bold text-zinc-700 uppercase tracking-wider">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                className="mt-1 block w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-secondary focus:ring-secondary border-outline-variant rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-zinc-600">
                Recordarme
              </label>
            </div>
            <div className="text-sm">
              <a href="#" className="font-bold text-secondary hover:text-secondary/80">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full btn-primary py-4 uppercase flex justify-center items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Procesando...
                </span>
              ) : 'Entrar a la Cancha'}
            </button>
          </div>
        </form>
        
        <div className="text-center pt-4">
          <button 
            onClick={() => navigate('/')}
            className="text-sm text-zinc-500 hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
