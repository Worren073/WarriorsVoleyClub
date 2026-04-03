import React, { useState, useEffect } from 'react';

const PaymentForm = ({ onSubmit, onCancel, athletes }) => {
  const [formData, setFormData] = useState({
    athlete: '',
    plan: '',
    amount: '',
    due_date: new Date().toISOString().split('T')[0],
    status: 'pendiente',
    reference: '',
    notes: '',
  });

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
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Atleta</label>
          <select
            name="athlete"
            value={formData.athlete}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
          >
            <option value="">Seleccionar Atleta...</option>
            {athletes.map(a => (
              <option key={a.id} value={a.id}>{a.full_name} ({a.athlete_id})</option>
            ))}
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Monto ($)</label>
            <input
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Vencimiento</label>
            <input
              name="due_date"
              type="date"
              value={formData.due_date}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Referencia / Comprobante</label>
          <input
            name="reference"
            value={formData.reference}
            onChange={handleChange}
            placeholder="Ej: Pago Móvil #123456"
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-zinc-400">Estado Inicial</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-white border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-secondary/50 outline-none"
          >
            <option value="pendiente">Pendiente</option>
            <option value="pagado">Pagado</option>
            <option value="atrasado">Atrasado</option>
          </select>
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
          className="flex-1 bg-secondary text-white px-6 py-4 rounded-xl font-headline font-black uppercase text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-lg"
        >
          Registrar Pago
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
