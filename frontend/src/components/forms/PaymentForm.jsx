import React, { useState, useEffect } from 'react';
import AthleteSearch from '../ui/AthleteSearch';
import api from '../../api/axios';

const PaymentForm = ({ onSubmit, onCancel, athletes }) => {
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    athlete: '',
    plan: '',
    amount: '',
    due_date: '',
    status: 'pendiente',
    payment_method: 'efectivo',
    currency: 'bs',
    bank: '',
    phone_number: '',
    id_number: '',
    id_type: 'V',
    reference: '',
    notes: '',
  });

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get('/payments/plans/');
        const activePlans = response.data.results || response.data;
        setPlans(activePlans);
      } catch (error) {
        console.error('Error fetching plans:', error);
      }
    };
    fetchPlans();

    // Set default due date to 1 month from now
    const today = new Date();
    const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
    setFormData(prev => ({ 
      ...prev, 
      due_date: nextMonth.toISOString().split('T')[0] 
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'plan') {
      const selectedPlan = plans.find(p => p.id === parseInt(value));
      if (selectedPlan) {
        setFormData(prev => ({ 
          ...prev, 
          plan: value, 
          amount: selectedPlan.amount 
        }));
        return;
      }
    }
    
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAthleteSelect = (id) => {
    setFormData(prev => ({ ...prev, athlete: id }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = { ...formData };
    if (formData.status === 'pagado' && !formData.payment_date) {
      submissionData.payment_date = new Date().toISOString().split('T')[0];
    }
    onSubmit(submissionData);
  };

  const renderEfectivoFields = () => (
    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Monto</label>
        <input
          name="amount"
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
          placeholder="Ej: 100"
        />
      </div>
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Moneda</label>
        <select
          name="currency"
          value={formData.currency}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
        >
          <option value="bs">Bolívares (Bs)</option>
          <option value="usd">Dólares ($)</option>
        </select>
      </div>
    </div>
  );

  const renderPagoMovilFields = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Referencia</label>
          <input
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic font-mono"
            placeholder="Ej: 123456"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Teléfono</label>
          <input
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            placeholder="Ej: 04121234567"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-24 space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Tipo</label>
          <select
            name="id_type"
            value={formData.id_type}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
          >
            <option value="V">V-</option>
            <option value="J">J-</option>
            <option value="E">E-</option>
          </select>
        </div>
        <div className="flex-1 space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Cédula / RIF</label>
          <input
            name="id_number"
            value={formData.id_number}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            placeholder="Ej: 20123456"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Banco Destino</label>
          <input
            name="bank"
            value={formData.bank}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            placeholder="Ej: Banesco"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Monto (Bs)</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic underline decoration-rose-400 decoration-2 underline-offset-4"
            placeholder="Ej: 50.00"
          />
        </div>
      </div>
    </div>
  );

  const renderTransferenciaFields = () => (
    <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Banco Emisor</label>
        <input
          name="bank"
          value={formData.bank}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
          placeholder="Ej: Banco Mercantil"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Referencia</label>
          <input
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic font-mono"
            placeholder="Ej: 0012345"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Monto (Bs)</label>
          <input
            name="amount"
            type="number"
            step="0.01"
            value={formData.amount}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic underline decoration-blue-400 decoration-2 underline-offset-4"
            placeholder="Ej: 250.00"
          />
        </div>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8 font-body">
      <div className="space-y-6">
        {/* Atleta Search */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Atleta (Buscar por nombre)</label>
          <AthleteSearch 
            athletes={athletes} 
            onSelect={handleAthleteSelect} 
            selectedAthleteId={formData.athlete}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Plan de Pago</label>
            <select
              name="plan"
              value={formData.plan}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            >
              <option value="">Seleccionar Plan...</option>
              {plans.map(p => (
                <option key={p.id} value={p.id}>{p.name} (${p.amount})</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Vencimiento Cobrado</label>
            <input
              name="due_date"
              type="date"
              value={formData.due_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-bold italic"
            />
          </div>
        </div>

        {/* Payment Method Selector */}
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic text-center block mb-4">Método de Pago</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'efectivo', label: 'Efectivo', icon: 'payments' },
              { id: 'pago_movil', label: 'Pago Móvil', icon: 'phone_android' },
              { id: 'transferencia', label: 'Transf.', icon: 'account_balance' },
            ].map(method => (
              <button
                key={method.id}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, payment_method: method.id, currency: method.id === 'efectivo' ? prev.currency : 'bs' }))}
                className={`py-6 flex flex-col items-center justify-center gap-2 rounded-2xl border-2 transition-all ${
                  formData.payment_method === method.id 
                    ? 'border-primary bg-primary/5 text-primary scale-105 shadow-md ring-2 ring-primary/20' 
                    : 'border-zinc-100 hover:border-zinc-300 text-zinc-400 grayscale opacity-70 hover:grayscale-0 hover:opacity-100'
                }`}
              >
                <span className="material-symbols-outlined text-2xl">{method.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest italic">{method.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Fields */}
        <div className="p-1">
          {formData.payment_method === 'efectivo' && renderEfectivoFields()}
          {formData.payment_method === 'pago_movil' && renderPagoMovilFields()}
          {formData.payment_method === 'transferencia' && renderTransferenciaFields()}
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400 italic">Notas / Observaciones</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="2"
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none transition-all font-body text-sm"
            placeholder="Información adicional del pago..."
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
          Confirmar y Registrar
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
