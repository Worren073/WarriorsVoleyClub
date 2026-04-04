import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const CompetitionForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    competition_type: 'liga',
    category: '',
    coach_in_charge: '',
    assistant: '',
    start_date: new Date().toISOString().split('T')[0],
    location: '',
    description: '',
  });

  const [categories, setCategories] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, usersRes] = await Promise.all([
          api.get('/athletes/categories/'),
          api.get('/auth/users/')
        ]);
        setCategories(catsRes.data.results || catsRes.data);
        setCoaches(usersRes.data.results || usersRes.data);
      } catch (error) {
        console.error('Error fetching competition form data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const compTypes = [
    { value: 'estadal', label: 'Estadal' },
    { value: 'liga', label: 'Liga' },
    { value: 'copa', label: 'Copa' },
    { value: 'viaje', label: 'Viaje' },
    { value: 'zonal', label: 'Zonal' },
    { value: 'nacional', label: 'Nacional' },
    { value: 'internacional', label: 'Internacional' },
  ];

  if (loading) return <div className="p-8 text-center animate-pulse font-body italic text-zinc-400">Cargando opciones...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-body">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Nombre de la Competición</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            placeholder="Ej: Torneo Apertura 2024"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Tipo de Competición</label>
            <select
              name="competition_type"
              value={formData.competition_type}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            >
              {compTypes.map(type => (
                <option key={type.value} value={type.value}>{type.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Categoría</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            >
              <option value="">Seleccionar...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Fecha Inicio</label>
            <input
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Sede / Ubicación</label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Ej: Gimnasio Bertha Carrero"
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Entrenador Encargado</label>
            <select
              name="coach_in_charge"
              value={formData.coach_in_charge}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            >
              <option value="">Seleccionar...</option>
              {coaches.map(user => (
                <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Asistente (Opcional)</label>
            <select
              name="assistant"
              value={formData.assistant}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            >
              <option value="">Ninguno</option>
              {coaches.map(user => (
                <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Descripción / Notas</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic resize-none"
            placeholder="Detalles adicionales del torneo..."
          />
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
          className="flex-1 bg-primary text-white px-6 py-4 rounded-xl font-headline font-black uppercase text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg italic tracking-widest"
        >
          Crear Competición
        </button>
      </div>
    </form>
  );
};

export default CompetitionForm;
