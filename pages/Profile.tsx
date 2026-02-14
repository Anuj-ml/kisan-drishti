
import React, { useState } from 'react';
import { AVATAR_URL } from '../constants';
import { useAppStore } from '../store/useAppStore';
import { TRANSLATIONS } from '../utils/translations';

export const Profile: React.FC = () => {
  const { setUserRole, language } = useAppStore();
  const t = TRANSLATIONS[language];
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden text-center p-8">
         <div className="relative inline-block">
             <div className="w-32 h-32 rounded-full p-1 bg-white border-4 border-primary mx-auto">
                 <img src={AVATAR_URL} alt="Profile" className="w-full h-full rounded-full object-cover" />
             </div>
             <button onClick={() => alert("Upload new photo")} className="absolute bottom-2 right-2 bg-primary text-white w-8 h-8 rounded-full flex items-center justify-center border-2 border-white cursor-pointer hover:bg-primary-dark shadow-md">
                <span className="material-symbols-outlined text-sm">edit</span>
             </button>
         </div>
         
         <h2 className="text-2xl font-black text-slate-900 mt-4">Rajesh Kumar</h2>
         <div className="flex items-center justify-center gap-2 text-slate-500 font-medium mb-1">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span>Ludhiana, Punjab</span>
         </div>
         <span className="inline-block bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Active Farmer</span>

         <div className="flex justify-center gap-2 mt-6">
             <div className="px-4 py-1.5 bg-slate-100 rounded-full text-slate-600 text-xs font-bold border border-slate-200">Wheat</div>
             <div className="px-4 py-1.5 bg-slate-100 rounded-full text-slate-600 text-xs font-bold border border-slate-200">Rice</div>
             <div className="px-4 py-1.5 bg-slate-100 rounded-full text-slate-600 text-xs font-bold border border-slate-200">Sugarcane</div>
         </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
             <div className="text-primary mb-2">
                 <span className="material-symbols-outlined">landscape</span>
             </div>
             <p className="text-3xl font-black text-slate-900">12.5</p>
             <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.total_acres}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
             <div className="text-primary mb-2">
                 <span className="material-symbols-outlined">monitoring</span>
             </div>
             <p className="text-3xl font-black text-slate-900">82%</p>
             <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.soil_health}</p>
          </div>
      </div>

      {/* Alerts Banner */}
      <div onClick={() => alert("Opening Alerts Center...")} className="bg-orange-50 border border-orange-100 p-5 rounded-2xl flex items-center justify-between cursor-pointer hover:bg-orange-100 transition-colors">
          <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                  <span className="material-symbols-outlined">warning</span>
              </div>
              <div>
                  <h4 className="font-bold text-slate-900">3 {t.active_alerts}</h4>
                  <p className="text-xs text-slate-500">Pest risk detected in Sector B</p>
              </div>
          </div>
          <span className="material-symbols-outlined text-orange-400">chevron_right</span>
      </div>

      {/* Settings List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
          <button 
            onClick={() => setNotifications(!notifications)}
            className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors"
          >
              <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <span className="material-symbols-outlined text-primary">notifications</span>
                  {t.notifications}
              </div>
              <div className={`w-10 h-6 rounded-full p-1 transition-colors ${notifications ? 'bg-primary' : 'bg-slate-300'}`}>
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${notifications ? 'translate-x-4' : ''}`}></div>
              </div>
          </button>
           <button onClick={() => alert("Scanning for sensors...")} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <span className="material-symbols-outlined text-primary">precision_manufacturing</span>
                  {t.linked_sensors}
              </div>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </button>
           <button onClick={() => alert("Opening Language Settings...")} className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3 text-slate-700 font-medium">
                  <span className="material-symbols-outlined text-primary">translate</span>
                  {t.app_language}
              </div>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
          </button>
      </div>

      <button 
        onClick={() => {
            if(confirm("Are you sure you want to logout?")) setUserRole(null);
        }}
        className="w-full py-4 text-red-500 font-bold text-sm bg-red-50 rounded-xl hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
      >
         <span className="material-symbols-outlined">logout</span>
         {t.logout}
      </button>
    </div>
  );
};
