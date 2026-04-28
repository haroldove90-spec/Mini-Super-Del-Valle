import { useState } from 'react';
import { UserRole } from './types';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import POSView from './components/POSView';
import InventoryView from './components/InventoryView';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [currentRole, setRole] = useState<UserRole>(UserRole.ADMIN);
  const [activeView, setActiveView] = useState('dashboard');
  const [showPrinterConfig, setShowPrinterConfig] = useState(false);

  // Ensure that if role changes and the current view is not allowed, we switch to an allowed one
  const handleRoleChange = (role: UserRole) => {
    setRole(role);
    if (role === UserRole.CAJERO) {
      setActiveView('pos');
    } else if (role === UserRole.GERENTE && activeView === 'dashboard') {
      setActiveView('inventory');
    }
  };

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return currentRole === UserRole.ADMIN ? <DashboardView /> : <InventoryView />;
      case 'pos':
        return <POSView showPrinterConfig={showPrinterConfig} />;
      case 'inventory':
        return <InventoryView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar 
        currentRole={currentRole} 
        activeView={activeView} 
        setActiveView={setActiveView} 
      />
      
      <main className="flex-1 flex flex-col min-w-0 relative">
        <Header 
          currentRole={currentRole} 
          setRole={handleRoleChange} 
          showPrinterConfig={showPrinterConfig}
          setShowPrinterConfig={setShowPrinterConfig}
        />
        
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView + currentRole}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full w-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global UI Decoration (Subtle Premium Touch) */}
        <div className="absolute bottom-0 right-0 p-4 pointer-events-none opacity-20">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200">
            MiniSuper Pro v1.0.4 • Build 829
          </span>
        </div>
      </main>
    </div>
  );
}
