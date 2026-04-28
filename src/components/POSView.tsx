import { useState } from 'react';
import { Search, ShoppingCart, Trash2, Printer, CreditCard, Banknote, User, Scan } from 'lucide-react';
import { MOCK_PRODUCTS, CartItem, Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

interface POSViewProps {
  showPrinterConfig: boolean;
}

export default function POSView({ showPrinterConfig }: POSViewProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPrinting, setIsPrinting] = useState(false);
  const [printStage, setPrintStage] = useState(0); // 0: idle, 1: generating, 2: ticket, 3: order, 4: success

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    
    setIsPrinting(true);
    setPrintStage(1);
    
    setTimeout(() => setPrintStage(2), 1000);
    setTimeout(() => setPrintStage(3), 2000);
    setTimeout(() => setPrintStage(4), 3000);
    setTimeout(() => {
      setIsPrinting(false);
      setPrintStage(0);
      setCart([]);
    }, 4500);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const taxes = subtotal * 0.16;
  const total = subtotal + taxes;

  return (
    <div className="flex bg-bg-light pixel-perfect-height overflow-hidden relative">
      <AnimatePresence>
        {isPrinting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-8"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full bg-white rounded-[40px] p-12 text-center shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${(printStage / 4) * 100}%` }}
                  className="h-full bg-brand-green"
                />
              </div>

              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-slate-100">
                {printStage < 4 ? (
                  <Printer className="w-10 h-10 text-brand-green animate-bounce" />
                ) : (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-12 h-12 bg-brand-green rounded-full flex items-center justify-center"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </div>

              <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest mb-2 italic">
                {printStage === 1 && "Generando Comprobantes"}
                {printStage === 2 && "Imprimiendo Ticket Cliente"}
                {printStage === 3 && "Imprimiendo Orden Entrega"}
                {printStage === 4 && "¡Venta Finalizada!"}
              </h2>
              
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                  {printStage < 4 ? "Sincronizando con impresoras locales..." : "La transacción se registró con éxito"}
                </p>
                {printStage < 4 && (
                  <div className="flex justify-center gap-4 mt-6">
                    <div className={cn("flex flex-col items-center gap-2", printStage >= 2 ? "opacity-100" : "opacity-20")}>
                       <div className="w-3 h-3 rounded-full bg-brand-green shadow-lg shadow-brand-green/50" />
                       <span className="text-[8px] font-bold text-slate-400 uppercase">Ticket</span>
                    </div>
                    <div className={cn("flex flex-col items-center gap-2", printStage >= 3 ? "opacity-100" : "opacity-20")}>
                       <div className="w-3 h-3 rounded-full bg-brand-green shadow-lg shadow-brand-green/50" />
                       <span className="text-[8px] font-bold text-slate-400 uppercase">Orden</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Left Area: Product Selector */}
      <div className="flex-1 flex flex-col p-8 min-w-0">
        <div className="mb-8 flex gap-4 shrink-0">
          <div className="flex-1 bg-white border border-slate-100 rounded-huge flex items-center px-6 shadow-sm focus-within:border-brand-green/50 transition-all">
            <Search className="w-5 h-5 text-slate-300 mr-3" />
            <input 
              type="text" 
              placeholder="¿Qué producto buscas?"
              className="flex-1 h-16 outline-none text-sm font-bold placeholder:text-slate-200 tracking-tight"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
              <Scan className="w-5 h-5 text-slate-300" />
            </div>
          </div>
          <div className="flex gap-2">
            {['Todos', 'Lácteos', 'Bebidas', 'Snacks'].map(cat => (
              <button key={cat} className="h-16 px-6 bg-white border border-slate-100 rounded-huge text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-brand-green hover:border-brand-green transition-all whitespace-nowrap shadow-sm italic">
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 pb-6 scrollbar-hide">
          {filteredProducts.map((product) => (
            <motion.button
              whileTap={{ scale: 0.98 }}
              key={product.id}
              onClick={() => addToCart(product)}
              className="flex flex-col text-left bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-brand-green/20 active:bg-brand-green/5 transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                 <span className="text-[10px] font-bold text-slate-300 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-widest">{product.sku}</span>
                 <span className={cn(
                   "text-[10px] font-black uppercase tracking-tighter italic",
                   product.stock <= 15 ? "text-brand-red" : "text-brand-green"
                 )}>Stock: {product.stock}</span>
              </div>
              <h3 className="font-bold text-slate-800 mb-6 line-clamp-2 h-10 leading-tight tracking-tight text-sm uppercase">{product.name}</h3>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-2xl font-light italic text-slate-900 tracking-tighter">${product.price.toFixed(2)}</span>
                <div className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center group-hover:bg-brand-green group-hover:text-white transition-all shadow-sm">
                  <ShoppingCart className="w-5 h-5" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right Area: Cart & Checkout */}
      <div className="w-[480px] bg-white border-l border-slate-100 flex flex-col shrink-0 overflow-hidden shadow-2xl z-20">
        <div className="p-8 border-b border-slate-50 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-black rounded-2xl shadow-lg">
              <ShoppingCart className="w-5 h-5 text-brand-green" />
            </div>
            <div>
              <h2 className="font-black text-slate-900 text-sm uppercase tracking-widest">ORDEN ACTUAL</h2>
              <p className="text-[10px] text-slate-400 font-bold tracking-widest">Sucursal del Valle • Caja 01</p>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs font-black text-slate-900 italic">{cart.length}</span>
            <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">Artículos</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          <AnimatePresence>
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-200">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                   <ShoppingCart className="w-10 h-10" />
                </div>
                <p className="font-black italic uppercase tracking-[0.2em] text-xs">Esperando Productos</p>
              </div>
            ) : (
              cart.map((item) => (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  key={item.id} 
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center font-bold text-slate-400 text-xs border border-slate-100 shrink-0 italic">
                    {item.name[0]}
                  </div>
                  <div className="flex-1 border-b border-slate-50 pb-4">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-sm font-bold text-slate-900 tracking-tight truncate pr-2 uppercase">{item.name}</h4>
                       <span className="text-sm font-light italic text-slate-900 shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 bg-slate-50 px-2 py-1 rounded-xl border border-slate-100">
                        <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 rounded-lg bg-white border border-slate-100 flex items-center justify-center hover:bg-slate-200 transition-all font-bold text-xs">-</button>
                        <span className="text-xs font-black w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 rounded-lg bg-white border border-slate-100 flex items-center justify-center hover:bg-slate-200 transition-all font-bold text-xs">+</button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-slate-300 hover:text-brand-red transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 border-t border-slate-50 bg-slate-50/50 backdrop-blur-sm space-y-6 shrink-0">
          <div className="space-y-3">
             <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>Subtotal Operativo</span>
                <span className="italic font-bold">${subtotal.toFixed(2)}</span>
             </div>
             <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>Impuestos Aplicados (16%)</span>
                <span className="italic font-bold">${taxes.toFixed(2)}</span>
             </div>
             <div className="h-px bg-slate-200/50 my-4" />
             <div className="flex justify-between items-center">
                <span className="text-xs font-black text-slate-900 uppercase tracking-[0.2em] italic">Total a Liquidar</span>
                <span className="text-4xl font-light italic text-slate-900 tracking-tighter">${total.toFixed(2)}</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center gap-2 p-5 bg-white rounded-huge border border-slate-200 hover:border-brand-green hover:shadow-lg transition-all group">
               <Banknote className="w-6 h-6 text-slate-300 group-hover:text-brand-green" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900">Efectivo</span>
            </button>
            <button className="flex flex-col items-center justify-center gap-2 p-5 bg-white rounded-huge border border-slate-200 hover:border-brand-green hover:shadow-lg transition-all group">
               <CreditCard className="w-6 h-6 text-slate-300 group-hover:text-brand-green" />
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-900">Tarjeta</span>
            </button>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="flex-1 py-5 bg-brand-green hover:bg-emerald-600 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-black rounded-huge shadow-xl shadow-brand-green/30 flex items-center justify-center gap-2 transition-all active:scale-95 uppercase tracking-widest text-xs italic"
            >
               Finalizar Venta
            </button>
          </div>
          
          {showPrinterConfig && (
            <div className="flex items-center gap-3 p-4 bg-black rounded-3xl shadow-xl border border-slate-800 group">
              <div className="p-2 bg-brand-green rounded-xl group-hover:animate-pulse shadow-lg shadow-brand-green/20">
                <Printer className="w-4 h-4 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-brand-green uppercase tracking-widest italic">Doble Impresión Activa</span>
                <span className="text-[8px] text-slate-500 uppercase font-bold tracking-tighter">Ticket Cliente + Orden de Entrega</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
