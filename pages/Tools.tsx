
import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { TRANSLATIONS } from '../utils/translations';

export const Tools: React.FC = () => {
    const { language } = useAppStore();
    const t = TRANSLATIONS[language];
    const [activeTool, setActiveTool] = useState<string | null>(null);

    // State for calculators
    const [acres, setAcres] = useState<string>('');
    const [cropType, setCropType] = useState<string>('Wheat');
    
    const tools = [
        { id: 'profit', icon: 'calculate', name: t.profit_calculator, desc: t.tool_profit_desc, color: 'bg-emerald-50 text-primary' },
        { id: 'soil', icon: 'science', name: t.soil_health, desc: t.tool_soil_desc, color: 'bg-amber-50 text-amber-600' },
        { id: 'seed', icon: 'grass', name: t.seed_quantity, desc: t.tool_seed_desc, color: 'bg-blue-50 text-blue-600' },
        { id: 'weather', icon: 'partly_cloudy_day', name: t.weather_plan, desc: t.tool_weather_desc, color: 'bg-sky-50 text-sky-500' },
        { id: 'pest', icon: 'bug_report', name: t.pest_control, desc: t.tool_pest_desc, color: 'bg-rose-50 text-rose-500' },
        { id: 'irrigation', icon: 'opacity', name: t.irrigation, desc: t.tool_irrigation_desc, color: 'bg-indigo-50 text-indigo-500' },
    ];

    const renderToolContent = () => {
        switch(activeTool) {
            case 'seed':
                const seedResult = acres ? (parseFloat(acres) * (cropType === 'Wheat' ? 40 : 15)).toFixed(1) : 0;
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">{t.select_crop}</label>
                            <select 
                                value={cropType} 
                                onChange={(e) => setCropType(e.target.value)}
                                className="w-full border border-slate-200 rounded-xl p-3 font-medium bg-slate-50"
                            >
                                <option value="Wheat">Wheat (40kg/acre)</option>
                                <option value="Rice">Rice (15kg/acre)</option>
                                <option value="Maize">Maize (8kg/acre)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1">{t.enter_acres}</label>
                            <input 
                                type="number" 
                                value={acres}
                                onChange={(e) => setAcres(e.target.value)}
                                placeholder="0"
                                className="w-full border border-slate-200 rounded-xl p-3 font-medium focus:ring-2 focus:ring-primary/20 outline-none"
                            />
                        </div>
                        <div className="bg-primary/10 p-4 rounded-xl text-center">
                            <p className="text-sm font-bold text-primary/70 uppercase">{t.seed_needed}</p>
                            <p className="text-3xl font-black text-primary">{seedResult} kg</p>
                        </div>
                    </div>
                );
            case 'weather':
                return (
                    <div className="space-y-3">
                        <div className="flex items-center justify-between bg-sky-50 p-4 rounded-xl">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-4xl text-amber-500">sunny</span>
                                <div>
                                    <p className="font-bold text-slate-900">Today</p>
                                    <p className="text-xs text-slate-500">{t.sunny}</p>
                                </div>
                            </div>
                            <span className="text-2xl font-black text-slate-900">32°C</span>
                        </div>
                         <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-4xl text-sky-500">rainy</span>
                                <div>
                                    <p className="font-bold text-slate-900">Tomorrow</p>
                                    <p className="text-xs text-slate-500">{t.rainy}</p>
                                </div>
                            </div>
                            <span className="text-2xl font-black text-slate-900">28°C</span>
                        </div>
                        <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-4xl text-slate-400">cloud</span>
                                <div>
                                    <p className="font-bold text-slate-900">Wed</p>
                                    <p className="text-xs text-slate-500">{t.cloudy}</p>
                                </div>
                            </div>
                            <span className="text-2xl font-black text-slate-900">30°C</span>
                        </div>
                    </div>
                );
            case 'soil':
                return (
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-green-50 p-3 rounded-xl border border-green-100 text-center">
                            <p className="text-xs font-bold text-green-700">{t.nitrogen}</p>
                            <p className="text-xl font-black text-green-900">High</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-xl border border-red-100 text-center">
                            <p className="text-xs font-bold text-red-700">{t.phosphorus}</p>
                            <p className="text-xl font-black text-red-900">Low</p>
                        </div>
                        <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-center">
                            <p className="text-xs font-bold text-amber-700">{t.potassium}</p>
                            <p className="text-xl font-black text-amber-900">Med</p>
                        </div>
                         <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-center">
                            <p className="text-xs font-bold text-blue-700">pH Level</p>
                            <p className="text-xl font-black text-blue-900">6.5</p>
                        </div>
                    </div>
                );
            default:
                return <p className="text-center text-slate-500 py-4">Module loading... (Mock)</p>;
        }
    }

  return (
    <div className="space-y-6 pb-24 md:pb-8">
        <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h2 className="text-3xl font-black text-slate-900 mb-2">{t.farmer_tools}</h2>
            <p className="text-slate-600">{t.tools_subtitle}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {tools.map((tool) => (
                <button 
                    key={tool.id} 
                    onClick={() => setActiveTool(tool.id)}
                    className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/30 transition-all text-center group active:scale-95"
                >
                    <div className={`mb-4 w-16 h-16 flex items-center justify-center rounded-full ${tool.color} group-hover:scale-110 transition-transform`}>
                        <span className="material-symbols-outlined text-4xl">{tool.icon}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mb-1">{tool.name}</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide font-medium">{tool.desc}</p>
                </button>
            ))}
        </div>

        {/* Expert Advice CTA */}
        <div className="mt-8 bg-slate-900 rounded-2xl overflow-hidden relative p-8 text-white">
            <div className="relative z-10 max-w-lg">
                <h3 className="text-2xl font-black mb-2 text-primary">{t.need_expert_advice}</h3>
                <p className="text-slate-300 mb-6">Chat directly with agricultural scientists from leading universities.</p>
                <button 
                    onClick={() => alert("Connecting to Expert Network...")}
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-xl font-bold transition-colors"
                >
                    {t.start_consultation}
                </button>
            </div>
            <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
                <span className="material-symbols-outlined text-[200px]">psychology_alt</span>
            </div>
        </div>

        {/* Tool Modal */}
        {activeTool && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setActiveTool(null)}>
                <div className="bg-white rounded-3xl p-6 w-full max-w-sm shadow-2xl relative" onClick={e => e.stopPropagation()}>
                    <button 
                        onClick={() => setActiveTool(null)}
                        className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                    
                    <div className="text-center mb-6">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 ${tools.find(t => t.id === activeTool)?.color}`}>
                            <span className="material-symbols-outlined text-2xl">{tools.find(t => t.id === activeTool)?.icon}</span>
                        </div>
                        <h3 className="text-xl font-black text-slate-900">{tools.find(t => t.id === activeTool)?.name}</h3>
                        <p className="text-xs text-slate-500 font-bold uppercase">{tools.find(t => t.id === activeTool)?.desc}</p>
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                        {renderToolContent()}
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};
