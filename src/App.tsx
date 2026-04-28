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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="flex h-screen bg-bg-light overflow-hidden font-sans relative">
      <Sidebar 
        currentRole={currentRole} 
        activeView={activeView} 
        setActiveView={(view) => {
          setActiveView(view);
          setIsSidebarOpen(false);
        }} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      
      <main className="flex-1 flex flex-col min-w-0 relative h-screen overflow-hidden">
        <Header 
          currentRole={currentRole} 
          setRole={handleRoleChange} 
          showPrinterConfig={showPrinterConfig}
          setShowPrinterConfig={setShowPrinterConfig}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        
        <div className="flex-1 overflow-hidden relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeView + currentRole}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global UI Decoration (Subtle Brand Touch) */}
        <div className="absolute bottom-0 right-0 p-4 pointer-events-none opacity-40">
          <span className="text-[9px] font-black text-brand-green uppercase tracking-[0.3em] bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 shadow-sm italic">
            Minisuper del Valle • Enterprise v2.0
          </span>
        </div>
      </main>
    </div>
  );
}
