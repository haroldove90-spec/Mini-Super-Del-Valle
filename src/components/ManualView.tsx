import React from 'react';
import { BookOpen, CheckCircle2, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function ManualView() {
  return (
    <div className="p-8 lg:p-12 h-full overflow-y-auto bg-slate-50 space-y-10">
      <header className="max-w-4xl">
        <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic uppercase mb-2">Manual Operativo</h1>
        <p className="text-slate-500 font-medium">Guía rápida para el uso del ecosistema Mini Super Del Valle v2.0</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
        {/* Card 1: POS */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100"
        >
          <div className="w-14 h-14 bg-brand-green/10 rounded-2xl flex items-center justify-center mb-6">
            <CheckCircle2 className="w-8 h-8 text-brand-green" />
          </div>
          <h3 className="text-xl font-black text-slate-900 uppercase italic mb-4">Punto de Venta</h3>
          <ul className="space-y-3 text-sm text-slate-600 font-medium">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 shrink-0" />
              Selección rápida de productos (Leche, Huevo, Refrescos).
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 shrink-0" />
              Finalización de venta con Doble Impresión automática.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 shrink-0" />
              Interfaz "h-screen" (sin scroll) para cajeros.
            </li>
          </ul>
        </motion.div>

        {/* Card 2: Admin */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100"
        >
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center mb-6">
            <Info className="w-8 h-8 text-brand-green" />
          </div>
          <h3 className="text-xl font-black text-slate-900 uppercase italic mb-4">Administración</h3>
          <ul className="space-y-3 text-sm text-slate-600 font-medium">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
              Dashboard con gráficas de rendimiento operativo.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
              Alertas automáticas de Stock Bajo (&lt; 15 unidades).
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 mt-1.5 shrink-0" />
              Gestión de roles (Admin, Gerente, Cajero).
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="max-w-6xl bg-brand-green p-10 rounded-[48px] text-white overflow-hidden relative shadow-2xl">
        <div className="relative z-10">
          <BookOpen className="w-12 h-12 mb-6 opacity-50" />
          <h2 className="text-3xl font-black italic uppercase tracking-tighter mb-4">Soporte Técnico</h2>
          <p className="text-brand-green-50 font-bold mb-8 max-w-xl">
            Este sistema es una versión Enterprise v2.0. Para cualquier ajuste en la base de datos o configuración de impresoras térmicas, contacte a su administrador.
          </p>
          <div className="flex gap-4">
             <div className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-2xl font-black uppercase text-xs tracking-widest italic border border-white/10">
                v2.0 Stable Build
             </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl" />
      </div>
    </div>
  );
}
