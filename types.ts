
export type Language = 'en' | 'hi' | 'mr' | 'pa' | 'gu' | 'bn';
export type UserRole = 'farmer' | 'official' | null;

export interface MarketItem {
  id: string;
  name: string;
  subName: string;
  price: number;
  unit: string;
  change: number;
  trend: 'up' | 'down' | 'stable';
  icon: string;
  isLive?: boolean;
  history: number[]; // For sparkline charts
  category: 'grains' | 'vegetables' | 'pulses' | 'commercial';
}

export interface NavItem {
  id: string;
  labelKey: string;
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  prev: number;
}
