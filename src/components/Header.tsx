import { Printer, Menu, Search, X } from 'lucide-react';
import { UserRole } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface HeaderProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  showPrinterConfig: boolean;
  setShowPrinterConfig: (show: boolean) => void;
  toggleSidebar: () => void;
}

export default function Header({ currentRole, setRole, showPrinterConfig, setShowPrinterConfig, toggleSidebar }: HeaderProps) {
  return (
    <header className="h-20 lg:h-24 border-b border-slate-100 bg-white flex items-center justify-between px-6 lg:px-12 z-10 sticky top-0 shrink-0">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 p-1.5 rounded-huge border border-slate-100 shadow-inner">
          {Object.values(UserRole).map((role) => (
            <button
              key={role}
              onClick={() => setRole(role)}
              className={cn(
                "px-8 py-2 rounded-huge text-[10px] font-black uppercase tracking-[0.2em] transition-all italic",
                currentRole === role
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-900/20"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              )}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-6 lg:gap-10">
        {/* Printer Simulation Toggle */}
        <button 
          onClick={() => setShowPrinterConfig(!showPrinterConfig)}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-huge text-[10px] font-black uppercase tracking-widest transition-all italic",
            showPrinterConfig 
            ? 'bg-brand-green text-white shadow-xl shadow-brand-green/30' 
            : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
          )}
        >
          <Printer className="w-4 h-4" />
          <span>Doble Impresión {showPrinterConfig ? 'ON' : 'OFF'}</span>
        </button>

        <div className="hidden xs:flex items-center gap-5 pl-6 border-l border-slate-100">
          <div className="flex flex-col items-end leading-none">
            <span className="text-xs font-black text-slate-900 tracking-tight uppercase italic">{currentRole}</span>
            <div className="flex items-center gap-1.5 mt-1">
               <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
               <span className="text-[9px] text-brand-green font-black uppercase tracking-widest tracking-tighter">Conectado</span>
            </div>
          </div>
          <div className="w-12 h-12 bg-white rounded-2xl border-2 border-brand-green/20 shadow-xl overflow-hidden flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-gradient-to-tr from-brand-green to-slate-900 rounded-xl"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
