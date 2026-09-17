import React from 'react';
import { Youtube } from 'lucide-react';

interface FooterProps {
  t: any;
}

const Footer: React.FC<FooterProps> = ({ t }) => {
  return (
    <footer className="bg-[#030b19] border-t border-[#13459e]/30 mt-16 py-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        
        {/* Brand & Slogan */}
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-2 mb-3 gap-2">
            <img src="/logo.png" alt="Embedded EG Logo" className="h-8 md:h-10 object-contain" onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.querySelector('.fallback-logo')?.classList.remove('hidden');
            }} />
            <div className="fallback-logo hidden w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-lg">
              EG
            </div>
            <h2 className="text-xl font-bold text-white tracking-wide">Embedded EG</h2>
          </div>
          <p className="text-blue-200 text-sm">{t.learnMore}</p>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center md:items-end">
          <h3 className="text-white font-semibold mb-4">{t.followUs}</h3>
          <div className="flex flex-wrap justify-center md:justify-end gap-4">
            <a href="https://www.youtube.com/@Embedded_EG" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500 transition-colors" title="YouTube">
              <Youtube size={24} strokeWidth={2} />
            </a>
            <a href="https://www.facebook.com/share/19cz7KTrXC/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-500 transition-colors" title="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com/embedded_eg/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-500 transition-colors" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
            <a href="https://www.tiktok.com/@embedded_eg?_r=1&_t=ZS-99oWBdnsx3g" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" title="TikTok">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/mohamed-adel-375908392?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" title="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://t.me/embedded_eg" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors" title="Telegram">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
            </a>
            <a href="https://embedded-eg-academy.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-400 transition-colors" title="Academy Website">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-[#13459e]/20 text-center text-xs text-gray-500">
        {t.rights}
      </div>
    </footer>
  );
};

export default Footer;
