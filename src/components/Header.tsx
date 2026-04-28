import { Printer, Bell, Search, ChevronDown } from 'lucide-react';
import { UserRole } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface HeaderProps {
  currentRole: UserRole;
  setRole: (role: UserRole) => void;
  showPrinterConfig: boolean;
  setShowPrinterConfig: (show: boolean) => void;
}

export default function Header({ currentRole, setRole, showPrinterConfig, setShowPrinterConfig }: HeaderProps) {
  return (
    <header className="h-20 border-b border-slate-200 bg-white flex items-center justify-between px-8 z-10 shadow-sm">
      <div className="flex items-center gap-4 bg-slate-100 p-1 rounded-full border border-slate-200">
        {Object.values(UserRole).map((role) => (
          <button
            key={role}
            onClick={() => setRole(role)}
            className={cn(
              "px-6 py-1.5 rounded-full text-xs font-bold transition-all",
              currentRole === role
                ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                : "text-slate-500 hover:text-slate-700"
            )}
          >
            {role.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-8">
        {/* Printer Simulation Toggle */}
        <button 
          onClick={() => setShowPrinterConfig(!showPrinterConfig)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
            showPrinterConfig 
            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
          }`}
        >
          <Printer className="w-4 h-4" />
          Doble Impresión {showPrinterConfig ? 'ON' : 'OFF'}
        </button>

        <div className="h-8 w-px bg-slate-100" />

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end leading-none">
            <span className="text-xs font-bold text-slate-900 tracking-tight">Eduardo G.</span>
            <span className="text-[10px] text-emerald-600 font-bold uppercase mt-1">Online</span>
          </div>
          <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-emerald-600"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
