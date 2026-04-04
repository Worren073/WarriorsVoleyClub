import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import Swal from 'sweetalert2';

const RosterManager = ({ competition, onSave, onCancel }) => {
  const [availableAthletes, setAvailableAthletes] = useState([]);
  const [selectedIds, setSelectedIds] = useState(competition.roster || []);
  const [captainId, setCaptainId] = useState(competition.captain || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        // Filtrar atletas por la categoría de la competición
        const response = await api.get(`/athletes/?category=${competition.category}`);
        setAvailableAthletes(response.data.results || response.data);
      } catch (error) {
        console.error('Error fetching athletes for roster:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAthletes();
  }, [competition.category]);

  const toggleAthlete = (id) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    // Si quitamos al capitán, resetear el id del capitán
    if (id === captainId && selectedIds.includes(id)) {
      setCaptainId('');
    }
  };

  const handleSave = () => {
    onSave({
      roster: selectedIds,
      captain: captainId || null
    });
  };

  if (loading) return <div className="p-8 text-center italic text-zinc-400">Cargando atletas disponibles...</div>;

  return (
    <div className="space-y-6 font-body">
      <div className="bg-zinc-50 p-4 rounded-2xl border border-zinc-100 flex items-center justify-between">
        <div>
          <h4 className="font-headline font-black text-sm text-primary uppercase italic">Armar Equipo</h4>
          <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Categoría: {competition.category_name}</p>
        </div>
        <div className="text-right">
          <span className="font-headline font-black text-2xl text-secondary italic">{selectedIds.length}</span>
          <span className="text-[10px] text-zinc-400 font-black uppercase ml-1 italic">Atletas</span>
        </div>
      </div>

      <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
        {availableAthletes.length > 0 ? availableAthletes.map(athlete => {
          const isSelected = selectedIds.includes(athlete.id);
          const isCaptain = captainId === athlete.id;

          return (
            <div 
              key={athlete.id}
              className={`flex items-center justify-between p-3 rounded-xl border transition-all ${isSelected ? 'bg-white border-primary/20 shadow-sm' : 'bg-transparent border-zinc-100 opacity-60 hover:opacity-100'}`}
            >
              <div className="flex items-center gap-3">
                <div 
                  onClick={() => toggleAthlete(athlete.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-all ${isSelected ? 'bg-primary border-primary' : 'border-zinc-200'}`}
                >
                  {isSelected && <span className="material-symbols-outlined text-white text-sm">check</span>}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-zinc-100 overflow-hidden border border-zinc-200">
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
                    <p className="font-body text-[10px] text-zinc-400 font-bold uppercase mt-1 italic">#{athlete.jersey_number || '--'} • {athlete.athlete_id}</p>
                  </div>
                </div>
              </div>

              {isSelected && (
                <button
                  onClick={() => setCaptainId(isCaptain ? '' : athlete.id)}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full border transition-all ${isCaptain ? 'bg-secondary/10 border-secondary text-primary' : 'border-zinc-200 text-zinc-400 hover:border-secondary/50'}`}
                >
                  <span className={`material-symbols-outlined text-sm ${isCaptain ? 'fill-1' : ''}`}>
                    {isCaptain ? 'stars' : 'star'}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-widest italic">{isCaptain ? 'Capitán' : 'Ser Capitán'}</span>
                </button>
              )}
            </div>
          );
        }) : (
          <div className="text-center py-8">
            <p className="text-xs text-zinc-400 italic">No hay atletas registrados en esta categoría.</p>
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4 border-t border-zinc-100">
        <button 
          onClick={onCancel}
          className="flex-1 px-6 py-4 border border-outline-variant rounded-xl font-headline font-black uppercase text-xs hover:bg-zinc-50 transition-colors italic tracking-widest"
        >
          Cancelar
        </button>
        <button 
          onClick={handleSave}
          disabled={selectedIds.length === 0}
          className="flex-1 bg-primary text-white px-6 py-4 rounded-xl font-headline font-black uppercase text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg italic tracking-widest disabled:opacity-50 disabled:scale-100"
        >
          Guardar Roster
        </button>
      </div>
    </div>
  );
};

export default RosterManager;
