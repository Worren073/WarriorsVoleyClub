import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/ui/Modal';
import AthleteForm from '../../components/forms/AthleteForm';
import { TableSkeleton } from '../../components/ui/Skeleton';
import Swal from 'sweetalert2';

const AthleteList = () => {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // CRUD State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAthlete, setSelectedAthlete] = useState(null);

  const fetchAthletes = async () => {
    setLoading(true);
    try {
      const response = await api.get('/athletes/', {
        params: {
          search: search,
          category: categoryFilter,
          status: statusFilter,
        },
      });
      setAthletes(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching athletes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAthletes();
  }, [search, categoryFilter, statusFilter]);

  const handleSave = async (data) => {
    try {
      const formData = new FormData();
      // Mapear todos los campos al FormData
      Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
          formData.append(key, data[key]);
        }
      });

      if (selectedAthlete) {
        await api.put(`/athletes/${selectedAthlete.id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        Swal.fire({ icon: 'success', title: 'Atleta Actualizado', timer: 1500, showConfirmButton: false });
      } else {
        await api.post('/athletes/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        Swal.fire({ icon: 'success', title: 'Atleta Registrado', timer: 1500, showConfirmButton: false });
      }
      setIsModalOpen(false);
      fetchAthletes();
    } catch (error) {
      console.error('Error saving athlete:', error);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ba1a1a',
      cancelButtonColor: '#000000',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#f8f9fa',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/athletes/${id}/`);
        Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1500, showConfirmButton: false });
        fetchAthletes();
      } catch (error) {
        // Handled globally
      }
    }
  };

  const openAddModal = () => {
    setSelectedAthlete(null);
    setIsModalOpen(true);
  };

  const openEditModal = (athlete) => {
    setSelectedAthlete(athlete);
    setIsModalOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'inscrito': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'periodo_prueba': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'suspendido': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-zinc-50 text-zinc-600 border-zinc-100';
    }
  };

  return (
    <DashboardLayout title="Gestión de Atletas">
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full lg:w-80">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">search</span>
              <input
                type="text"
                placeholder="Buscar por nombre o ID..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all font-body text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select
              className="w-full lg:w-48 px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all font-body text-sm"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Todas las Categorías</option>
              <option value="1">U12</option>
              <option value="2">U14 Novato</option>
              <option value="3">U16 Competición</option>
              <option value="5">U20 Élite</option>
            </select>
          </div>
          <button
            onClick={openAddModal}
            className="btn-primary flex items-center gap-2"
          >
            <span className="material-symbols-outlined">person_add</span>
            Nuevo Atleta
          </button>
        </div>

        <div className="surface-card border-none shadow-sm overflow-hidden p-0">
          {loading ? (
            <div className="p-8">
              <TableSkeleton />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-8 py-4 text-left font-headline text-xs font-black text-zinc-500 uppercase tracking-widest italic">ID</th>
                    <th className="px-8 py-4 text-left font-headline text-xs font-black text-zinc-500 uppercase tracking-widest italic text-center">#</th>
                    <th className="px-8 py-4 text-left font-headline text-xs font-black text-zinc-500 uppercase tracking-widest italic">Atleta</th>
                    <th className="px-8 py-4 text-left font-headline text-xs font-black text-zinc-500 uppercase tracking-widest italic">Categoría</th>
                    <th className="px-8 py-4 text-left font-headline text-xs font-black text-zinc-500 uppercase tracking-widest italic">Estado</th>
                    <th className="px-8 py-4 text-right font-headline text-xs font-black text-zinc-500 uppercase tracking-widest italic">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {athletes.map((athlete) => (
                    <tr key={athlete.id} className="hover:bg-zinc-50/50 transition-colors group">
                      <td className="px-8 py-4 font-body text-sm font-bold text-zinc-500 italic">{athlete.athlete_id}</td>
                      <td className="px-8 py-4 text-center">
                        {athlete.jersey_number ? (
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-headline font-black text-sm border-2 ${athlete.gender === 'femenino'
                            ? 'bg-rose-100 text-rose-500 border-rose-300/50 shadow-[0_0_10px_rgba(237, 67, 104, 0.91)]'
                            : 'bg-blue-100 text-blue-500 border-blue-300/50 shadow-[0_0_10px_rgba(14, 84, 236, 0.55)]'
                            }`}>
                            {athlete.jersey_number}
                          </span>
                        ) : (
                          <span className="text-zinc-300 italic text-xs">--</span>
                        )}
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center overflow-hidden">
                            {athlete.photo ? (
                              <img src={athlete.photo} alt={athlete.full_name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="material-symbols-outlined text-zinc-400">person</span>
                            )}
                          </div>
                          <div>
                            <p className="font-headline font-bold text-primary text-sm group-hover:text-secondary transition-colors underline decoration-transparent group-hover:decoration-secondary decoration-2 underline-offset-4">{athlete.full_name}</p>
                            <p className="font-body text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Fecha ingreso: {athlete.date_joined}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4 font-headline font-bold text-xs uppercase tracking-wider text-zinc-600 italic">{athlete.category_name}</td>
                      <td className="px-8 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusColor(athlete.status)}`}>
                          {athlete.status_display}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(athlete)}
                            className="material-symbols-outlined text-zinc-400 hover:text-secondary p-2 transition-colors"
                          >edit</button>
                          <button
                            onClick={() => handleDelete(athlete.id)}
                            className="material-symbols-outlined text-zinc-400 hover:text-error p-2 transition-colors"
                          >delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedAthlete ? 'Editar Atleta' : 'Nuevo Atleta'}
      >
        <AthleteForm
          athlete={selectedAthlete}
          onSubmit={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default AthleteList;
