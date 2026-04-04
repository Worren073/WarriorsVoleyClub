import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/ui/Modal';
import CompetitionForm from '../../components/forms/CompetitionForm';
import CompetitionDetailsModal from '../../components/ui/CompetitionDetailsModal';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

const CompetitionsList = () => {
  const { user } = useAuth();
  const [competitions, setCompetitions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedComp, setSelectedComp] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [compRes, matchRes] = await Promise.all([
        api.get('/competitions/'),
        api.get('/competitions/matches/', { params: { status: 'finalizado', ordering: '-match_date' } })
      ]);
      setCompetitions(compRes.data.results || compRes.data);
      setMatches(matchRes.data.results || matchRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (formData) => {
    try {
      await api.post('/competitions/', formData);
      Swal.fire({ icon: 'success', title: 'Torneo Registrado', timer: 1500, showConfirmButton: false });
      setIsFormOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error creating competition:', error);
    }
  };

  const openDetails = (comp) => {
    setSelectedComp(comp);
    setIsDetailsOpen(true);
  };

  const canManage = user?.role === 'administrador' || user?.role === 'staff';

  return (
    <DashboardLayout title="Competiciones & Torneos">
      <div className="space-y-8">
        {/* Actions Bar */}
        {canManage && (
          <div className="flex justify-end items-center bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
            <button 
              onClick={() => setIsFormOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <span className="material-symbols-outlined">emoji_events</span>
              Nueva Competencia
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Active Competitions */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
               <h2 className="font-headline text-3xl font-black text-primary uppercase italic tracking-tight">Torneos Activos</h2>
               <span className="material-symbols-outlined text-secondary">trending_up</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {competitions.map((comp) => (
                <div key={comp.id} className="surface-card p-0 border-none shadow-sm group relative overflow-hidden">
                  <div className="h-2 bg-secondary bg-gradient-to-r from-secondary to-secondary-container"></div>
                  <div className="p-8">
                     <div className="flex items-center justify-between mb-4">
                       <span className="px-3 py-1 bg-secondary-fixed text-secondary font-headline font-black text-[10px] uppercase tracking-widest rounded-full">{comp.type_display}</span>
                       <span className="font-body text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none">{comp.start_date}</span>
                     </div>
                     <h3 className="font-headline text-2xl font-black text-primary uppercase italic leading-none mb-2">{comp.name}</h3>
                     <p className="font-body text-xs text-zinc-500 uppercase tracking-widest font-bold mb-6">{comp.location}</p>
                     
                     <div className="flex items-center justify-between border-t border-zinc-50 pt-6">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-zinc-300">sports_volleyball</span>
                          <span className="font-headline font-bold text-xs text-zinc-400 uppercase tracking-widest italic">{comp.matches_count} Partidos</span>
                        </div>
                        <button 
                          onClick={() => openDetails(comp)}
                          className="text-secondary font-headline font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform italic underline decoration-secondary"
                        >
                          Ver Dashboard Torneo
                        </button>
                     </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Match History */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex items-center justify-between">
               <h2 className="font-headline text-2xl font-black text-primary uppercase italic tracking-tight">Partidos Disputados</h2>
               <span className="material-symbols-outlined text-emerald-600">playlist_add_check</span>
            </div>

            <div className="space-y-4">
              {matches.map((match) => (
                <div key={match.id} className={`surface-card p-6 border shadow-sm relative overflow-hidden flex flex-col items-center gap-4 group hover:translate-y-[-4px] transition-all duration-300 ${match.result === 'ganado' ? 'border-emerald-100' : 'border-rose-100'}`}>
                   {/* Background Match Status Icon */}
                   <div className={`absolute top-0 right-0 p-2 opacity-10 ${match.result === 'ganado' ? 'text-emerald-600' : 'text-rose-600'}`}>
                      <span className="material-symbols-outlined text-4xl">{match.result === 'ganado' ? 'verified' : 'cancel'}</span>
                   </div>
                   
                   <div className="flex flex-col items-center justify-center text-center">
                      <p className="font-body text-[9px] text-zinc-400 font-black uppercase tracking-[0.2em] mb-1">{match.competition_name}</p>
                      <p className="font-headline font-black text-[10px] text-secondary uppercase tracking-widest italic leading-none">{match.phase_display}</p>
                   </div>
                   
                   <div className="flex items-center justify-between w-full">
                     <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center font-headline font-black text-lg text-primary border border-zinc-100 italic">W</div>
                        <span className="font-headline font-bold text-[8px] text-primary uppercase italic tracking-tighter truncate w-20 text-center">WARRIORS</span>
                     </div>
                     
                     <div className="flex flex-col items-center">
                        <div className="font-headline font-black text-2xl text-primary italic leading-none px-2 py-1 rounded-lg">
                          {match.score}
                        </div>
                        <div className={`mt-2 px-3 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${match.result === 'ganado' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                          {match.result}
                        </div>
                     </div>
                     
                     <div className="flex flex-col items-center gap-2 flex-1">
                        <div className="w-10 h-10 rounded-xl bg-zinc-50 flex items-center justify-center font-headline font-black text-lg text-primary border border-zinc-100 italic">{match.away_team.charAt(0)}</div>
                        <span className="font-headline font-bold text-[8px] text-primary uppercase italic tracking-tighter truncate w-20 text-center">{match.away_team}</span>
                     </div>
                   </div>
                   
                   <div className="w-full h-px bg-zinc-50"></div>
                   <div className="flex flex-col items-center gap-1">
                      <p className="font-body text-[8px] text-zinc-400 font-black uppercase tracking-widest italic">{new Date(match.match_date).toLocaleDateString()}</p>
                      <p className="font-body text-[8px] text-zinc-400 font-bold uppercase tracking-[0.15em] text-center">{match.venue}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Registro de Torneo Modal */}
      <Modal 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)}
        title="Configurar Nueva Competición"
      >
        <CompetitionForm 
          onSubmit={handleCreate} 
          onCancel={() => setIsFormOpen(false)} 
        />
      </Modal>

      {/* Detalles y Estadísticas Modal */}
      <CompetitionDetailsModal 
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        competition={selectedComp}
        onUpdate={fetchData}
      />
    </DashboardLayout>
  );
};

export default CompetitionsList;
