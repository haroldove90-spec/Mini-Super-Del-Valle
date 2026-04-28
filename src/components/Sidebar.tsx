import { LayoutDashboard, ShoppingCart, Package, Settings, Users, ArrowLeftRight, Printer } from 'lucide-react';
import { UserRole } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentRole: UserRole;
  activeView: string;
  setActiveView: (view: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ currentRole, activeView, setActiveView, isOpen, setIsOpen }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: [UserRole.ADMIN] },
    { id: 'pos', label: 'Punto de Venta', icon: ShoppingCart, roles: [UserRole.ADMIN, UserRole.CAJERO] },
    { id: 'inventory', label: 'Inventario', icon: Package, roles: [UserRole.ADMIN, UserRole.GERENTE] },
    { id: 'transactions', label: 'Transacciones', icon: ArrowLeftRight, roles: [UserRole.ADMIN, UserRole.GERENTE] },
    { id: 'users', label: 'Personal', icon: Users, roles: [UserRole.ADMIN] },
    { id: 'settings', label: 'Configuración', icon: Settings, roles: [UserRole.ADMIN] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(currentRole));

  return (
    <>
      <div 
        className={cn(
          "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
      <aside className={cn(
        "fixed inset-y-0 left-0 lg:static w-72 bg-black text-slate-300 flex flex-col h-screen shadow-2xl z-50 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-8 flex items-center gap-3 border-b border-slate-900">
          <div className="w-10 h-10 bg-brand-green rounded-xl flex items-center justify-center shadow-lg shadow-brand-green/20">
            <div className="w-5 h-5 border-2 border-white rounded-md"></div>
          </div>
          <div>
            <span className="text-white font-black text-lg tracking-tight uppercase block leading-none">MINISUPER</span>
            <span className="text-brand-green font-bold text-xs uppercase tracking-[0.3em] block mt-1">Del Valle</span>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-5 py-4 transition-all duration-200 group text-sm font-bold rounded-2xl",
                activeView === item.id
                  ? "bg-brand-green/10 text-brand-green border border-brand-green/20 shadow-lg shadow-brand-green/5"
                  : "text-slate-500 hover:text-white"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                activeView === item.id ? "text-brand-green" : "text-slate-600 group-hover:text-brand-green transition-colors"
              )} />
              <span className={cn(
                activeView === item.id && "italic uppercase tracking-widest"
              )}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-6">
          <div className="w-full flex flex-col items-center gap-3 p-5 bg-slate-900 rounded-3xl border border-slate-800 shadow-xl">
             <div className="flex gap-2">
                <Printer className="w-4 h-4 text-brand-green" />
                <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
             </div>
             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-center leading-tight italic">
               Terminal <br /> <span className="text-white">Sucursal Valle</span>
             </p>
          </div>
        </div>

        <div className="p-6 border-t border-slate-900 bg-slate-900/20 backdrop-blur-md">
          <div className="p-4 rounded-2xl flex items-center gap-4 bg-black/40 border border-slate-900">
            <div className="w-12 h-12 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green font-black shadow-inner border border-brand-green/20 italic">
              {currentRole[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-black text-white tracking-tight italic uppercase">{currentRole}</p>
              <div className="flex items-center gap-1.5 mt-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
                 <p className="text-[10px] text-brand-green font-black uppercase tracking-widest">En Línea</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
