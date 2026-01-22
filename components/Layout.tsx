
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: string;
  onViewChange: (view: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onViewChange }) => {
  const navItems = [
    { id: 'projects', label: 'Projetos', icon: '🔗' },
    { id: 'overview', label: 'Processo & Contexto', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col antialiased">
      {/* Top Navigation - Sticky on Desktop, Relative (Scrolls) on Mobile */}
      <header className="relative md:sticky md:top-0 z-30 w-full bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 pt-6 pb-4">
          {/* Brand Identity Area */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-14 h-14 bg-[#4C4DDC] rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-100">
              <svg className="w-8 h-8" viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 28.5C9.5 23.2533 13.7533 19 19 19H28.5V38H19C13.7533 38 9.5 33.7467 9.5 28.5Z" fill="white"/>
                <path d="M0 9.5C0 4.25329 4.25329 0 9.5 0H19V19H9.5C4.25329 19 0 14.7467 0 9.5Z" fill="white"/>
                <path d="M0 28.5C0 23.2533 4.25329 19 9.5 19H19V38H9.5C4.25329 38 0 33.7467 0 28.5Z" fill="white"/>
                <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="white"/>
                <path d="M19 0H28.5C33.7467 0 38 4.25329 38 9.5C38 14.7467 33.7467 19 28.5 19H19V0Z" fill="white"/>
              </svg>
            </div>
            <div>
              <h1 className="text-[#0F172A] font-bold text-2xl leading-none tracking-tight">Cidade Conectada</h1>
              <p className="text-[#64748B] text-base font-medium mt-1">Design Project Hub</p>
            </div>
          </div>

          {/* Tab Navigation Area */}
          <div className="inline-flex p-1.5 bg-[#F1F5F9] rounded-2xl border border-slate-100">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`px-8 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-white text-[#4C4DDC] shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-slate-100'
                    : 'text-[#475569] hover:text-[#0F172A]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-12">
        <div className="max-w-7xl mx-auto px-6 py-8 md:px-10 md:py-12 lg:px-12">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
