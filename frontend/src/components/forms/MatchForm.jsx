import React, { useState } from 'react';

const MatchForm = ({ competitionId, roster = [], onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    competition: competitionId,
    home_team: 'Warriors Voley Club',
    away_team: '',
    match_date: new Date().toISOString().slice(0, 16),
    venue: '',
    home_score: 0,
    away_score: 0,
    status: 'finalizado',
    result: 'ganado',
    phase: 'fase_grupos',
    mvp: '',
    notes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-body">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Equipo Local</label>
          <input
            name="home_team"
            value={formData.home_team}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Equipo Visitante</label>
          <input
            name="away_team"
            value={formData.away_team}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            placeholder="Oponente"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 items-center bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
        <div className="flex flex-col items-center gap-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">Sets Local</label>
          <input
            name="home_score"
            type="number"
            min="0"
            max="5"
            value={formData.home_score}
            onChange={handleChange}
            className="w-20 text-center font-headline font-black text-4xl bg-transparent border-none focus:ring-0 text-primary italic"
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 italic">Sets Visitante</label>
          <input
            name="away_score"
            type="number"
            min="0"
            max="5"
            value={formData.away_score}
            onChange={handleChange}
            className="w-20 text-center font-headline font-black text-4xl bg-transparent border-none focus:ring-0 text-primary italic"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Resultado Final</label>
          <select
            name="result"
            value={formData.result}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic text-emerald-600"
          >
            <option value="ganado">Ganado</option>
            <option value="perdido">Perdido</option>
            <option value="empate">Empate</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Fase</label>
          <select
            name="phase"
            value={formData.phase}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
          >
            <option value="fase_grupos">Fase de grupos</option>
            <option value="octavos">Octavos de final</option>
            <option value="cuartos">Cuartos de final</option>
            <option value="semifinal">Semi Final</option>
            <option value="final">Final</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Fecha y Hora</label>
          <input
            name="match_date"
            type="datetime-local"
            value={formData.match_date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Sede del Partido</label>
          <input
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            placeholder="Sede / Cancha"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Atleta Relevante (MVP)</label>
          <select
            name="mvp"
            value={formData.mvp}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic text-primary"
          >
            <option value="">Seleccionar Atleta...</option>
            {roster && roster.map(athlete => (
              <option key={athlete.id} value={athlete.id}>
                #{athlete.jersey_number} - {athlete.full_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 px-6 py-4 border border-outline-variant rounded-xl font-headline font-black uppercase text-xs hover:bg-zinc-50 transition-colors italic tracking-widest"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          className="flex-1 bg-secondary text-primary px-6 py-4 rounded-xl font-headline font-black uppercase text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg italic tracking-widest"
        >
          Guardar Resultado
        </button>
      </div>
    </form>
  );
};

export default MatchForm;
