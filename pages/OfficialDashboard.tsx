import React, { useState } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useAppStore } from '../store/useAppStore';
import { TRANSLATIONS } from '../utils/translations';
import { MarketItem } from '../types';

export const OfficialDashboard: React.FC = () => {
  const { marketData, updateMarketItem, bulkUpdateMarketItems, language } = useAppStore();
  const t = TRANSLATIONS[language];

  // Local State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<number>(0);
  
  // Feature State
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{isOpen: boolean, id: string | null, price: number}>({ isOpen: false, id: null, price: 0 });
  const [statusMap, setStatusMap] = useState<Record<string, 'idle' | 'loading' | 'success' | 'error'>>({});
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});

  // Bulk Edit State
  const [bulkValues, setBulkValues] = useState<Record<string, number>>({});

  const handleEditClick = (item: MarketItem) => {
    setEditingId(item.id);
    setTempPrice(item.price);
    // Clear previous errors/status
    setErrorMap(prev => ({ ...prev, [item.id]: '' }));
    setStatusMap(prev => ({ ...prev, [item.id]: 'idle' }));
  };

  const handleInitiateSave = (id: string) => {
    // Validation
    if (tempPrice < 0) {
        setErrorMap(prev => ({ ...prev, [id]: 'Price cannot be negative.' }));
        setStatusMap(prev => ({ ...prev, [id]: 'error' }));
        return;
    }

    setConfirmModal({ isOpen: true, id, price: tempPrice });
  };

  const confirmSave = () => {
    const { id, price } = confirmModal;
    if (!id) return;

    setStatusMap(prev => ({ ...prev, [id]: 'loading' }));
    
    // Simulate API delay
    setTimeout(() => {
        const oldItem = marketData.find(i => i.id === id);
        const oldPrice = oldItem?.price || 0;
        const change = price - oldPrice;
        const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';

        updateMarketItem(id, {
            price: price,
            change: change !== 0 ? change : oldItem?.change,
            trend: trend,
            // Add new price to history for the sparkline to update
            history: [...(oldItem?.history || []).slice(1), price] 
        });

        setStatusMap(prev => ({ ...prev, [id]: 'success' }));
        setEditingId(null);
        setConfirmModal({ isOpen: false, id: null, price: 0 });

        // Reset success status after animation
        setTimeout(() => {
            setStatusMap(prev => ({ ...prev, [id]: 'idle' }));
        }, 2000);
    }, 800);
  };

  // Bulk Operations
  const openBulkModal = () => {
      const initialValues: Record<string, number> = {};
      marketData.forEach(item => initialValues[item.id] = item.price);
      setBulkValues(initialValues);
      setBulkModalOpen(true);
  };

  const handleBulkSave = () => {
      const updates = Object.entries(bulkValues).map(([id, price]) => ({ id, price }));
      bulkUpdateMarketItems(updates);
      setBulkModalOpen(false);
      // Show global success toast (mocked)
      alert("Bulk update broadcasted successfully!");
  };

  return (
    <div className="space-y-6 pb-24 md:pb-8 animate-fade-in text-slate-900 dark:text-white relative">
      {/* Header Card */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
        <div className="relative z-10">
            <h2 className="text-3xl font-black mb-2">{t.official_panel}</h2>
            <p className="text-slate-400">Control center for APMC Ludhiana</p>
        </div>
        <span className="material-symbols-outlined absolute top-1/2 -translate-y-1/2 right-8 text-[120px] opacity-10 pointer-events-none">admin_panel_settings</span>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">
         <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h3 className="text-xl font-bold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">edit_document</span>
                Manage Prices
            </h3>
            <div className="flex gap-2 w-full md:w-auto">
                <button 
                    onClick={openBulkModal}
                    className="flex-1 md:flex-none px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                    <span className="material-symbols-outlined text-sm">checklist</span>
                    Bulk Update
                </button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
                <thead className="bg-slate-50 dark:bg-slate-900/50 text-xs font-black uppercase tracking-wider text-slate-500">
                    <tr>
                        <th className="p-4 w-16">Status</th>
                        <th className="p-4">{t.commodity}</th>
                        <th className="p-4 w-48">7-Day Trend</th>
                        <th className="p-4">{t.price} (₹/qtl)</th>
                        <th className="p-4">{t.trend}</th>
                        <th className="p-4 text-right">{t.actions}</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {marketData.map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                            {/* Status Indicator */}
                            <td className="p-4 text-center">
                                {statusMap[item.id] === 'loading' && (
                                    <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto"></div>
                                )}
                                {statusMap[item.id] === 'success' && (
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse-slow mx-auto shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                                )}
                                {statusMap[item.id] === 'error' && (
                                    <div className="w-3 h-3 rounded-full bg-red-500 mx-auto" title="Update failed"></div>
                                )}
                                {statusMap[item.id] === 'idle' && (
                                    <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 mx-auto opacity-50"></div>
                                )}
                            </td>

                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <div className="font-bold">{item.name}</div>
                                        <div className="text-xs text-slate-400">{item.subName}</div>
                                    </div>
                                </div>
                                {errorMap[item.id] && (
                                    <p className="text-[10px] text-red-500 font-bold mt-1 animate-fade-in">
                                        ⚠️ {errorMap[item.id]}
                                    </p>
                                )}
                            </td>

                            {/* Sparkline Chart */}
                            <td className="p-4">
                                <div className="h-10 w-32">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={item.history.map((val, idx) => ({ idx, val }))}>
                                            <Line 
                                                type="monotone" 
                                                dataKey="val" 
                                                stroke={item.trend === 'up' ? '#059467' : '#ef4444'} 
                                                strokeWidth={2} 
                                                dot={false} 
                                                isAnimationActive={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </td>

                            <td className="p-4">
                                {editingId === item.id ? (
                                    <input 
                                        type="number" 
                                        value={tempPrice}
                                        onChange={(e) => setTempPrice(Number(e.target.value))}
                                        className={`w-32 px-3 py-2 border-2 rounded-lg font-bold bg-white text-slate-900 focus:outline-none ${errorMap[item.id] ? 'border-red-500' : 'border-primary'}`}
                                        autoFocus
                                    />
                                ) : (
                                    <span className="font-bold text-lg">₹{item.price.toLocaleString()}</span>
                                )}
                            </td>

                            <td className="p-4">
                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                                    item.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                }`}>
                                    <span className="material-symbols-outlined text-sm">
                                        {item.trend === 'up' ? 'trending_up' : 'trending_down'}
                                    </span>
                                    {item.change !== 0 ? (item.trend === 'up' ? 'Rising' : 'Falling') : 'Stable'}
                                </span>
                            </td>

                            <td className="p-4 text-right">
                                {editingId === item.id ? (
                                    <div className="flex justify-end gap-2">
                                        <button 
                                            onClick={() => handleInitiateSave(item.id)}
                                            className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark shadow-md active:scale-95 transition-transform"
                                            title="Save"
                                        >
                                            <span className="material-symbols-outlined text-lg">check</span>
                                        </button>
                                        <button 
                                            onClick={() => {
                                                setEditingId(null);
                                                setErrorMap(prev => ({ ...prev, [item.id]: '' }));
                                                setStatusMap(prev => ({ ...prev, [item.id]: 'idle' }));
                                            }}
                                            className="p-2 bg-slate-200 text-slate-600 rounded-lg hover:bg-slate-300 active:scale-95 transition-transform"
                                            title="Cancel"
                                        >
                                            <span className="material-symbols-outlined text-lg">close</span>
                                        </button>
                                    </div>
                                ) : (
                                    <button 
                                        onClick={() => handleEditClick(item)}
                                        className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-primary hover:text-white rounded-lg text-sm font-bold transition-colors shadow-sm"
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
         </div>
      </div>

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
              <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-6 max-w-sm w-full border border-slate-200 dark:border-slate-700">
                  <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mb-4 mx-auto">
                      <span className="material-symbols-outlined text-2xl">warning</span>
                  </div>
                  <h3 className="text-xl font-black text-center mb-2">Confirm Update</h3>
                  <p className="text-center text-slate-500 text-sm mb-6">
                      Are you sure you want to update the price to <span className="font-bold text-slate-900 dark:text-white">₹{confirmModal.price}</span>? This will instantly reflect on all farmer dashboards.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                      <button 
                        onClick={() => setConfirmModal({isOpen: false, id: null, price: 0})}
                        className="px-4 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200"
                      >
                          Cancel
                      </button>
                      <button 
                        onClick={confirmSave}
                        className="px-4 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark"
                      >
                          Confirm
                      </button>
                  </div>
              </div>
          </div>
      )}

      {/* Bulk Update Modal */}
      {bulkModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/60 backdrop-blur-md p-0 md:p-4 animate-fade-in">
              <div className="bg-white dark:bg-slate-800 rounded-t-3xl md:rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col">
                  <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 rounded-t-3xl">
                      <div>
                          <h3 className="text-xl font-black">Bulk Price Update</h3>
                          <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Edit multiple commodities</p>
                      </div>
                      <button onClick={() => setBulkModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                          <span className="material-symbols-outlined">close</span>
                      </button>
                  </div>
                  
                  <div className="overflow-y-auto p-6 flex-1">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {marketData.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 p-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30">
                                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xl">
                                      {item.icon}
                                  </div>
                                  <div className="flex-1">
                                      <div className="font-bold text-sm">{item.name}</div>
                                      <div className="text-xs text-slate-400">{item.subName}</div>
                                  </div>
                                  <input 
                                    type="number"
                                    value={bulkValues[item.id] || 0}
                                    onChange={(e) => setBulkValues(prev => ({ ...prev, [item.id]: Number(e.target.value) }))}
                                    className="w-24 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-600 rounded-lg font-bold text-right focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                                  />
                              </div>
                          ))}
                      </div>
                  </div>

                  <div className="p-6 border-t border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-3xl">
                      <div className="flex justify-end gap-3">
                           <button 
                                onClick={() => setBulkModalOpen(false)}
                                className="px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50"
                           >
                               Discard
                           </button>
                           <button 
                                onClick={handleBulkSave}
                                className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark shadow-lg shadow-primary/20 flex items-center gap-2"
                           >
                               <span className="material-symbols-outlined">broadcast_on_personal</span>
                               Broadcast All
                           </button>
                      </div>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
