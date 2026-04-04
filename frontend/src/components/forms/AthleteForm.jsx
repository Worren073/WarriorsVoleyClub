import React, { useState, useEffect } from 'react';

const AthleteForm = ({ athlete, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    category: '',
    status: 'inscrito',
    jersey_number: '',
    gender: 'masculino',
    date_joined: new Date().toISOString().split('T')[0],
    date_of_birth: '2010-01-01',
    performance: 0,
    phone: '',
    email: '',
    emergency_contact: '',
    emergency_phone: '',
    notes: '',
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (athlete) {
      setFormData({
        first_name: athlete.first_name || '',
        last_name: athlete.last_name || '',
        category: athlete.category || '',
        status: athlete.status || 'inscrito',
        jersey_number: athlete.jersey_number || '',
        gender: athlete.gender || 'masculino',
        date_joined: athlete.date_joined || new Date().toISOString().split('T')[0],
        date_of_birth: athlete.date_of_birth || '2010-01-01',
        performance: athlete.performance || 0,
        phone: athlete.phone || '',
        email: athlete.email || '',
        emergency_contact: athlete.emergency_contact || '',
        emergency_phone: athlete.emergency_phone || '',
        notes: athlete.notes || '',
      });
      if (athlete.photo) {
        setPhotoPreview(athlete.photo);
      }
    }
  }, [athlete]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Preparamos los datos incluyendo el archivo
    const data = { ...formData };
    if (photoFile) {
      data.photo = photoFile;
    }
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-body">
      {/* Photo Section */}
      <div className="flex flex-col items-center gap-4 pb-4">
        <div className="relative group">
          <div className="w-32 h-40 bg-zinc-100 rounded-xl border-2 border-dashed border-zinc-200 overflow-hidden flex items-center justify-center relative">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="text-center p-4">
                <span className="material-symbols-outlined text-4xl text-zinc-300">add_a_photo</span>
                <p className="text-[10px] text-zinc-400 mt-2 uppercase font-black tracking-widest italic">Foto Carnet</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center shadow-lg pointer-events-none group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-sm font-bold">edit</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Nombre</label>
          <input
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
            placeholder="Ej: Juan"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Apellido</label>
          <input
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
            placeholder="Ej: Pérez"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Categoría</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
          >
            <option value="">Seleccionar...</option>
            <option value="1">U12 Academia</option>
            <option value="2">U14 Novato</option>
            <option value="3">U16 Competición</option>
            <option value="4">U18 Élite</option>
            <option value="5">U20 Élite</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Número de Dorsal</label>
          <input
            name="jersey_number"
            type="number"
            min="1"
            max="99"
            value={formData.jersey_number}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
            placeholder="Ej: 10"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Estado</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
          >
            <option value="inscrito">INSCRITO</option>
            <option value="periodo_prueba">PERIODO DE PRUEBA</option>
            <option value="suspendido">SUSPENDIDO</option>
            <option value="retirado">RETIRADO</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Género</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
          >
            <option value="masculino">MASCULINO</option>
            <option value="femenino">FEMENINO</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Fecha de Ingreso</label>
          <input
            name="date_joined"
            type="date"
            value={formData.date_joined}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Fecha de Nacimiento</label>
          <input
            name="date_of_birth"
            type="date"
            value={formData.date_of_birth}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all"
          />
        </div>
      </div>

      <div className="flex gap-4 pt-6">
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
          {athlete ? 'Guardar Cambios' : 'Registrar Atleta'}
        </button>
      </div>
    </form>
  );
};

export default AthleteForm;
