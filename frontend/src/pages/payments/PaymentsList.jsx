import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/ui/Modal';
import PaymentForm from '../../components/forms/PaymentForm';
import Skeleton from '../../components/ui/Skeleton';
import Swal from 'sweetalert2';

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const response = await api.get('/payments/', {
        params: { status: statusFilter }
      });
      setPayments(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAthletes = async () => {
    try {
      const response = await api.get('/athletes/');
      setAthletes(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching athletes:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchAthletes();
  }, [statusFilter]);

  const handleSave = async (formData) => {
    try {
      await api.post('/payments/', formData);
      Swal.fire({ icon: 'success', title: 'Pago Registrado', timer: 1500, showConfirmButton: false });
      setIsModalOpen(false);
      fetchPayments();
    } catch (error) {
      // Handled globally
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'pagado': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'pendiente': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'atrasado': return 'bg-rose-50 text-rose-600 border-rose-100';
      default: return 'bg-zinc-50 text-zinc-600 border-zinc-100';
    }
  };

  return (
    <DashboardLayout title="Control de Pagos">
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-zinc-400">filter_list</span>
            <select
              className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 font-body text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos los Estados</option>
              <option value="pagado">Pagado</option>
              <option value="pendiente">Pendiente</option>
              <option value="atrasado">Atrasado</option>
            </select>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add_card</span>
            Registrar Pago
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <Skeleton className="h-24 w-full" count={4} />
          ) : (
            payments.map((payment) => (
              <div key={payment.id} className="surface-card p-6 border-none shadow-sm flex flex-col md:flex-row items-center justify-between group hover:translate-x-2 transition-all duration-300">
                <div className="flex items-center gap-6 w-full md:w-auto">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center p-0.5 shadow-sm border ${getStatusStyle(payment.status)}`}>
                      <span className="material-symbols-outlined text-2xl">{payment.status === 'pagado' ? 'task_alt' : 'schedule'}</span>
                  </div>
                  <div>
                      <h4 className="font-headline font-bold text-primary text-lg tracking-tight uppercase italic">{payment.athlete_name}</h4>
                      <p className="font-body text-xs text-zinc-400 uppercase tracking-widest mt-0.5">{payment.plan_name} — Vence {payment.due_date}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
                  <div className="text-right">
                      <p className="font-headline text-2xl font-black text-primary">${payment.amount}</p>
                      <p className="font-body text-[10px] text-zinc-400 uppercase tracking-widest italic">{payment.reference || 'Sin referencia'}</p>
                  </div>
                  <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${getStatusStyle(payment.status)}`}>
                      {payment.status_display}
                  </span>
                  <button className="material-symbols-outlined text-zinc-300 hover:text-primary transition-colors p-2 lg:block hidden">more_vert</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Registrar Nuevo Pago"
      >
        <PaymentForm 
          athletes={athletes}
          onSubmit={handleSave}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default PaymentsList;
