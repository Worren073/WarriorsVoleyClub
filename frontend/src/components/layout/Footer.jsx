import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 dark:bg-zinc-950 font-body">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-12 py-12 w-full max-w-full">
        <div className="space-y-4">
          <div className="font-headline font-black text-lg text-zinc-900 border-none">Guerreros de Maporal VC</div>
          <p className="text-xs uppercase tracking-widest text-zinc-500">© 2024 Guerreros de Maporal VC. Precisión Kinética.</p>
        </div>
        <div className="flex flex-col space-y-2">
          <h4 className="text-xs uppercase tracking-widest font-black text-zinc-900 mb-2">Navegación</h4>
          {['Sobre Nosotros', 'Contacto', 'Política de Privacidad', 'Términos de Servicio'].map((link) => (
            <a key={link} className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 transition-colors" href={`#${link.toLowerCase().replace(' ', '-')}`}>
              {link}
            </a>
          ))}
        </div>
        <div className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest font-black text-zinc-900">Conecta</h4>
          <div className="flex space-x-4">
            <span className="material-symbols-outlined text-zinc-500 hover:text-zinc-900 cursor-pointer transition-colors">public</span>
            <span className="material-symbols-outlined text-zinc-500 hover:text-zinc-900 cursor-pointer transition-colors">chat</span>
            <span className="material-symbols-outlined text-zinc-500 hover:text-zinc-900 cursor-pointer transition-colors">mail</span>
          </div>
          <p className="text-[10px] text-zinc-400 uppercase tracking-[0.2em] leading-relaxed">
            Diseñado para el máximo rendimiento. Construido para la élite. 
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
