import { TrendingUp, Users, Package, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SALES_DATA, MOCK_PRODUCTS } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

const stats = [
  { label: 'Ventas del Día', value: '$12,450', change: '+12.5%', trend: 'up', icon: DollarSign, color: 'emerald' },
  { label: 'Clientes Atendidos', value: '148', change: '+5.2%', trend: 'up', icon: Users, color: 'blue' },
  { label: 'Stock Bajo', value: '12 ítems', change: '-2 ítems', trend: 'down', icon: Package, color: 'orange' },
  { label: 'Ticket Promedio', value: '$84.12', change: '+1.4%', trend: 'up', icon: TrendingUp, color: 'purple' },
];

export default function DashboardView() {
  return (
    <div className="p-8 h-full overflow-y-auto pixel-perfect-height space-y-8">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight italic">Panel de Control</h1>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">Resumen de Operaciones</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2 bg-white border border-slate-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">Exportar Datos</button>
          <button className="px-6 py-2 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">Nueva Gestión</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={stat.label} 
            className={cn(
              "p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col gap-1 transition-all hover:shadow-md",
              stat.label === 'Stock Bajo' ? "border-l-4 border-l-emerald-500 bg-white" : "bg-white",
              stat.label === 'Ticket Promedio' ? "bg-slate-900 text-white border-slate-800" : ""
            )}
          >
            <span className={cn(
               "text-[10px] font-bold uppercase tracking-wider",
               stat.label === 'Ticket Promedio' ? "text-slate-500" : "text-slate-400"
            )}>{stat.label}</span>
            <div className="flex items-baseline gap-2">
              <span className={cn(
                "text-3xl font-light italic tracking-tight",
                stat.label === 'Ticket Promedio' ? "text-white" : "text-slate-900"
              )}>{stat.value}</span>
              <span className={cn(
                "text-xs font-bold",
                stat.trend === 'up' ? "text-emerald-500" : "text-red-500"
              )}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 backdrop-blur-sm bg-white/80">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Rendimiento Semanal</h3>
            <div className="flex gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
               <div className="w-2 h-2 rounded-full bg-slate-200"></div>
            </div>
          </div>
          <div className="h-[300px] w-full px-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={SALES_DATA}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f8fafc" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                  dy={15}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    border: 'none', 
                    borderRadius: '16px',
                    color: '#fff',
                    padding: '12px 16px',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2)'
                  }}
                  itemStyle={{ color: '#34d399', fontWeight: 'bold', fontSize: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#10b981" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorSales)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 border-t border-slate-50 pt-4 flex justify-between text-[10px] font-bold text-slate-300 tracking-widest uppercase">
             {SALES_DATA.map(d => <span key={d.name}>{d.name}</span>)}
          </div>
        </div>

        <div className="col-span-4 bg-white p-8 rounded-[40px] shadow-sm border border-slate-100 flex flex-col">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-8 italic">Inventario Crítico</h3>
          <div className="space-y-6 flex-1">
            {MOCK_PRODUCTS.slice(0, 4).map((product, idx) => (
              <div key={idx} className="flex items-center gap-4 transition-all hover:translate-x-1 group">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-bold text-slate-400 text-xs border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 group-hover:text-emerald-500 transition-all">
                  {product.name[0]}
                </div>
                <div className={cn(
                  "flex-1 pb-3",
                  idx !== 3 && "border-b border-slate-50"
                )}>
                  <p className="text-sm font-bold text-slate-800 leading-tight mb-1">{product.name}</p>
                  <p className={cn(
                    "text-[10px] font-bold uppercase tracking-wider",
                    product.stock <= 15 ? "text-red-500" : "text-emerald-500"
                  )}>
                    {product.stock <= 15 ? `Solo ${product.stock} piezas` : 'Stock Suficiente'}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full py-4 mt-8 bg-slate-50 border border-slate-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all">
            Ver Todo el Inventario
          </button>
        </div>
      </div>
    </div>
  );
}
