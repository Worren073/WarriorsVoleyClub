import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/ui/Modal';
import ScheduleForm from '../../components/forms/ScheduleForm';
import Swal from 'sweetalert2';
import { useAuth } from '../../context/AuthContext';

const SchedulesView = () => {
  const { user } = useAuth();
  const [weekly, setWeekly] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await api.get('/schedules/weekly/');
      setWeekly(response.data);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSave = async (formData) => {
    try {
      await api.post('/schedules/', formData);
      Swal.fire({
        icon: 'success',
        title: 'Horario Asignado',
        text: 'La sesión se ha programado correctamente.',
        timer: 2000,
        showConfirmButton: false
      });
      setIsModalOpen(false);
      fetchSchedules();
    } catch (error) {
      const errorMsg = error.response?.data?.non_field_errors?.[0] || 
                       error.response?.data?.detail ||
                       "No se pudo guardar el horario. Verifica si hay choques.";
      
      Swal.fire({
        icon: 'error',
        title: 'Error de Validación',
        text: errorMsg,
      });
    }
  };

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const canManageSchedules = user?.role === 'administrador' || user?.role === 'staff';

  return (
    <DashboardLayout title="Horarios de Entrenamiento">
      <div className="space-y-8">
        {/* Actions Bar */}
        {canManageSchedules && (
          <div className="flex justify-end items-center bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="btn-primary flex items-center gap-2"
            >
              <span className="material-symbols-outlined">add_task</span>
              Asignar Nuevo Horario
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 animate-in slide-in-from-bottom duration-500">
        {days.map((day) => (
          <div key={day} className="flex flex-col space-y-4">
            <div className="bg-primary text-white p-4 rounded-xl shadow-lg flex items-center justify-between border-b border-white/10">
               <span className="font-headline font-black text-xs uppercase tracking-widest italic">{day}</span>
               <span className="material-symbols-outlined text-xs text-secondary-fixed">calendar_today</span>
            </div>
            
            <div className="space-y-4">
              {weekly[day] && weekly[day].length > 0 ? (
                weekly[day].map((item) => (
                  <div key={item.id} className="surface-card p-5 border-none shadow-sm hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden group">
                     <div className="absolute top-0 left-0 w-full h-1 bg-secondary"></div>
                     <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                           <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${item.session_type === 'entrenamiento' ? 'bg-zinc-50 border-zinc-100 text-zinc-500' : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}>
                             {item.type_display}
                           </span>
                           <span className="font-body text-[10px] text-zinc-400 font-bold">{item.start_time.substring(0, 5)} - {item.end_time.substring(0, 5)}</span>
                        </div>
                        <h5 className="font-headline font-black text-sm text-primary uppercase italic leading-tight mt-1">{item.title}</h5>
                        <div className="flex items-center gap-2 mt-2">
                           <span className="material-symbols-outlined text-[12px] text-zinc-400">stadium</span>
                           <span className="font-body text-[10px] text-zinc-500 font-bold uppercase tracking-wider">{item.court_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <span className="material-symbols-outlined text-[12px] text-zinc-400">person</span>
                           <span className="font-body text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Coach {item.coach_name || 'TBD'}</span>
                        </div>
                        <p className="font-headline font-bold text-[9px] text-secondary mt-1">{item.category_name}</p>
                     </div>
                  </div>
                ))
              ) : (
                <div className="border-2 border-dashed border-zinc-100 rounded-xl p-8 flex flex-col items-center justify-center text-center">
                  <span className="material-symbols-outlined text-zinc-100 text-3xl mb-2">event_busy</span>
                  <span className="font-body text-[10px] text-zinc-300 uppercase tracking-widest font-black italic">Sin actividad</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Asignar Nuevo Horario"
      >
        <ScheduleForm 
          onSubmit={handleSave} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </DashboardLayout>
  );
};

export default SchedulesView;
