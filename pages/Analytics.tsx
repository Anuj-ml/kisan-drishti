
import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { CHART_DATA } from '../constants';
import { useAppStore } from '../store/useAppStore';
import { TRANSLATIONS } from '../utils/translations';

export const Analytics: React.FC = () => {
  const { language } = useAppStore();
  const t = TRANSLATIONS[language];
  const [timeRange, setTimeRange] = useState<'1W' | '1M' | '1Y'>('1M');

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
         <h2 className="text-3xl font-black text-slate-900">{t.market_insights}</h2>
         <p className="text-slate-500 font-medium">{t.analyze_trends}</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-primary mb-2">
                <span className="material-symbols-outlined">trending_up</span>
                <span className="text-xs font-bold uppercase tracking-wider">{t.highest_growth}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">Onion</h3>
            <p className="text-green-600 font-bold text-sm mt-1">+12.5% {t.this_month}</p>
         </div>
         
         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 text-amber-500 mb-2">
                <span className="material-symbols-outlined">warning</span>
                <span className="text-xs font-bold uppercase tracking-wider">{t.volatility}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">Tomato</h3>
            <p className="text-amber-600 font-bold text-sm mt-1">High ±5.2%</p>
         </div>

         <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center gap-2 text-blue-500 mb-2">
                <span className="material-symbols-outlined">storefront</span>
                <span className="text-xs font-bold uppercase tracking-wider">{t.active_mandis}</span>
            </div>
            <h3 className="text-2xl font-black text-slate-900">1,240</h3>
            <p className="text-blue-600 font-bold text-sm mt-1">{t.across_states}</p>
         </div>
      </div>

      {/* Main Chart Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
         <div className="flex items-center justify-between mb-8">
            <div>
                <h3 className="text-xl font-bold text-slate-900">{t.price_trend}: Wheat</h3>
                <p className="text-xs text-slate-500 font-bold uppercase mt-1">{t.avg_price}</p>
            </div>
            <div className="flex bg-slate-100 p-1 rounded-lg">
                {(['1W', '1M', '1Y'] as const).map((range) => (
                    <button 
                        key={range}
                        onClick={() => setTimeRange(range)}
                        className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                            timeRange === range 
                            ? 'bg-white text-primary shadow-sm' 
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                    >
                        {range}
                    </button>
                ))}
            </div>
         </div>
         
         <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#059669" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#059669" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorPrev" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                        dy={10}
                    />
                    <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} 
                        tickFormatter={(val) => `₹${val}`}
                    />
                    <Tooltip 
                        contentStyle={{
                            backgroundColor: '#fff', 
                            borderRadius: '16px', 
                            border: 'none',
                            boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
                        }}
                        itemStyle={{ fontWeight: 'bold' }}
                        formatter={(value: number) => [`₹${value}`, '']}
                    />
                    <Legend 
                        iconType="circle" 
                        wrapperStyle={{ paddingTop: '20px' }}
                    />
                    <Area 
                        name={t.this_year}
                        type="monotone" 
                        dataKey="value" 
                        stroke="#059669" 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorValue)" 
                        animationDuration={1500}
                    />
                    <Area 
                        name={t.last_year}
                        type="monotone" 
                        dataKey="prev" 
                        stroke="#cbd5e1" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        fillOpacity={1} 
                        fill="url(#colorPrev)" 
                    />
                </AreaChart>
            </ResponsiveContainer>
         </div>
      </div>

      {/* Regional Variance Map Placeholder */}
      <div 
        onClick={() => alert("Interactive Heatmap coming soon! Currently gathering geolocation data.")}
        className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group cursor-pointer"
      >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-900/40 z-10 flex flex-col justify-center px-8">
             <h3 className="text-2xl font-black text-white mb-2">{t.geographic_heatmap}</h3>
             <p className="text-white/80 max-w-sm">Explore price variances across different districts with our interactive map view.</p>
             <button className="mt-4 w-fit px-6 py-2 bg-white text-slate-900 rounded-lg font-bold text-sm hover:bg-primary hover:text-white transition-colors">
                {t.view_map}
             </button>
          </div>
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOaRrOWHZVDQ86UtQArGm3VrmVY9QZUxEqn44Q_4VXEr5IhvNm30iPxfBudceo9uV93pG6u1wFj4yMkvHSmhiRcJF137K6g7hHodcp6IBMGrXFotqpc4e7e9TCuQxpI5J1n3lrIjWTm22aMyn9l3mQ0SyoOiuE5u6PJgat-lEM_JdB-HK2OJlKmnG92iO-VdFCrSf37Vofbw7pUNfyQfrtocU37OFnIKtD4WfqN1iJGbrEKfXeCFbAgq4qru5qtLgiTugoQW_W_MA" 
            alt="Map" 
            className="w-full h-48 object-cover grayscale opacity-50 group-hover:scale-105 transition-transform duration-700"
          />
      </div>
    </div>
  );
};
