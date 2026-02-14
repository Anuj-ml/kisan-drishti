
import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { TRANSLATIONS } from '../utils/translations';

export const Dashboard: React.FC = () => {
  const { marketData, language, setActiveTab } = useAppStore();
  const t = TRANSLATIONS[language];

  // Calculator State
  const [selectedCropId, setSelectedCropId] = useState(marketData[0].id);
  const [yieldAmount, setYieldAmount] = useState('');
  const [calculatedProfit, setCalculatedProfit] = useState<number | null>(null);

  const handleCalculate = () => {
    const crop = marketData.find(c => c.id === selectedCropId);
    if (crop && yieldAmount) {
        const total = crop.price * parseFloat(yieldAmount);
        setCalculatedProfit(total);
    }
  };

  const selectedCrop = marketData.find(c => c.id === selectedCropId);

  return (
    <div className="space-y-6 pb-24 md:pb-8 animate-fade-in">
      {/* Hero Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-primary/10 flex items-center justify-between">
            <div>
                <p className="text-xs font-bold text-primary/60 uppercase tracking-widest mb-1">{t.todays_date}</p>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white">Oct 24, 2023</h2>
            </div>
            <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-2xl">calendar_today</span>
            </div>
        </div>
        
        <div 
            onClick={() => setActiveTab('market')}
            className="bg-primary/5 p-5 rounded-2xl border border-primary/10 hover:border-primary/30 transition-colors cursor-pointer group hover:bg-primary/10"
        >
            <div className="flex items-center gap-2 text-primary mb-2">
                <span className="material-symbols-outlined text-xl group-hover:scale-110 transition-transform">storefront</span>
                <p className="text-[10px] font-black uppercase tracking-wider">{t.active_markets}</p>
            </div>
            <p className="text-2xl font-black text-primary">42 Live</p>
        </div>

        <div 
            onClick={() => setActiveTab('analytics')}
            className="bg-emerald-500 p-5 rounded-2xl shadow-lg shadow-emerald-500/20 text-white cursor-pointer hover:bg-emerald-600 transition-colors"
        >
             <div className="flex items-center gap-2 text-white/90 mb-2">
                <span className="material-symbols-outlined text-xl">trending_up</span>
                <p className="text-[10px] font-black uppercase tracking-wider">{t.market_trend}</p>
            </div>
            <p className="text-2xl font-black">↑ {t.rising}</p>
        </div>
      </section>

      {/* Live Market Prices Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">monitor_heart</span>
                {t.live_market}
            </h3>
            <button 
                onClick={() => setActiveTab('market')}
                className="text-xs font-bold text-primary px-3 py-1.5 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors flex items-center gap-1"
            >
                {t.view_all} <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {marketData.map((item) => {
                const isUp = item.trend === 'up';
                const colorClass = isUp ? 'text-primary' : 'text-red-500';
                const bgClass = isUp ? 'bg-primary' : 'bg-red-500';
                const borderClass = isUp ? 'border-primary' : 'border-red-500';

                return (
                    <div 
                        key={item.id} 
                        onClick={() => setActiveTab('market')}
                        className={`bg-white p-4 rounded-2xl shadow-sm border-l-4 ${borderClass} hover:shadow-md transition-shadow cursor-pointer`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-3xl filter drop-shadow-sm">{item.icon}</span>
                            <span className={`material-symbols-outlined ${colorClass}`}>
                                {isUp ? 'trending_up' : 'trending_down'}
                            </span>
                        </div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{item.name} ({item.subName})</p>
                        <p className="text-2xl font-black text-slate-800 mt-1">₹{item.price.toLocaleString()}</p>
                        
                        <div className={`flex items-center gap-2 mt-3 ${colorClass}`}>
                            <span className="text-xs font-bold">{isUp ? '+' : ''}₹{Math.abs(item.change)}</span>
                            <div className={`flex-1 h-1.5 ${bgClass}/20 rounded-full overflow-hidden`}>
                                <div className={`h-full ${bgClass} rounded-full`} style={{ width: isUp ? '75%' : '35%' }}></div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
      </section>

      {/* Profit Calculator Section (Functional) */}
      <section className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-3xl p-6 lg:p-8 shadow-2xl shadow-amber-500/20 text-white relative overflow-hidden transition-all duration-300">
         {/* Background Decoration */}
         <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-[180px] text-white opacity-10 pointer-events-none">calculate</span>

         <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
            <div>
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
                        <span className="material-symbols-outlined text-2xl">calculate</span>
                    </div>
                    <div>
                        <h3 className="font-black text-2xl leading-none">{t.profit_calculator}</h3>
                        <p className="text-white/80 text-xs font-bold uppercase tracking-widest mt-1">{t.calculate_profit}</p>
                    </div>
                </div>
                
                {/* Result Display */}
                {calculatedProfit !== null && (
                    <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-2xl p-4 mt-4 animate-fade-in">
                        <p className="text-xs font-bold uppercase tracking-widest text-white/80">{t.total_profit}</p>
                        <p className="text-4xl font-black mt-1">₹{calculatedProfit.toLocaleString()}</p>
                        <p className="text-sm text-white/90 mt-1">Based on ₹{selectedCrop?.price}/qtl</p>
                    </div>
                )}
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 space-y-4 shadow-inner">
                <div>
                    <label className="block text-white/80 text-[10px] font-black uppercase tracking-widest mb-1.5 ml-1">{t.select_crop}</label>
                    <div className="relative">
                        <select 
                            value={selectedCropId}
                            onChange={(e) => setSelectedCropId(e.target.value)}
                            className="w-full bg-black/20 border-transparent text-white rounded-xl py-3 px-4 focus:ring-2 focus:ring-white/50 focus:border-transparent appearance-none font-bold"
                        >
                            {marketData.map(crop => (
                                <option key={crop.id} value={crop.id} className="bg-slate-800">
                                    {crop.name} (₹{crop.price}/q)
                                </option>
                            ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">expand_more</span>
                    </div>
                </div>
                <div>
                    <label className="block text-white/80 text-[10px] font-black uppercase tracking-widest mb-1.5 ml-1">{t.yield}</label>
                    <input 
                        type="number" 
                        value={yieldAmount}
                        onChange={(e) => setYieldAmount(e.target.value)}
                        placeholder="0.00" 
                        className="w-full bg-white text-slate-900 rounded-xl py-3 px-4 text-xl font-black placeholder:text-slate-300 focus:ring-2 focus:ring-amber-300 border-none"
                    />
                </div>
                <button 
                    onClick={handleCalculate}
                    className="w-full bg-primary text-white py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-primary-dark active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                >
                    <span>{t.calculate}</span>
                    <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
            </div>
         </div>
      </section>
    </div>
  );
};
