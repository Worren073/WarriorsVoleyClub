import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicNavbar from '../../components/layout/PublicNavbar';
import Footer from '../../components/layout/Footer';

// Importación de imágenes generadas (simuladas por ruta absoluta para el entorno local)
const LandingPage = () => {
  const coaches = [
    { 
      name: 'Rafael Barrios', 
      role: 'Master Masculino y Femenino', 
      stars: 5, 
      img: '/img/coaches/rafael_barrios_coach_1775257439684.png' 
    },
    { 
      name: 'Worren Barrios', 
      role: 'Mini Voley, Infantil y Pre-Juvenil Masculino', 
      stars: 5, 
      img: '/img/coaches/worren_barrios_coach_1775257465857.png' 
    },
    { 
      name: 'Francisco Guerrero', 
      role: 'Infantil y Pre-Juvenil Femenino', 
      stars: 5, 
      img: '/img/coaches/francisco_guerrero_coach_1775257483114.png' 
    },
    { 
      name: 'Juan Gomez', 
      role: 'Iniciación y Desarrollo', 
      stars: 4, 
      img: '/img/coaches/juan_gomez_coach_1775257525860.png' 
    },
    { 
      name: 'Daniela Perez', 
      role: 'Mini Voley Femenino', 
      stars: 5, 
      img: '/img/coaches/daniela_perez_coach_1775257539809.png' 
    },
    { 
      name: 'Yonder Mercado', 
      role: 'Desarrollo Femenino', 
      stars: 4, 
      img: '/img/coaches/yonder_mercado_coach_1775257552715.png' 
    },
    { 
      name: 'Crisdaly', 
      role: 'Staff Técnico', 
      stars: 4, 
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200' 
    },
    { 
      name: 'Liz Zarate', 
      role: 'Administradora', 
      stars: 5, 
      img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200' 
    },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-surface overflow-x-hidden">
      <PublicNavbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_MYG7wcjNx8BZQf3SOeNGp4KYM-edxrs8-A8cVW7r_E_t3XuyGDM_9Ox3j0RAOw0IGOcdT8_2eYZvZTkiLIqBKWfgWxHHntOlfvbI5eBhWamlG3fRKWfo6u01lvydtVmF7pUAzBsFr0v7tvc67nXknmhwLesF4L1_opQoPtSthLhLQOri7h_lPV2lKR_3z2OFPVFAOae6jkn0vcEjhmZn4NWZ0xWneU5zOVxHX4DbwLjlFHZPUi4Jp6wT3aAR26b3ovrrp2xQ2LE')" }}></div>
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="relative z-10 text-center px-6 max-w-5xl">
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tight leading-none mb-6 uppercase italic animate-in fade-in slide-in-from-top-10 duration-1000">
              PRECISIÓN <span className="text-secondary-fixed">KINÉTICA</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
              Entrenamiento de voleibol de élite donde la energía explosiva se encuentra con la exactitud quirúrgica. Bienvenidos al hogar de los Guerreros.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center animate-in fade-in zoom-in duration-700 delay-500">
              <button className="btn-primary py-4 px-10 text-lg">Únete a las Filas</button>
              <Link to="/schedules">
                <button className="w-full md:w-auto bg-white/10 kinetic-blur text-white border border-white/20 px-10 py-4 rounded-xl font-headline font-bold text-lg hover:bg-white/20 transition-all">Ver Horarios</button>
              </Link>
            </div>
          </div>
          <div className="absolute bottom-10 left-10 flex items-center gap-4">
            <div className="h-1 w-24 bg-secondary"></div>
            <span className="font-headline text-white font-bold tracking-widest text-sm uppercase">EST. 2012</span>
          </div>
        </section>

        {/* About Section */}
        <section className="py-24 px-8 bg-surface">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 reveal">
              <div className="inline-block px-4 py-1 bg-secondary-fixed text-secondary font-headline font-bold text-xs tracking-widest uppercase rounded-full">Nuestro Legado</div>
              <h2 className="font-headline text-4xl md:text-6xl font-black text-primary leading-tight tracking-tight uppercase">
                HISTORIA NACIDA EN <br/> LA CANCHA.
              </h2>
              <p className="font-body text-lg text-on-surface/80 leading-relaxed">
                Fundada en el corazón de Maporal, nuestra escuela comenzó con una sola red y la visión de redefinir la excelencia atlética. Durante la última década, hemos evolucionado hasta convertirnos en un motor de alto rendimiento.
              </p>
              <div className="grid grid-cols-2 gap-8 pt-4">
                <div className="border-l-4 border-secondary pl-4">
                  <div className="font-headline text-3xl font-black text-primary">15+</div>
                  <div className="font-body text-sm text-on-surface-variant uppercase tracking-wider">Títulos de Campeonato</div>
                </div>
                <div className="border-l-4 border-secondary pl-4">
                  <div className="font-headline text-3xl font-black text-primary">450+</div>
                  <div className="font-body text-sm text-on-surface-variant uppercase tracking-wider">Atletas Activos</div>
                </div>
              </div>
            </div>
            <div className="relative reveal reveal-delay-2">
              <div className="aspect-square rounded-xl overflow-hidden shadow-2xl bg-zinc-200">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCR5rTbEcg9KNn5F9dI56onCgovY_3D8yBmM2kZBHA0wqrUjMYRJklGotZD1dIWXO_IdTT02dptWCnXhdUQqzq8KMdP2805WsFQ29Pvh_GcvgGLLvX4K35rlL3EIJDcoie4_YyxCdXeUp5d_mQeiJXtyu-SjbWCxV8en1H0jV8ZsGaPT4TWMpRfrgXrC3HxBmWruCapfVLNQvhg0-xfGwrgB9cCYVftFcl_5evTGkHQJghP5Se5MKGINBLJ2qgNBbeb65jKCL08a_Y" alt="Legacy" />
              </div>
              <div className="absolute -bottom-8 -left-8 p-8 bg-secondary-container rounded-xl shadow-xl max-w-xs hidden md:block">
                <p className="font-headline font-bold text-on-secondary-container italic">"Nuestra misión es forjar no solo jugadores, sino guerreros estratégicos de la cancha."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Coaches Section */}
        <section className="py-24 px-8 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 reveal">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black text-primary tracking-tight uppercase">NUESTRO EQUIPO.</h2>
                <p className="font-body text-on-surface-variant mt-4 text-lg">Mentoría de clase mundial impulsada por la precisión táctica.</p>
              </div>
              <div className="h-px flex-grow bg-outline-variant/30 mx-8 hidden lg:block"></div>
              <span className="material-symbols-outlined text-4xl text-secondary">groups</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coaches.map((coach, index) => (
                <div key={index} className={`surface-card surface-card-hover relative overflow-hidden group reveal reveal-delay-${(index % 4) + 1}`}>
                  <div className="absolute left-0 top-0 w-1 h-full bg-secondary"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-zinc-100 flex-shrink-0">
                      <img className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" src={coach.img} alt={coach.name} />
                    </div>
                    <div>
                      <h3 className="font-headline text-lg font-bold text-primary leading-tight">{coach.name}</h3>
                      <p className="text-secondary font-bold text-[10px] uppercase tracking-widest mt-1">{coach.role}</p>
                      <div className="flex gap-1 mt-3">
                        {[...Array(coach.stars)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-xs text-secondary-fixed-dim" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-8 reveal">
          <div className="max-w-7xl mx-auto bg-primary rounded-3xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-20 pointer-events-none">
              <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLtDkewFLw1BhDIQw6I_W6-6hUiXBU_ED8TT2h-uzzHDnPQZC3mnijDnau54y5mnAckwF6bAhKHKv972cDbSjvAWPMKzFhNbh8MFk98CozhzENwnKFfa0l91hCiwQYXTOzhpDG9lVcLRXJhGlxK098id8rsRwIZCBZJc0ZkWNML088LmjiyXzSga7Ucfn4UTy9fhq9C7IbjKU_J7iBsiIQ7gb-m1TjQ9GncZAPxDaZoa-A1735r_ZXgCXW7G2El4yWlMXtqSCU" alt="Court" />
            </div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-headline text-4xl md:text-5xl font-black text-white mb-6 uppercase italic">¿LISTO PARA ENTRAR <br/> A LA CANCHA?</h2>
              <p className="font-body text-zinc-400 text-lg mb-10">Cupos limitados disponibles para nuestros bloques de entrenamiento de élite que comienzan el próximo mes. Asegura tu lugar y vive la Precisión Kinética.</p>
              <button className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-xl font-headline font-black text-xl hover:scale-105 transition-transform uppercase">REGÍSTRATE AHORA</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
