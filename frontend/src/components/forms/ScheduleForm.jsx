import React, { useState, useEffect } from 'react';
import api from '../../api/axios';

const ScheduleForm = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    day_of_week: 1,
    start_time: '08:00',
    end_time: '10:00',
    court: '',
    coach: '',
    session_type: 'entrenamiento',
    description: '',
  });

  const [categories, setCategories] = useState([]);
  const [courts, setCourts] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catsRes, courtsRes, coachesRes] = await Promise.all([
          api.get('/athletes/categories/'),
          api.get('/schedules/courts/'),
          api.get('/auth/users/?role=entrenador')
        ]);
        setCategories(catsRes.data.results || catsRes.data);
        setCourts(courtsRes.data.results || courtsRes.data);
        setCoaches(coachesRes.data.results || coachesRes.data);
      } catch (error) {
        console.error('Error fetching form data:', error);
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

  const dayOptions = [
    { value: 1, label: 'Lunes' },
    { value: 2, label: 'Martes' },
    { value: 3, label: 'Miércoles' },
    { value: 4, label: 'Jueves' },
    { value: 5, label: 'Viernes' },
    { value: 6, label: 'Sábado' },
    { value: 7, label: 'Domingo' },
  ];

  if (loading) return <div className="p-8 text-center animate-pulse font-body italic text-zinc-400">Cargando opciones...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-body">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Título de la Sesión</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            placeholder="Ej: Entrenamiento Refuerzo"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
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
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Día</label>
            <select
              name="day_of_week"
              value={formData.day_of_week}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            >
              {dayOptions.map(day => (
                <option key={day.value} value={day.value}>{day.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Hora Inicio</label>
            <input
              name="start_time"
              type="time"
              value={formData.start_time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Hora Fin</label>
            <input
              name="end_time"
              type="time"
              value={formData.end_time}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Cancha</label>
            <select
              name="court"
              value={formData.court}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            >
              <option value="">Seleccionar...</option>
              {courts.map(court => (
                <option key={court.id} value={court.id}>{court.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Entrenador</label>
            <select
              name="coach"
              value={formData.coach}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            >
              <option value="">Seleccionar...</option>
              {coaches.map(coach => (
                <option key={coach.id} value={coach.id}>{coach.first_name} {coach.last_name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Tipo de Sesión</label>
          <select
            name="session_type"
            value={formData.session_type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
          >
            <option value="entrenamiento">Entrenamiento</option>
            <option value="cancha_abierta">Cancha Abierta</option>
            <option value="competicion">Competición</option>
            <option value="evaluacion">Evaluación</option>
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
          className="flex-1 bg-primary text-white px-6 py-4 rounded-xl font-headline font-black uppercase text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg italic tracking-widest"
        >
          Guardar Horario
        </button>
      </div>
    </form>
  );
};

export default ScheduleForm;
