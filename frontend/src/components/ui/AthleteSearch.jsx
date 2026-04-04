import React, { useState, useEffect, useRef } from 'react';

const AthleteSearch = ({ athletes, onSelect, selectedAthleteId }) => {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedAthlete = athletes.find(a => a.id === selectedAthleteId);

  useEffect(() => {
    if (selectedAthlete) {
      setSearch(`${selectedAthlete.full_name} (${selectedAthlete.athlete_id})`);
    } else {
      setSearch('');
    }
  }, [selectedAthleteId, athletes]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredAthletes = athletes.filter(a =>
    a.full_name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (athlete) => {
    onSelect(athlete.id);
    setSearch(`${athlete.full_name} (${athlete.athlete_id})`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">search</span>
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Escriba el nombre del atleta..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-body text-sm"
        />
      </div>

      {isOpen && search && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-zinc-100 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          {filteredAthletes.length > 0 ? (
            filteredAthletes.map(athlete => (
              <button
                key={athlete.id}
                type="button"
                onClick={() => handleSelect(athlete)}
                className="w-full px-4 py-3 text-left hover:bg-zinc-50 flex items-center justify-between transition-colors group"
              >
                <div>
                  <p className="font-headline font-bold text-primary group-hover:text-secondary transition-colors italic">{athlete.full_name}</p>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-black">{athlete.athlete_id}</p>
                </div>
                <span className="material-symbols-outlined text-zinc-300 group-hover:text-secondary opacity-0 group-hover:opacity-100 transition-all">add_circle</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-6 text-center">
              <span className="material-symbols-outlined text-zinc-300 text-3xl">person_search</span>
              <p className="text-xs text-zinc-400 mt-2 font-body italic">No se encontraron atletas</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AthleteSearch;
