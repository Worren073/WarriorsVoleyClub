import React, { useState, useEffect } from 'react';

const AthleteForm = ({ athlete, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    athlete_id: '',
    first_name: '',
    last_name: '',
    category: '',
    status: 'inscrito',
    date_joined: new Date().toISOString().split('T')[0],
    date_of_birth: '2010-01-01',
    performance: 0,
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (athlete) {
      setFormData({
        ...athlete,
        category: athlete.category || '',
      });
    }
  }, [athlete]);

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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">ID Atleta (GVC-XXXX)</label>
          <input
            name="athlete_id"
            value={formData.athlete_id}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Categoría</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
          >
            <option value="">Seleccionar...</option>
            <option value="1">U12</option>
            <option value="2">U14 Novato</option>
            <option value="3">U16 Competición</option>
            <option value="5">U20 Élite</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Nombre</label>
          <input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Apellido</label>
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Estado</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
          >
            <option value="inscrito">Inscrito</option>
            <option value="periodo_prueba">Pueblo de Prueba</option>
            <option value="suspendido">Suspendido</option>
            <option value="retirado">Retirado</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Rendimiento (%)</label>
          <input
            name="performance"
            type="number"
            min="0"
            max="100"
            value={formData.performance}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Fecha de Ingreso</label>
          <input
            name="date_joined"
            type="date"
            value={formData.date_joined}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Nacimiento</label>
          <input
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-6">
        <button 
          type="button" 
          onClick={onCancel}
          className="flex-1 px-6 py-4 border border-outline-variant rounded-xl font-headline font-black uppercase text-xs hover:bg-zinc-50 transition-colors"
        >
          Cancelar
        </button>
        <button 
          type="submit"
          className="flex-1 bg-primary text-white px-6 py-4 rounded-xl font-headline font-black uppercase text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
        >
          {athlete ? 'Guardar Cambios' : 'Registrar Atleta'}
        </button>
      </div>
    </form>
  );
};

export default AthleteForm;
