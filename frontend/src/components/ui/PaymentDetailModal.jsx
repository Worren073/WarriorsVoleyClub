import React, { useState } from 'react';
import Modal from './Modal';
import api from '../../api/axios';
import Swal from 'sweetalert2';

const PaymentDetailModal = ({ payment, isOpen, onClose, onStatusUpdate }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!payment) return null;

  const handleMarkAsPaid = async () => {
    setIsUpdating(true);
    try {
      await api.patch(`/payments/${payment.id}/`, { 
        status: 'pagado',
        payment_date: new Date().toISOString().split('T')[0]
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Pago Completado',
        text: 'El estado ha sido actualizado a Pagado.',
        timer: 2000,
        showConfirmButton: false
      });
      
      if (onStatusUpdate) onStatusUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating payment status:', error);
    } finally {
      setIsUpdating(false);
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

  const DetailItem = ({ label, value, icon, fullWidth = false }) => (
    <div className={`p-4 border border-zinc-100 rounded-xl bg-zinc-50/50 ${fullWidth ? 'col-span-2' : ''}`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="material-symbols-outlined text-[16px] text-zinc-400">{icon}</span>
        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400 italic">{label}</p>
      </div>
      <p className="font-headline font-bold text-primary italic text-sm">{value || '--'}</p>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Comprobante de Pago">
      <div className="space-y-6">
        {/* Header Summary */}
        <div className="flex flex-col items-center justify-center p-8 bg-zinc-50 rounded-2xl border border-zinc-100/50 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
             <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm ${getStatusStyle(payment.status)}`}>
                {payment.status_display}
            </span>
          </div>
          <span className="material-symbols-outlined text-4xl text-primary mb-2">branding_watermark</span>
          <h3 className="font-headline text-2xl font-black text-primary tracking-tight italic uppercase text-center">{payment.athlete_name}</h3>
          <p className="font-body text-xs text-zinc-400 font-bold tracking-widest uppercase">{payment.plan_name}</p>
          <div className="mt-6 text-center">
            <p className="text-4xl font-headline font-black text-primary">
              {payment.currency === 'usd' ? '$' : 'Bs. '}{payment.amount}
            </p>
            <p className="text-[10px] font-headline font-black text-secondary-fixed tracking-[0.2em] italic uppercase mt-1">
                Método: {payment.payment_method?.toUpperCase().replace('_', ' ') || 'N/A'}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <DetailItem label="REFERENCIA" value={payment.reference} icon="tag" />
          <DetailItem label="FECHA DE VENCIMIENTO" value={payment.due_date} icon="calendar_today" />
          
          {payment.payment_method !== 'efectivo' && (
            <>
              <DetailItem label="BANCO" value={payment.bank} icon="account_balance" />
              <DetailItem label="TELÉFONO" value={payment.phone_number} icon="phone_iphone" />
              <DetailItem label="IDENTIFICACIÓN" value={`${payment.id_type}-${payment.id_number}`} icon="badge" />
            </>
          )}
          
          {payment.payment_date && (
            <DetailItem label="FECHA DE PAGO" value={payment.payment_date} icon="event_available" />
          )}

          {payment.notes && (
            <DetailItem label="NOTAS ADICIONALES" value={payment.notes} icon="description" fullWidth={true} />
          )}
        </div>

        <div className="pt-4 border-t border-zinc-100 flex gap-4">
            <button 
                onClick={onClose}
                className="flex-1 px-8 py-4 border border-zinc-200 text-zinc-500 rounded-xl font-headline font-black text-xs uppercase tracking-widest hover:bg-zinc-50 transition-all"
            >
                Cerrar
            </button>
            
            {payment.status !== 'pagado' && (
              <button 
                  onClick={handleMarkAsPaid}
                  disabled={isUpdating}
                  className="flex-[2] px-8 py-4 bg-emerald-600 text-white rounded-xl font-headline font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
              >
                  {isUpdating ? (
                    <span className="animate-spin material-symbols-outlined">sync</span>
                  ) : (
                    <span className="material-symbols-outlined">check_circle</span>
                  )}
                  Marcar como Pagado
              </button>
            )}
        </div>
      </div>
    </Modal>
  );
};

export default PaymentDetailModal;
