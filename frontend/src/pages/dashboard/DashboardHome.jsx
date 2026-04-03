import React, { useState, useEffect } from 'react';
import api from '../../api/axios';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { KpiSkeleton } from '../../components/ui/Skeleton';

const DashboardHome = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get('/payments/summary/');
        setSummary(response.data);
      } catch (error) {
        console.error('Error fetching dashboard summary:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const kpiCards = [
    {
      title: 'Ingresos Mensuales',
      value: summary ? `$${summary.total_income}` : '$0.00',
      change: summary?.income_change_percent || 0,
      icon: 'payments',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Atletas al Día',
      value: summary ? `${summary.athletes_on_track}%` : '0%',
      change: 0,
      icon: 'check_circle',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Pagos Atrasados',
      value: summary ? summary.overdue_count : 0,
      change: -2,
      icon: 'warning',
      color: 'bg-rose-50 text-rose-600',
    },
  ];

  return (
    <DashboardLayout title="Panel de Control">
      <div className="space-y-8 animate-in fade-in duration-500">
        {loading ? (
          <KpiSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {kpiCards.map((card, index) => (
              <div key={index} className="surface-card p-8 border-none relative overflow-hidden group shadow-sm flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-32 h-32 bg-zinc-50 rounded-full translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform duration-500"></div>
                
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <p className="font-body text-xs font-black text-zinc-400 uppercase tracking-widest">{card.title}</p>
                    <h3 className="font-headline text-4xl font-black text-primary mt-2 italic">{card.value}</h3>
                    {card.change !== 0 && (
                      <p className={`text-xs font-bold mt-2 flex items-center gap-1 ${card.change > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                        <span className="material-symbols-outlined text-sm">{card.change > 0 ? 'trending_up' : 'trending_down'}</span>
                        {card.change > 0 ? '+' : ''}{card.change}% vs mes anterior
                      </p>
                    )}
                  </div>
                  <div className={`p-4 rounded-xl ${card.color} shadow-sm`}>
                    <span className="material-symbols-outlined text-2xl">{card.icon}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="surface-card p-10 border-none shadow-sm h-[400px] flex flex-col items-center justify-center text-center">
             <div className="material-symbols-outlined text-6xl text-zinc-100 mb-6">bar_chart</div>
             <h4 className="font-headline text-xl font-bold text-primary italic uppercase mb-2">Análisis de Desempeño Financiero</h4>
             <p className="font-body text-sm text-zinc-500 max-w-sm">Información detallada del flujo de caja por categoría. (Próximamente)</p>
          </div>
          <div className="surface-card p-10 border-none shadow-sm h-[400px] flex flex-col items-center justify-center text-center">
             <div className="material-symbols-outlined text-6xl text-zinc-100 mb-6">timeline</div>
             <h4 className="font-headline text-xl font-bold text-primary italic uppercase mb-2">Crecimiento de la Matrícula</h4>
             <p className="font-body text-sm text-zinc-500 max-w-sm">Evolución de la cantidad de atletas inscritos en tiempo real. (Próximamente)</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
