import { Search, Filter, Plus, MoreHorizontal, Download } from 'lucide-react';
import { MOCK_PRODUCTS } from '../types';
import { motion } from 'motion/react';

export default function InventoryView() {
  return (
    <div className="p-8 h-full flex flex-col pixel-perfect-height space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">Inventario de Valle</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Catalogo Unificado de Sucursal</p>
        </div>
        <div className="flex gap-3">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4 text-brand-green" />
            Exportar
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-brand-green text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-brand-green/20 italic">
            <Plus className="w-4 h-4 text-white" />
            Nuevo Ítem
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="p-8 border-b border-slate-50 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shrink-0 bg-white/50 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-2xl border border-slate-100 shrink-0">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Filtrar por SKU o nombre..." className="bg-transparent outline-none text-xs font-bold w-full sm:w-64 placeholder:text-slate-300" />
            </div>
            <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-all">
              <Filter className="w-3.5 h-3.5" />
              Categorías
            </button>
          </div>
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic pr-2">{MOCK_PRODUCTS.length} REGISTROS ACTIVOS</span>
        </div>

        <div className="overflow-auto flex-1 scrollbar-hide">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="sticky top-0 bg-white z-10 border-b border-slate-50">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">Producto</th>
                <th className="px-4 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">SKU</th>
                <th className="px-4 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">Categoría</th>
                <th className="px-4 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">Precio</th>
                <th className="px-4 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic">Stock</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] italic text-right">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_PRODUCTS.map((product, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={product.id} 
                  className="hover:bg-slate-50/80 transition-all group cursor-default"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-black text-slate-400 text-xs border border-slate-100 group-hover:bg-brand-green/10 group-hover:border-brand-green/20 group-hover:text-brand-green transition-all italic">
                        {product.name[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-slate-900 tracking-tight uppercase">{product.name}</span>
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-0.5">{product.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5">
                    <span className="text-[10px] font-black font-mono text-slate-400 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{product.sku}</span>
                  </td>
                  <td className="px-4 py-5">
                    <span className="text-[10px] font-black text-slate-400 italic uppercase bg-slate-50/50 px-3 py-1 rounded-full border border-slate-100">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-sm font-light italic text-slate-900 tracking-tighter">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-5 text-sm font-black text-slate-900 tracking-tight">{product.stock} <span className="text-[9px] text-slate-300 uppercase tracking-tighter font-bold ml-1">und</span></td>
                  <td className="px-8 py-5 text-right">
                    {product.stock <= 15 ? (
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-red/10 text-brand-red rounded-full text-[9px] font-black uppercase tracking-widest italic border border-brand-red/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
                        Alerta Stock
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-green/10 text-brand-green rounded-full text-[9px] font-black uppercase tracking-widest italic border border-brand-green/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                        Disponible
                      </span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
