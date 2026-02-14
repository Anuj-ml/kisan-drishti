import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MarketItem, Language, UserRole } from '../types';
import { MARKET_DATA } from '../constants';

interface AppState {
  marketData: MarketItem[];
  language: Language;
  userRole: UserRole;
  voiceActive: boolean;
  activeTab: string;
  searchQuery: string;
  
  // Actions
  setLanguage: (lang: Language) => void;
  setUserRole: (role: UserRole) => void;
  updateMarketItem: (id: string, updates: Partial<MarketItem>) => void;
  bulkUpdateMarketItems: (updates: {id: string, price: number}[]) => void;
  setVoiceActive: (active: boolean) => void;
  resetMarketData: () => void;
  setActiveTab: (tab: string) => void;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      marketData: MARKET_DATA,
      language: 'en',
      userRole: null, 
      voiceActive: false,
      activeTab: 'dashboard',
      searchQuery: '',

      setLanguage: (lang) => set({ language: lang }),
      setUserRole: (role) => set({ userRole: role }),
      
      updateMarketItem: (id, updates) => set((state) => ({
        marketData: state.marketData.map((item) => 
          item.id === id ? { ...item, ...updates } : item
        ),
      })),

      bulkUpdateMarketItems: (updates) => set((state) => {
        // Explicitly cast to [string, number] tuple so Map infers types correctly
        const updateMap = new Map<string, number>(updates.map(u => [u.id, u.price] as [string, number]));
        return {
          marketData: state.marketData.map((item) => {
            if (updateMap.has(item.id)) {
                const newPrice = updateMap.get(item.id)!;
                const change = newPrice - item.price;
                const trend = change > 0 ? 'up' : change < 0 ? 'down' : 'stable';
                return { ...item, price: newPrice, change, trend };
            }
            return item;
          })
        };
      }),

      setVoiceActive: (active) => set({ voiceActive: active }),
      resetMarketData: () => set({ marketData: MARKET_DATA }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setSearchQuery: (query) => set({ searchQuery: query }),
    }),
    {
      name: 'kisan-drishti-storage', 
      partialize: (state) => ({ 
        marketData: state.marketData,
        language: state.language,
        userRole: state.userRole 
        // We don't persist activeTab or searchQuery so they reset on reload
      }),
    }
  )
);