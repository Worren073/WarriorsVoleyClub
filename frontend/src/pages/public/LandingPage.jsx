import React from 'react';
import PublicNavbar from '../../components/layout/PublicNavbar';
import Footer from '../../components/layout/Footer';

const LandingPage = () => {
  const coaches = [
    { name: 'Marco Silva', role: 'Director Técnico Principal', stars: 5, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABulBYZe9DCT00yJZeYDSvA9srrzcf0fBiekh--N7KqrwfJ_afrXkmczgEiZnj_vBdnaf15XzruCh1uGqB2z7DdoP5Csp3nQtQi-m2Bo3qFcGq47Pc45nHSmH1jtmLpChWy4SK7LIm3oRSR_kuuMZPlefpdiuOa6U16DwaK9hbHifikazBbWTCNK436vfvhG1y_NhM0zFzUVNxHUm92ar6ruREGeAz9z0SkKnsA8Fv1jc2jQLUocA8DjSwSxSZzajcPDe2o0vU5ew' },
    { name: 'Elena Rodriguez', role: 'Especialista Defensiva', stars: 4, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgLO0h9KVyADN0qG5u5Ftzubv_o6jj_-fvSKmwkmrDkMjln4YWW-uHR1bTH4iMtkBA4J_28VzJE6bQIXjY3n_heFMOfDIrI8QnrpnoTtQdVMqf4_iru0nZVsyqeyDB3i_YlbtJv4I9ySLYM5oZXY2wz0jtBQDTh-rq4cDUe_Yhm3Uyj0qqqaj5nX8Zh5alzrSo52A57vTmpYSaAnwsu-FJKaF4u_2pVxoOMOXsURZch2Z-lPMPFJIRFOqqG6Vu_jpwRVhpw8FZ9RU' },
    { name: 'David Chen', role: 'Rendimiento del Pasador', stars: 4, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_DdzwSBNTlhxzUanrpGerIpRiF8RCkFJShJGXysV5MzbL8WkTb2yEebOdRF-PJZTrwU-QtepvSZKxfhd0fLP-UMyGBYbHdUkaowTBXTf0ynCTW63RfCkRfKjItbBR-VUWKaddHNKTAfixiCaxC97cMuQqwwGwfw_qMTlJn4_otSHucfyP_Fa4UxMaEPe8AWnQx0EW81G7na1_3v1pqu47gdyHpXToqQZdWWacoNzKBn6GFRK4Rl6hSiz9MGpW7nJh6N4HOfj0B4I' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <PublicNavbar />
      
      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuA_MYG7wcjNx8BZQf3SOeNGp4KYM-edxrs8-A8cVW7r_E_t3XuyGDM_9Ox3j0RAOw0IGOcdT8_2eYZvZTkiLIqBKWfgWxHHntOlfvbI5eBhWamlG3fRKWfo6u01lvydtVmF7pUAzBsFr0v7tvc67nXknmhwLesF4L1_opQoPtSthLhLQOri7h_lPV2lKR_3z2OFPVFAOae6jkn0vcEjhmZn4NWZ0xWneU5zOVxHX4DbwLjlFHZPUi4Jp6wT3aAR26b3ovrrp2xQ2LE')" }}></div>
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="relative z-10 text-center px-6 max-w-5xl">
            <h1 className="font-headline text-5xl md:text-8xl font-black text-white tracking-tight leading-none mb-6 uppercase italic">
              PRECISIÓN <span className="text-secondary-fixed">KINÉTICA</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto mb-10">
              Entrenamiento de voleibol de élite donde la energía explosiva se encuentra con la exactitud quirúrgica. Bienvenidos al hogar de los Guerreros.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button className="btn-primary py-4 px-10 text-lg">Únete a las Filas</button>
              <button className="bg-white/10 kinetic-blur text-white border border-white/20 px-10 py-4 rounded-xl font-headline font-bold text-lg hover:bg-white/20 transition-all">Ver Horarios</button>
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
            <div className="space-y-8">
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
            <div className="relative">
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
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="font-headline text-4xl md:text-6xl font-black text-primary tracking-tight uppercase">LOS NUEVE ÉLITE.</h2>
                <p className="font-body text-on-surface-variant mt-4 text-lg">Mentoría de clase mundial impulsada por la precisión táctica.</p>
              </div>
              <div className="h-px flex-grow bg-outline-variant/30 mx-8 hidden lg:block"></div>
              <span className="material-symbols-outlined text-4xl text-secondary">groups</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {coaches.map((coach, index) => (
                <div key={index} className="surface-card surface-card-hover relative overflow-hidden group">
                  <div className="absolute left-0 top-0 w-1 h-full bg-secondary"></div>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-zinc-100 flex-shrink-0">
                      <img className="w-full h-full object-cover" src={coach.img} alt={coach.name} />
                    </div>
                    <div>
                      <h3 className="font-headline text-xl font-bold text-primary">{coach.name}</h3>
                      <p className="text-secondary font-bold text-xs uppercase tracking-widest mt-1">{coach.role}</p>
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
        <section className="py-24 px-8">
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
