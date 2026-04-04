import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import Modal from './Modal';
import MatchForm from '../forms/MatchForm';
import SetPointsForm from '../forms/SetPointsForm';
import RosterManager from '../forms/RosterManager';
import Skeleton from './Skeleton';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

const CompetitionDetailsModal = ({ isOpen, onClose, competition, onUpdate }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('stats');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  
  // Scoring
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  
  // Roster
  const [isRosterModalOpen, setIsRosterModalOpen] = useState(false);

  // Local state for reactivity
  const [localCompetition, setLocalCompetition] = useState(null);

  const canEdit = user?.role === 'administrador' || user?.role === 'staff';

  useEffect(() => {
    if (isOpen && competition) {
      setLocalCompetition(competition);
      fetchCompetitionDetails();
      fetchMatches();
    }
  }, [isOpen, competition?.id]);

  const fetchCompetitionDetails = async () => {
    try {
      const response = await api.get(`/competitions/${competition.id}/`);
      setLocalCompetition(response.data);
    } catch (error) {
      console.error('Error fetching competition detail:', error);
    }
  };

  const fetchMatches = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/competitions/matches/?competition=${competition.id}`);
      setMatches(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching matches:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMatch = async (formData) => {
    try {
      await api.post('/competitions/matches/', { ...formData, competition: localCompetition.id });
      Swal.fire({ icon: 'success', title: 'Partido Registrado', timer: 1500, showConfirmButton: false });
      setIsMatchModalOpen(false);
      fetchCompetitionDetails();
      fetchMatches();
      onUpdate();
    } catch (error) {
      console.error('Error adding match:', error);
    }
  };

  const handleUpdateSetPoints = async (setPoints) => {
    try {
      await api.patch(`/competitions/matches/${selectedMatch.id}/`, { set_points: setPoints });
      Swal.fire({ icon: 'success', title: 'Puntuación Actualizada', timer: 1500, showConfirmButton: false });
      setIsScoreModalOpen(false);
      fetchCompetitionDetails();
      fetchMatches();
      onUpdate();
    } catch (error) {
      console.error('Error updating set points:', error);
    }
  };

  const handleUpdateRoster = async (rosterData) => {
    try {
      await api.patch(`/competitions/${localCompetition.id}/`, rosterData);
      Swal.fire({ icon: 'success', title: 'Roster Actualizado', timer: 1500, showConfirmButton: false });
      setIsRosterModalOpen(false);
      fetchCompetitionDetails();
      onUpdate();
    } catch (error) {
      console.error('Error updating roster:', error);
    }
  };

  const handleMatchClick = (match) => {
    if (!canEdit) return;
    setSelectedMatch(match);
    setIsScoreModalOpen(true);
  };

  if (!localCompetition) return null;

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`Dashboard: ${localCompetition.name}`}
      className="max-w-6xl z-50"
    >
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="surface-card p-4 border border-zinc-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary shadow-inner">
              <span className="material-symbols-outlined">emoji_events</span>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{localCompetition.type_display}</p>
              <h5 className="font-headline font-black text-lg text-primary uppercase italic leading-none">{localCompetition.name}</h5>
            </div>
          </div>
          <div className="surface-card p-4 border border-zinc-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Categoría</p>
              <h5 className="font-headline font-black text-lg text-primary uppercase italic leading-none">{localCompetition.category_name}</h5>
            </div>
          </div>
          <div className="surface-card p-4 border border-zinc-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center text-zinc-400 shadow-inner">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Entrenador</p>
              <h5 className="font-headline font-black text-sm text-primary uppercase italic leading-none">{localCompetition.coach_name}</h5>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2 border-b border-zinc-100">
          <button 
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-3 font-headline font-black text-xs uppercase tracking-widest italic border-b-2 transition-all ${activeTab === 'stats' ? 'border-primary text-primary' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
          >
            Estadísticas
          </button>
          <button 
            onClick={() => setActiveTab('matches')}
            className={`px-6 py-3 font-headline font-black text-xs uppercase tracking-widest italic border-b-2 transition-all ${activeTab === 'matches' ? 'border-primary text-primary' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
          >
            Partidos Disputados
          </button>
          <button 
            onClick={() => setActiveTab('roster')}
            className={`px-6 py-3 font-headline font-black text-xs uppercase tracking-widest italic border-b-2 transition-all ${activeTab === 'roster' ? 'border-primary text-primary' : 'border-transparent text-zinc-400 hover:text-zinc-600'}`}
          >
            Roster Atletas
          </button>
        </div>

        {/* Tab Content */}
        <div className="min-h-[300px]">
          {activeTab === 'stats' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-1 space-y-6">
                  {/* Win Rate Centered */}
                  <div className="surface-card p-8 border-none bg-zinc-900 text-white relative overflow-hidden shadow-xl flex flex-col items-center justify-center text-center h-full min-h-[220px]">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <span className="material-symbols-outlined text-6xl italic">trending_up</span>
                    </div>
                    <p className="font-body text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Win Rate Global</p>
                    <h2 className="font-headline text-6xl font-black italic my-4 text-secondary">{localCompetition.stats?.win_rate}</h2>
                    <div className="flex items-center gap-6 mt-2">
                       <div className="text-center">
                         <p className="text-[10px] font-bold uppercase opacity-40">Victorias</p>
                         <p className="font-headline text-2xl font-black italic text-emerald-400">{localCompetition.stats?.wins}</p>
                       </div>
                       <div className="w-px h-10 bg-white/10"></div>
                       <div className="text-center">
                         <p className="text-[10px] font-bold uppercase opacity-40">Derrotas</p>
                         <p className="font-headline text-2xl font-black italic text-rose-400">{localCompetition.stats?.losses}</p>
                       </div>
                    </div>
                  </div>
               </div>
               
               <div className="md:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Efficiency Card */}
                  <div className="surface-card p-6 border border-zinc-100 shadow-sm flex flex-col justify-center">
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-6">Eficiencia de Sets</p>
                    <div className="space-y-6">
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase italic">
                             <span className="text-emerald-600">Sets Ganados</span>
                             <span className="text-emerald-600 font-headline text-sm">{localCompetition.stats?.total_sets_won}</span>
                          </div>
                          <div className="h-3 bg-emerald-50 rounded-full overflow-hidden border border-emerald-100">
                             <div 
                               className="h-full bg-emerald-500 rounded-full shadow-sm" 
                               style={{ width: `${(localCompetition.stats?.total_sets_won / (localCompetition.stats?.total_sets_won + localCompetition.stats?.total_sets_lost) * 100) || 0}%` }}
                             ></div>
                          </div>
                       </div>
                       <div className="space-y-2">
                          <div className="flex justify-between text-[10px] font-black uppercase italic">
                             <span className="text-rose-600">Sets Perdidos</span>
                             <span className="text-rose-600 font-headline text-sm">{localCompetition.stats?.total_sets_lost}</span>
                          </div>
                          <div className="h-3 bg-rose-50 rounded-full overflow-hidden border border-rose-100">
                             <div 
                               className="h-full bg-rose-500 rounded-full shadow-sm" 
                               style={{ width: `${(localCompetition.stats?.total_sets_lost / (localCompetition.stats?.total_sets_won + localCompetition.stats?.total_sets_lost) * 100) || 0}%` }}
                             ></div>
                          </div>
                       </div>
                    </div>
                  </div>

                  {/* MVP Tournament Card */}
                  <div className="surface-card p-6 border border-zinc-100 shadow-sm bg-zinc-50/50 flex flex-col items-center justify-center text-center relative overflow-hidden group">
                    <div className="absolute top-2 right-2 animate-pulse">
                       <span className="material-symbols-outlined text-secondary text-lg fill-1">military_tech</span>
                    </div>
                    <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest mb-4">Atleta más Relevante</p>
                    
                    {localCompetition.stats?.tournament_mvp ? (
                      <div className="space-y-3">
                         <div className="w-20 h-20 rounded-full bg-white p-1 border-2 border-secondary shadow-lg mx-auto overflow-hidden group-hover:scale-110 transition-transform duration-500">
                            {localCompetition.stats.tournament_mvp.photo ? (
                              <img src={localCompetition.stats.tournament_mvp.photo} alt={localCompetition.stats.tournament_mvp.full_name} className="w-full h-full object-cover rounded-full" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-zinc-200">
                                <span className="material-symbols-outlined text-4xl">person</span>
                              </div>
                            )}
                         </div>
                         <div>
                            <h6 className="font-headline font-black text-lg text-primary uppercase italic leading-none">{localCompetition.stats.tournament_mvp.full_name}</h6>
                            <p className="text-[10px] font-black text-secondary uppercase italic mt-1 font-headline tracking-tighter">
                               #{localCompetition.stats.tournament_mvp.jersey_number} • {localCompetition.stats.tournament_mvp.category_name}
                            </p>
                         </div>
                      </div>
                    ) : (
                      <div className="py-4 opacity-30 italic text-xs">Aún no hay datos</div>
                    )}
                  </div>
               </div>
            </div>
          )}

          {activeTab === 'matches' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-headline font-black text-xl text-primary uppercase italic">Resultados Recientes</h3>
                {canEdit && (
                  <button 
                    onClick={() => setIsMatchModalOpen(true)}
                    className="btn-primary py-2 px-4 text-[10px] flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-sm">add</span>
                    Registrar Partido
                  </button>
                )}
              </div>

              {loading ? (
                <Skeleton className="h-20 w-full" count={3} />
              ) : matches.length > 0 ? (
                <div className="grid grid-cols-1 gap-3">
                  {matches.map(match => (
                    <div 
                      key={match.id} 
                      onClick={() => handleMatchClick(match)}
                      className={`surface-card p-4 border border-zinc-50 shadow-sm flex items-center justify-between group transition-all duration-300 w-full text-left ${canEdit ? 'cursor-pointer hover:translate-x-2' : ''}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-headline font-black text-sm italic ${match.result === 'ganado' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                          {match.result === 'ganado' ? 'W' : 'L'}
                        </div>
                        <div>
                          <p className="font-body text-[10px] text-zinc-400 font-bold uppercase tracking-widest">{new Date(match.match_date).toLocaleDateString()} - <span className="text-secondary">{match.phase_display}</span></p>
                          <h6 className="font-headline font-black text-sm text-primary uppercase italic">{match.home_team} vs {match.away_team}</h6>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-4">
                        {match.set_points && match.set_points.length > 0 && (
                          <div className="hidden md:flex gap-1">
                            {match.set_points.map((s, i) => (
                              <span key={i} className="text-[9px] font-black text-zinc-300 bg-zinc-50 px-1 rounded">{s.home}-{s.away}</span>
                            ))}
                          </div>
                        )}
                        <div>
                          <p className="font-headline font-black text-2xl text-primary italic leading-none">{match.score}</p>
                          <p className="font-body text-[9px] text-zinc-300 font-bold uppercase tracking-widest mt-1">{match.venue}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200 mt-4">
                  <p className="font-body text-[10px] text-zinc-400 uppercase tracking-widest font-black italic">Aún no hay partidos registrados</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'roster' && (
            <div className="space-y-4">
              {canEdit && (
                <div className="flex justify-end">
                  <button 
                    onClick={() => setIsRosterModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary text-white font-headline font-black text-[10px] uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-sm italic"
                  >
                    <span className="material-symbols-outlined text-sm">edit_note</span>
                    Gestionar Roster
                  </button>
                </div>
              )}

              {localCompetition.roster_data && localCompetition.roster_data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {localCompetition.roster_data.map(athlete => {
                    const isCaptain = localCompetition.captain === athlete.id;
                    return (
                      <div key={athlete.id} className={`surface-card p-4 border border-zinc-100 shadow-sm flex items-center gap-4 relative overflow-hidden ${isCaptain ? 'ring-2 ring-secondary/50' : ''}`}>
                        {isCaptain && (
                          <div className="absolute top-0 right-0 bg-secondary px-2 py-1 rounded-bl-xl shadow-sm z-10 animate-bounce">
                            <span className="material-symbols-outlined text-xs text-primary fill-1">stars</span>
                          </div>
                        )}
                        
                        <div className="w-12 h-12 rounded-xl bg-zinc-100 overflow-hidden border border-zinc-200">
                          {athlete.photo ? (
                            <img src={athlete.photo} alt={athlete.full_name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-300">
                              <span className="material-symbols-outlined">person</span>
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <p className="font-headline font-black text-sm text-primary uppercase italic leading-none">{athlete.full_name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-headline font-bold text-[10px] text-secondary italic uppercase tracking-tighter">#{athlete.jersey_number || '--'}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
                            <span className="font-body text-[9px] text-zinc-400 font-bold uppercase tracking-widest leading-none">{isCaptain ? 'Capitán' : 'Jugador'}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 bg-zinc-50 rounded-3xl border border-dashed border-zinc-200 mt-4">
                  <p className="font-body text-[10px] text-zinc-400 uppercase tracking-widest font-black italic">No hay atletas asignados a este torneo</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Internal Modal for Match Result registration (Add Match) */}
      <Modal 
        isOpen={isMatchModalOpen} 
        onClose={() => setIsMatchModalOpen(false)}
        title="Registrar Resultado de Partido"
        className="z-[60]"
      >
        <MatchForm 
          competitionId={localCompetition.id}
          roster={localCompetition.roster_data}
          onSubmit={handleAddMatch}
          onCancel={() => setIsMatchModalOpen(false)}
        />
      </Modal>

      {/* Modal for SET BY SET Points (Edit Match Scores) */}
      <Modal
        isOpen={isScoreModalOpen}
        onClose={() => setIsScoreModalOpen(false)}
        title="Puntuación Detallada por Set"
        className="z-[60]"
      >
        {selectedMatch && (
          <SetPointsForm 
            match={selectedMatch}
            onSubmit={handleUpdateSetPoints}
            onCancel={() => setIsScoreModalOpen(false)}
          />
        )}
      </Modal>

      {/* Modal for ROSTER Management */}
      <Modal
        isOpen={isRosterModalOpen}
        onClose={() => setIsRosterModalOpen(false)}
        title="Gestionar Roster del Equipo"
        className="z-[60]"
      >
        {localCompetition && (
          <RosterManager 
            competition={localCompetition}
            onSave={handleUpdateRoster}
            onCancel={() => setIsRosterModalOpen(false)}
          />
        )}
      </Modal>
    </Modal>
  );
};

export default CompetitionDetailsModal;
