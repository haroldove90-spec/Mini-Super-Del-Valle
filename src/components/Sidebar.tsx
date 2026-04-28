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
        "fixed inset-y-0 left-0 lg:static w-72 bg-brand-green text-white flex flex-col h-screen shadow-2xl z-50 transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        <div className="p-6 border-b border-white/10 flex justify-center">
          <img 
            src="https://cossma.com.mx/delvalle.jpeg" 
            alt="Minisuper del Valle" 
            className="w-full h-auto object-contain max-h-24 brightness-0 invert"
            referrerPolicy="no-referrer"
          />
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-8">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-5 py-4 transition-all duration-200 group text-sm font-bold rounded-2xl",
                activeView === item.id
                  ? "bg-white/20 text-white border border-white/30 shadow-lg shadow-black/10"
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5",
                activeView === item.id ? "text-white" : "text-white/70 group-hover:text-white transition-colors"
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
          <div className="w-full flex flex-col items-center gap-3 p-5 bg-white/10 rounded-3xl border border-white/10 shadow-xl">
             <div className="flex gap-2">
                <Printer className="w-4 h-4 text-white" />
                <div className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
             </div>
             <p className="text-[9px] font-black text-white/60 uppercase tracking-widest text-center leading-tight italic">
               Terminal <br /> <span className="text-white">Sucursal Valle</span>
             </p>
          </div>
        </div>

        <div className="p-6 border-t border-white/10 bg-black/5 backdrop-blur-md">
          <div className="p-4 rounded-2xl flex items-center gap-4 bg-white/10 border border-white/10">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white font-black shadow-inner border border-white/20 italic">
              {currentRole[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-black text-white tracking-tight italic uppercase">{currentRole}</p>
              <div className="flex items-center gap-1.5 mt-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                 <p className="text-[10px] text-white/80 font-black uppercase tracking-widest">En Línea</p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
