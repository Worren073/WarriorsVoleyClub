import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Modal from '../../components/ui/Modal';
import api from '../../api/axios';
import PaymentForm from '../../components/forms/PaymentForm';
import PaymentDetailModal from '../../components/ui/PaymentDetailModal';
import Skeleton from '../../components/ui/Skeleton';
import Swal from 'sweetalert2';

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [monthFilter, setMonthFilter] = useState('');
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear().toString());
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const fetchPayments = async (page = 1) => {
    setLoading(true);
    try {
      const params = { 
        status: statusFilter,
        page: page,
        search: searchTerm
      };
      if (monthFilter) params.created_at__month = monthFilter;
      if (yearFilter) params.created_at__year = yearFilter;

      const response = await api.get('/payments/', { params });
      
      const data = response.data;
      setPayments(data.results || []);
      setTotalCount(data.count || 0);
      setHasNext(!!data.next);
      setHasPrev(!!data.previous);
      setCurrentPage(page);
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

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPayments(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, statusFilter, monthFilter, yearFilter]);

  useEffect(() => {
    fetchAthletes();
  }, []);

  const months = [
    { value: '1', label: 'Enero' },
    { value: '2', label: 'Febrero' },
    { value: '3', label: 'Marzo' },
    { value: '4', label: 'Abril' },
    { value: '5', label: 'Mayo' },
    { value: '6', label: 'Junio' },
    { value: '7', label: 'Julio' },
    { value: '8', label: 'Agosto' },
    { value: '9', label: 'Septiembre' },
    { value: '10', label: 'Octubre' },
    { value: '11', label: 'Noviembre' },
    { value: '12', label: 'Diciembre' },
  ];

  const years = Array.from({ length: 5 }, (_, i) => (new Date().getFullYear() - 2 + i).toString());

  const handleSave = async (formData) => {
    try {
      await api.post('/payments/', formData);
      Swal.fire({ icon: 'success', title: 'Pago Registrado', timer: 1500, showConfirmButton: false });
      setIsModalOpen(false);
      fetchPayments(1);
    } catch (error) {
      // Handled globally
    }
  };

  const openDetail = (payment) => {
    setSelectedPayment(payment);
    setIsDetailModalOpen(true);
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
        {/* Filters Header */}
        <div className="flex flex-col lg:flex-row justify-between items-stretch lg:items-center bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 gap-6">
          <div className="flex-1 relative text-primary">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">search</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar pago por nombre de atleta..."
              className="w-full pl-12 pr-4 py-3 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 font-body text-sm italic font-bold placeholder:text-zinc-400/50"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-zinc-400 text-sm">filter_list</span>
              <select
                className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 font-body text-xs italic font-bold"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">Todos los Estados</option>
                <option value="pagado">Pagado</option>
                <option value="pendiente">Pendiente</option>
                <option value="atrasado">Atrasado</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-zinc-400 text-sm">calendar_month</span>
              <select
                className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 font-body text-xs italic font-bold"
                value={monthFilter}
                onChange={(e) => setMonthFilter(e.target.value)}
              >
                <option value="">Cualquier Mes</option>
                {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-zinc-400 text-sm">event</span>
              <select
                className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/50 font-body text-xs italic font-bold"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="">Cualquier Año</option>
                {years.map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
          </div>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center gap-2 justify-center"
          >
            <span className="material-symbols-outlined">add_card</span>
            Registrar Pago
          </button>
        </div>

        {/* Payments List */}
        <div className="grid grid-cols-1 gap-4">
          {loading ? (
            <Skeleton className="h-24 w-full" count={4} />
          ) : (
            payments.length > 0 ? (
              <>
                {payments.map((payment) => (
                  <div 
                    key={payment.id} 
                    onClick={() => openDetail(payment)}
                    className="surface-card p-6 border-none shadow-sm flex flex-col md:flex-row items-center justify-between group hover:translate-x-2 cursor-pointer transition-all duration-300"
                  >
                    <div className="flex items-center gap-6 w-full md:w-auto">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center p-0.5 shadow-sm border ${getStatusStyle(payment.status)}`}>
                          <span className="material-symbols-outlined text-2xl">{payment.status === 'pagado' ? 'task_alt' : 'schedule'}</span>
                      </div>
                      <div>
                          <h4 className="font-headline font-bold text-primary text-lg tracking-tight uppercase italic">{payment.athlete_name}</h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <p className="font-body text-[10px] text-zinc-400 uppercase tracking-widest font-black">{payment.athlete_id_code}</p>
                            <span className="w-1 h-1 bg-zinc-200 rounded-full"></span>
                            <p className="font-body text-xs text-zinc-400 uppercase tracking-widest">{payment.plan_name}</p>
                          </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-12 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
                      <div className="text-right">
                          <p className="font-headline text-2xl font-black text-primary">
                            {payment.currency === 'usd' ? '$' : 'Bs.'}{payment.amount}
                          </p>
                          <p className="font-body text-[10px] text-zinc-400 uppercase tracking-widest italic">{payment.payment_method?.replace('_', ' ') || 'Pago'}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${getStatusStyle(payment.status)}`}>
                          {payment.status_display}
                      </span>
                      <button className="material-symbols-outlined text-zinc-300 group-hover:text-primary transition-colors p-2 lg:block hidden">visibility</button>
                    </div>
                  </div>
                ))}

                {/* Pagination Controls */}
                <div className="flex items-center justify-between pt-6 px-4">
                  <p className="text-xs text-zinc-400 font-body italic">
                    Mostrando <span className="font-black text-primary">{(currentPage - 1) * 15 + 1} - {Math.min(currentPage * 15, totalCount)}</span> de <span className="font-black text-primary">{totalCount}</span> pagos
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); fetchPayments(currentPage - 1); }}
                      disabled={!hasPrev || loading}
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-zinc-100 hover:bg-zinc-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-primary text-white font-headline font-black text-xs italic">
                      {currentPage}
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); fetchPayments(currentPage + 1); }}
                      disabled={!hasNext || loading}
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-zinc-100 hover:bg-zinc-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-zinc-200">
                <span className="material-symbols-outlined text-6xl text-zinc-200">payments</span>
                <p className="text-zinc-400 font-body italic mt-4">No se encontraron pagos con los filtros actuales</p>
              </div>
            )
          )}
        </div>
      </div>

      {/* Registro Modal */}
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

      {/* Detalle Modal */}
      <PaymentDetailModal 
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        payment={selectedPayment}
        onStatusUpdate={() => fetchPayments(currentPage)}
      />
    </DashboardLayout>
  );
};

export default PaymentsList;
