import { Search, Filter, Plus, MoreHorizontal, Download } from 'lucide-react';
import { MOCK_PRODUCTS } from '../types';
import { motion } from 'motion/react';

export default function InventoryView() {
  return (
    <div className="p-8 h-full flex flex-col pixel-perfect-height space-y-6">
      <div className="flex items-center justify-between shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight italic">Inventario Maestro</h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Catalogo de Existencias</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2 bg-white border border-slate-200 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-50 transition-all">
            <Download className="w-4 h-4 text-emerald-500" />
            Exportar PDF
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
            <Plus className="w-4 h-4 text-emerald-500" />
            Nuevo Producto
          </button>
        </div>
      </div>

      <div className="bg-white rounded-huge border border-slate-100 shadow-sm flex flex-col flex-1 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between shrink-0 bg-white/50 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-100 shrink-0">
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Filtrar por SKU o nombre..." className="bg-transparent outline-none text-xs font-bold w-64 placeholder:text-slate-300" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-2xl text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:bg-slate-50 hover:text-slate-600 transition-all">
              <Filter className="w-3.5 h-3.5" />
              Categorías
            </button>
          </div>
          <span className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">{MOCK_PRODUCTS.length} ITEMS REGISTRADOS</span>
        </div>

        <div className="overflow-auto flex-1">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-white z-10 border-b border-slate-50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.1em]">Producto</th>
                <th className="px-4 py-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.1em]">SKU</th>
                <th className="px-4 py-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.1em]">Categoría</th>
                <th className="px-4 py-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.1em]">Precio</th>
                <th className="px-4 py-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.1em]">Stock</th>
                <th className="px-8 py-5 text-[10px] font-black text-slate-300 uppercase tracking-[0.1em] text-right">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {MOCK_PRODUCTS.map((product, idx) => (
                <motion.tr 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={product.id} 
                  className="hover:bg-slate-50/50 transition-colors group cursor-default"
                >
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center font-bold text-slate-400 text-xs border border-slate-100 group-hover:bg-emerald-50 group-hover:border-emerald-100 group-hover:text-emerald-600 transition-all">
                        {product.name[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800 tracking-tight">{product.name}</span>
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">{product.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded">{product.sku}</span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-[10px] font-bold text-slate-400 italic uppercase">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm font-light italic text-slate-900 tracking-tight">${product.price.toFixed(2)}</td>
                  <td className="px-4 py-4 text-sm font-bold text-slate-900">{product.stock} <span className="text-[10px] text-slate-400 uppercase tracking-tighter">unidades</span></td>
                  <td className="px-8 py-4 text-right">
                    {product.stock <= 15 ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-50 text-red-600 rounded-full text-[10px] font-bold uppercase tracking-tight">
                        Stock Bajo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-tight">
                        En Stock
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
