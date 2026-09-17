import React from 'react';

interface HeaderProps {
  t: any;
}

const Header: React.FC<HeaderProps> = ({ t }) => {
  return (
    <header className="w-full bg-[#030b19] border-b border-[#13459e]/30 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3 gap-3">
          <img src="/logo.png" alt="Embedded EG Logo" className="h-10 md:h-12 object-contain" onError={(e) => {
            // Fallback if logo.png is not yet uploaded to /public
            e.currentTarget.style.display = 'none';
            e.currentTarget.parentElement?.querySelector('.fallback-logo')?.classList.remove('hidden');
          }} />
          <div className="fallback-logo hidden w-10 h-10 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]">
            EG
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">{t.brand}</h1>
            <p className="text-xs text-blue-300 hidden md:block">{t.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex space-x-6 text-sm text-blue-200">
            <a href="#" className="hover:text-white transition-colors">{t.designer}</a>
            <a href="#" className="hover:text-white transition-colors">{t.howItWorks}</a>
            <a href="#" className="hover:text-white transition-colors">{t.about}</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
