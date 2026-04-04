import React, { useState } from 'react';

const SetPointsForm = ({ match, onSubmit, onCancel }) => {
  // Inicializar con 5 sets por defecto o los que ya tenga el partido
  const [sets, setSets] = useState(() => {
    if (match.set_points && match.set_points.length > 0) {
      return match.set_points;
    }
    return [
      { home: '', away: '' },
      { home: '', away: '' },
      { home: '', away: '' },
      { home: '', away: '' },
      { home: '', away: '' }
    ];
  });

  const handleSetChange = (index, team, value) => {
    const newSets = [...sets];
    newSets[index][team] = value;
    setSets(newSets);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Limpiar sets vacíos antes de enviar
    const filteredSets = sets.filter(s => s.home !== '' || s.away !== '');
    onSubmit(filteredSets);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-body">
      <div className="bg-zinc-50 p-6 rounded-3xl border border-zinc-100 italic">
        <div className="grid grid-cols-12 gap-4 mb-4 border-b border-zinc-200 pb-2">
          <div className="col-span-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">Set</div>
          <div className="col-span-5 text-[10px] font-black uppercase tracking-widest text-primary truncate">{match.home_team}</div>
          <div className="col-span-5 text-[10px] font-black uppercase tracking-widest text-primary truncate">{match.away_team}</div>
        </div>

        {sets.map((set, index) => (
          <div key={index} className="grid grid-cols-12 gap-4 items-center mb-3">
            <div className="col-span-2 font-headline font-black text-xl text-zinc-300">#{(index + 1)}</div>
            <div className="col-span-5">
              <input
                type="number"
                min="0"
                value={set.home}
                onChange={(e) => handleSetChange(index, 'home', e.target.value)}
                className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-center font-headline font-black text-xl text-primary italic"
                placeholder="0"
              />
            </div>
            <div className="col-span-5">
              <input
                type="number"
                min="0"
                value={set.away}
                onChange={(e) => handleSetChange(index, 'away', e.target.value)}
                className="w-full px-4 py-2 bg-white border border-zinc-200 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-center font-headline font-black text-xl text-primary italic"
                placeholder="0"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 px-6 py-4 border border-outline-variant rounded-xl font-headline font-black uppercase text-xs hover:bg-zinc-50 transition-colors italic tracking-widest"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          className="flex-1 bg-primary text-white px-6 py-4 rounded-xl font-headline font-black uppercase text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg italic tracking-widest"
        >
          Actualizar Puntos
        </button>
      </div>
    </form>
  );
};

export default SetPointsForm;
