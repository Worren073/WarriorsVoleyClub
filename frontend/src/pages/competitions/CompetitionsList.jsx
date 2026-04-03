import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';

const CompetitionsList = () => {
  const [competitions, setCompetitions] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [compRes, matchRes] = await Promise.all([
          api.get('/competitions/'),
          api.get('/competitions/matches/')
        ]);
        // Handle paginated responses
        setCompetitions(compRes.data.results || compRes.data);
        setMatches(matchRes.data.results || matchRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout title="Competiciones & Torneos">
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
                      <button className="text-secondary font-headline font-black text-xs uppercase tracking-widest hover:translate-x-2 transition-transform italic underline decoration-secondary">Ver Dashboard Torneo</button>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Next Matches */}
        <div className="lg:col-span-4 space-y-8">
          <div className="flex items-center justify-between">
             <h2 className="font-headline text-2xl font-black text-primary uppercase italic tracking-tight">Próximos Partidos</h2>
             <span className="material-symbols-outlined text-zinc-400">schedule</span>
          </div>

          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="surface-card p-6 border-none shadow-sm relative overflow-hidden flex flex-col items-center gap-4">
                 <div className="absolute top-0 right-0 p-2 opacity-10">
                   <span className="material-symbols-outlined text-4xl">stadium</span>
                 </div>
                 
                 <div className="flex flex-col items-center justify-center text-center">
                    <p className="font-body text-[10px] text-zinc-400 font-black uppercase tracking-[0.2em] mb-2">{match.competition_name}</p>
                    <p className="font-headline font-black text-xs text-secondary-fixed-dim uppercase tracking-widest italic">{match.phase_display}</p>
                 </div>
                 
                 <div className="flex items-center justify-between w-full h-24">
                   <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center font-headline font-black text-xl text-primary border border-zinc-100 italic">{match.home_team.charAt(0)}</div>
                      <span className="font-headline font-bold text-[10px] text-primary uppercase italic tracking-tighter truncate w-24 text-center">{match.home_team}</span>
                   </div>
                   
                   <div className="flex flex-col items-center">
                      {match.status === 'programado' ? (
                        <div className="bg-primary px-3 py-1 font-headline font-black text-xs text-white uppercase italic tracking-widest">VS</div>
                      ) : (
                        <div className="font-headline font-black text-2xl text-primary italic">{match.score}</div>
                      )}
                      <span className="font-body text-[9px] text-zinc-400 font-bold uppercase mt-2 tracking-widest">{match.match_date.substring(11, 16)} HRS</span>
                   </div>
                   
                   <div className="flex flex-col items-center gap-2 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center font-headline font-black text-xl text-primary border border-zinc-100 italic">{match.away_team.charAt(0)}</div>
                      <span className="font-headline font-bold text-[10px] text-primary uppercase italic tracking-tighter truncate w-24 text-center">{match.away_team}</span>
                   </div>
                 </div>
                 
                 <div className="w-full h-px bg-zinc-50"></div>
                 <p className="font-body text-[9px] text-zinc-400 font-bold uppercase tracking-widest text-center italic leading-none">{match.venue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompetitionsList;
