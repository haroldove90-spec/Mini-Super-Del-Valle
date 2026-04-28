import { LayoutDashboard, ShoppingCart, Package, Settings, Users, ArrowLeftRight } from 'lucide-react';
import { UserRole } from '../types';
import { cn } from '../lib/utils';

interface SidebarProps {
  currentRole: UserRole;
  activeView: string;
  setActiveView: (view: string) => void;
}

export default function Sidebar({ currentRole, activeView, setActiveView }: SidebarProps) {
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
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-screen shadow-xl">
      <div className="p-8 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
          <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
        </div>
        <span className="text-white font-bold text-xl tracking-tight uppercase">MINI<span className="text-emerald-400">SUPER</span></span>
      </div>

      <nav className="flex-1 px-4 space-y-2 mt-4">
        {filteredItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 group text-sm font-medium rounded-xl",
              activeView === item.id
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/5"
                : "text-slate-400 hover:text-white"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5",
              activeView === item.id ? "text-emerald-400" : "text-slate-500 group-hover:text-emerald-400 transition-colors"
            )} />
            <span className={cn(
              activeView === item.id && "italic uppercase tracking-wider font-semibold"
            )}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="p-6">
        <button className="w-full flex flex-col items-center gap-3 p-4 bg-slate-800 rounded-2xl border border-slate-700 hover:border-emerald-500 transition-all group">
          <div className="flex gap-2">
            <ShoppingCart className="w-4 h-4 text-emerald-400" />
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <span className="text-[10px] uppercase font-bold text-slate-300 tracking-widest text-center italic leading-tight">
            Doble Impresión<br />Activa
          </span>
        </button>
      </div>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800/50 p-4 rounded-xl flex items-center gap-3 border border-slate-700/50">
          <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold shadow-inner">
            {currentRole[0]}
          </div>
          <div>
            <p className="text-sm font-semibold text-white tracking-tight">{currentRole}</p>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
