import React from 'react';
import { NavItem } from '../types';
import { useAppStore } from '../store/useAppStore';
import { TRANSLATIONS } from '../utils/translations';

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', labelKey: 'dashboard', icon: 'home' },
  { id: 'market', labelKey: 'markets', icon: 'storefront' },
  { id: 'tools', labelKey: 'tools', icon: 'calculate' },
  { id: 'analytics', labelKey: 'analytics', icon: 'trending_up' },
  { id: 'profile', labelKey: 'profile', icon: 'person' },
];

export const BottomNav: React.FC = () => {
  const { language, activeTab, setActiveTab } = useAppStore();
  const t = TRANSLATIONS[language];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-primary/10 px-4 py-2 pb-safe md:hidden">
      <div className="flex justify-between items-end">
        {NAV_ITEMS.map((item, index) => {
           if (index === 2) {
               return (
                   <div key={item.id} className="relative -top-5">
                       <button 
                         onClick={() => setActiveTab(item.id)}
                         className="bg-primary text-white w-14 h-14 rounded-full shadow-xl shadow-primary/40 border-4 border-bg-light flex items-center justify-center transform transition-transform active:scale-90 juicy-click">
                           <span className="material-symbols-outlined text-3xl">add</span>
                       </button>
                   </div>
               )
           }
           const isActive = activeTab === item.id;
           return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-2 transition-colors ${isActive ? 'text-primary' : 'text-slate-400 hover:text-slate-600'}`}
            >
              <span className={`material-symbols-outlined ${isActive ? 'filled' : ''}`}>{item.icon}</span>
              <span className="text-[10px] font-black uppercase tracking-widest">{t[item.labelKey] || item.labelKey}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export const Sidebar: React.FC = () => {
  const { language, activeTab, setActiveTab } = useAppStore();
  const t = TRANSLATIONS[language];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-primary/10 h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <div className="p-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Main Menu</div>
        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary/10 text-primary border-l-4 border-primary' 
                    : 'text-slate-500 hover:bg-slate-50 hover:text-primary'
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                {t[item.labelKey] || item.labelKey}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-primary/5">
         <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-4 text-white shadow-lg shadow-primary/20">
            <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined">psychology</span>
                <span className="font-bold text-sm">{t.expert_advice}</span>
            </div>
            <p className="text-xs text-white/80 mb-3">Get 24/7 AI-powered farming assistance.</p>
            <button 
                onClick={() => alert("ChatBot Interface Coming Soon!")}
                className="w-full bg-white text-primary py-2 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors"
            >
                {t.chat_now}
            </button>
         </div>
      </div>
    </aside>
  );
};