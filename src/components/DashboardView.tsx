import { TrendingUp, Users, Package, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SALES_DATA, MOCK_PRODUCTS } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const stats = [
  { label: 'Ventas del Día', value: '$12,450', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'brand-green' },
  { label: 'Clientes Atendidos', value: '148', change: '+5.2%', trend: 'up', icon: Users, color: 'blue' },
  { label: 'Stock Bajo', value: '12 ítems', change: '-2 ítems', trend: 'down', icon: Package, color: 'brand-red' },
  { label: 'Ticket Promedio', value: '$84.12', change: '+1.4%', trend: 'up', icon: TrendingUp, color: 'brand-black' },
];

export default function DashboardView() {
  return (
    <div className="p-8 h-full overflow-y-auto pixel-perfect-height space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">Panel Estratégico</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Sincronizado con Sucursal Valle</p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 sm:flex-none px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all shadow-sm">Reporte Diario</button>
          <button className="flex-1 sm:flex-none px-6 py-3 bg-brand-green text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-lg shadow-brand-green/20 italic">Nueva Gestión</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label} 
            className={cn(
              "p-8 rounded-[32px] shadow-sm border border-slate-100 flex flex-col gap-2 transition-all hover:shadow-xl hover:border-brand-green/10",
              stat.label === 'Stock Bajo' ? "border-l-4 border-l-brand-red bg-white" : "bg-white",
              stat.label === 'Ticket Promedio' ? "bg-black text-white border-slate-800" : ""
            )}
          >
            <div className="flex justify-between items-start mb-2">
               <span className={cn(
                  "text-[10px] font-black uppercase tracking-[0.15em]",
                  stat.label === 'Ticket Promedio' ? "text-slate-500" : "text-slate-400"
               )}>{stat.label}</span>
               <stat.icon className={cn("w-4 h-4", 
                 stat.label === 'Ticket Promedio' ? "text-brand-green" : "text-slate-200"
               )} />
            </div>
            <div className="flex items-baseline gap-2">
              <span className={cn(
                "text-4xl font-light italic tracking-tighter",
                stat.label === 'Ticket Promedio' ? "text-white" : "text-slate-900"
              )}>{stat.value}</span>
              <span className={cn(
                "text-[10px] font-black italic",
                stat.trend === 'up' ? "text-brand-green" : "text-brand-red"
              )}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 bg-white p-8 lg:p-10 rounded-[48px] shadow-sm border border-slate-100 backdrop-blur-sm bg-white/80">
          <div className="flex justify-between items-center mb-10">
            <div>
               <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 italic">Rendimiento Operativo</h3>
               <p className="text-[10px] font-bold text-slate-300 mt-1 uppercase tracking-widest pr-2">Crecimiento Semana Actual</p>
            </div>
            <div className="flex gap-2">
               <div className="w-3 h-3 rounded-full bg-brand-green shadow-lg shadow-brand-green/30"></div>
               <div className="w-3 h-3 rounded-full bg-slate-100"></div>
            </div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                  dy={15}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 900 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#000', 
                    border: 'none', 
                    borderRadius: '24px',
                    color: '#fff',
                    padding: '16px 20px',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                  itemStyle={{ color: '#22c55e', fontWeight: '900', fontSize: '14px', fontStyle: 'italic' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#22c55e" 
                  strokeWidth={6}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 bg-white p-8 lg:p-10 rounded-[48px] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10 italic">Inventario en Alerta</h3>
          <div className="space-y-8 flex-1">
            {MOCK_PRODUCTS.slice(0, 4).map((product, idx) => (
              <div key={idx} className="flex items-center gap-5 transition-all hover:translate-x-2 group">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-400 text-xs border border-slate-100 group-hover:bg-brand-green/10 group-hover:border-brand-green/20 group-hover:text-brand-green transition-all italic">
                  {product.name[0]}
                </div>
                <div className={cn(
                  "flex-1 pb-4",
                  idx !== 3 && "border-b border-slate-50"
                )}>
                  <p className="text-sm font-black text-slate-900 leading-tight mb-1 uppercase tracking-tight">{product.name}</p>
                  <p className={cn(
                    "text-[10px] font-black uppercase tracking-[0.1em] italic",
                    product.stock <= 15 ? "text-brand-red" : "text-brand-green"
                  )}>
                    {product.stock <= 15 ? `Solo ${product.stock} unidades` : 'Stock Optimizado'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-5 mt-10 bg-slate-900 border border-slate-800 rounded-3xl text-[10px] font-black uppercase tracking-widest text-brand-green hover:bg-black transition-all shadow-xl shadow-slate-900/10 italic">
            Auditar Todo el Catálogo
          </button>
        </div>
      </div>
    </div>
  );
}
