import React from 'react';
import { useAppStore } from '../store/useAppStore';
import { AVATAR_URL } from '../constants';
import { TRANSLATIONS } from '../utils/translations';
import { Language } from '../types';

export const Header: React.FC = () => {
  const { userRole, setUserRole, language, setLanguage, setVoiceActive, searchQuery, setSearchQuery, setActiveTab } = useAppStore();
  const t = TRANSLATIONS[language];

  const languages: {code: Language, label: string}[] = [
      { code: 'en', label: 'EN' },
      { code: 'hi', label: 'हिं' },
      { code: 'mr', label: 'म' },
      { code: 'pa', label: 'ਪੰ' },
      { code: 'gu', label: 'ગુ' },
      { code: 'bn', label: 'বা' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-primary/10 px-4 py-3 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo Area */}
        <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => {
                if(userRole) setActiveTab('dashboard');
                else setUserRole(null);
            }}
        >
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
             <span className="material-symbols-outlined">eco</span>
          </div>
          <h1 className="text-primary font-black text-xl tracking-tighter leading-none hidden sm:block uppercase">
            {t.app_name}
          </h1>
          <h1 className="text-primary font-black text-xl tracking-tighter leading-none sm:hidden">KD</h1>
        </div>

        {/* Search Bar (Hidden on small mobile) */}
        {userRole === 'farmer' && (
            <div className="hidden md:flex flex-1 max-w-md mx-4">
                <div className="relative w-full group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors">search</span>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (e.target.value.length > 0 && useAppStore.getState().activeTab !== 'market') {
                                // setActiveTab('market'); 
                            }
                        }}
                        placeholder={t.search_placeholder} 
                        className="w-full bg-primary/5 border-none rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                    />
                </div>
            </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3 ml-auto">
            {/* Language Toggle */}
            <div className="flex bg-primary/10 p-1 rounded-lg overflow-hidden">
                <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="bg-transparent text-primary text-xs font-bold border-none focus:ring-0 cursor-pointer py-1 px-2"
                >
                    {languages.map((lang) => (
                        <option key={lang.code} value={lang.code}>{lang.label}</option>
                    ))}
                </select>
            </div>
            
            {userRole === 'farmer' && (
                <button 
                    onClick={() => setVoiceActive(true)}
                    className="flex items-center gap-2 bg-primary text-white px-3 py-2 rounded-xl shadow-lg shadow-primary/20 active:scale-95 transition-transform hover:bg-primary-dark"
                >
                    <span className="material-symbols-outlined text-lg">mic</span>
                    <span className="text-xs font-bold uppercase tracking-wider hidden sm:block">Voice</span>
                </button>
            )}

            <div className="relative w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 cursor-pointer hover:border-primary transition-colors group">
                <img src={AVATAR_URL} alt="Profile" className="w-full h-full rounded-full object-cover" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                
                {/* Logout Dropdown Simulation */}
                <div className="absolute right-0 top-12 bg-white dark:bg-slate-800 shadow-xl rounded-xl p-2 hidden group-hover:block min-w-[150px] border border-slate-100 z-50">
                    <button 
                        onClick={() => setUserRole(null)} 
                        className="w-full text-left px-4 py-2 text-sm font-bold text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">logout</span>
                        {t.logout}
                    </button>
                </div>
            </div>
        </div>
      </div>
    </header>
  );
};
