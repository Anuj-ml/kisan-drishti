import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { TRANSLATIONS } from '../utils/translations';

export const Market: React.FC = () => {
  const { marketData, language, searchQuery } = useAppStore();
  const t = TRANSLATIONS[language];
  const [filter, setFilter] = useState<'all' | 'grains' | 'vegetables' | 'pulses'>('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter Logic: Category + Global Search
  const filteredData = marketData.filter(item => {
    const matchesCategory = filter === 'all' || item.category === filter;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.subName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = () => {
      // Mock download logic
      const csvContent = "data:text/csv;charset=utf-8," 
        + "ID,Name,Price,Trend\n"
        + marketData.map(row => `${row.id},${row.name},${row.price},${row.trend}`).join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "mandi_prices_report.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
         <div>
            <h2 className="text-3xl font-black text-slate-900">{t.market_board}</h2>
            <p className="text-slate-500 font-medium">Real-time prices from 42 Mandis</p>
         </div>
         <div className="flex gap-2">
            {/* Mobile Filter Toggle */}
            <button 
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                className={`md:hidden px-4 py-2 border rounded-lg text-sm font-bold transition-colors ${isMobileFilterOpen ? 'bg-primary text-white border-primary' : 'bg-white border-slate-200 text-slate-600'}`}
            >
                {t.filter}
            </button>
            <button onClick={handleDownload} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">download</span>
                {t.download_report}
            </button>
         </div>
      </div>

      {/* Horizontal Scroll Chips (Desktop + Mobile when toggled) */}
      <div className={`flex gap-3 overflow-x-auto pb-2 no-scrollbar ${isMobileFilterOpen ? 'block' : 'hidden md:flex'}`}>
         {['all', 'grains', 'vegetables', 'pulses'].map((cat) => (
             <button 
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-bold transition-all ${
                    filter === cat 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-primary/50 hover:text-primary'
                }`}
             >
                {cat === 'all' ? 'All Crops' : cat.charAt(0).toUpperCase() + cat.slice(1)}
             </button>
         ))}
      </div>

      {/* Detailed List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="grid grid-cols-12 bg-slate-50 p-4 border-b border-slate-200 text-xs font-black text-slate-400 uppercase tracking-widest">
            <div className="col-span-5 md:col-span-4">{t.commodity}</div>
            <div className="col-span-4 md:col-span-3 text-right">{t.price}</div>
            <div className="col-span-3 md:col-span-2 text-right">{t.trend}</div>
            <div className="hidden md:block col-span-3 text-right">{t.actions}</div>
        </div>
        
        <div className="divide-y divide-slate-100">
            {filteredData.length === 0 ? (
                <div className="p-8 text-center text-slate-400 font-bold">
                    {searchQuery ? `No results found for "${searchQuery}"` : "No crops found in this category."}
                </div>
            ) : filteredData.map((item) => (
                <div key={item.id} className="grid grid-cols-12 p-4 items-center hover:bg-primary/5 transition-colors group cursor-pointer" onClick={() => alert(`Detailed view for ${item.name} coming soon.`)}>
                    <div className="col-span-5 md:col-span-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl shadow-inner">
                            {item.icon}
                        </div>
                        <div>
                            <h4 className="font-bold text-slate-900">{item.name}</h4>
                            <p className="text-xs text-slate-500 font-medium">{item.subName}</p>
                        </div>
                    </div>
                    
                    <div className="col-span-4 md:col-span-3 text-right">
                        <p className="font-bold text-slate-900 text-lg">₹{item.price.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">per {item.unit}</p>
                    </div>

                    <div className="col-span-3 md:col-span-2 flex justify-end">
                        <div className={`px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1 ${item.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            <span className="material-symbols-outlined text-sm">
                                {item.trend === 'up' ? 'trending_up' : 'trending_down'}
                            </span>
                            {item.change > 0 ? '+' : ''}{item.change}
                        </div>
                    </div>

                    <div className="hidden md:flex col-span-3 justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500" title="Analytics" onClick={(e) => { e.stopPropagation(); alert("Opening Analytics..."); }}>
                            <span className="material-symbols-outlined">analytics</span>
                         </button>
                         <button className="p-2 hover:bg-slate-200 rounded-lg text-slate-500" title="Set Alert" onClick={(e) => { e.stopPropagation(); alert("Price Alert Set!"); }}>
                            <span className="material-symbols-outlined">notifications</span>
                         </button>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};