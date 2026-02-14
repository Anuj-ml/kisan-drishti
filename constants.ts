import { MarketItem, ChartDataPoint } from './types';

export const MARKET_DATA: MarketItem[] = [
  {
    id: '1',
    name: 'WHEAT',
    subName: 'Kanak',
    price: 2050,
    unit: 'qtl',
    change: 50,
    trend: 'up',
    icon: '🌾',
    isLive: true,
    category: 'grains',
    history: [1980, 2000, 1990, 2010, 2020, 2040, 2050]
  },
  {
    id: '2',
    name: 'RICE',
    subName: 'Basmati',
    price: 3100,
    unit: 'qtl',
    change: -20,
    trend: 'down',
    icon: '🍚',
    isLive: true,
    category: 'grains',
    history: [3150, 3140, 3120, 3130, 3110, 3105, 3100]
  },
  {
    id: '3',
    name: 'MAIZE',
    subName: 'Makka',
    price: 1820,
    unit: 'qtl',
    change: 15,
    trend: 'up',
    icon: '🌽',
    isLive: true,
    category: 'grains',
    history: [1780, 1790, 1800, 1810, 1805, 1815, 1820]
  },
  {
    id: '4',
    name: 'COTTON',
    subName: 'Kapas',
    price: 7450,
    unit: 'qtl',
    change: -110,
    trend: 'down',
    icon: '☁️',
    isLive: true,
    category: 'commercial',
    history: [7600, 7580, 7550, 7500, 7480, 7460, 7450]
  },
  {
    id: '5',
    name: 'ONION',
    subName: 'Nashik Red',
    price: 1400,
    unit: 'qtl',
    change: 200,
    trend: 'up',
    icon: '🧅',
    isLive: true,
    category: 'vegetables',
    history: [1100, 1150, 1200, 1250, 1300, 1350, 1400]
  },
  {
    id: '6',
    name: 'TOMATO',
    subName: 'Desi',
    price: 850,
    unit: 'qtl',
    change: -50,
    trend: 'down',
    icon: '🍅',
    isLive: true,
    category: 'vegetables',
    history: [950, 940, 920, 900, 880, 860, 850]
  },
  {
    id: '7',
    name: 'TUR DAL',
    subName: 'Arhar',
    price: 6200,
    unit: 'qtl',
    change: 0,
    trend: 'stable',
    icon: '🥘',
    isLive: true,
    category: 'pulses',
    history: [6180, 6190, 6200, 6200, 6200, 6210, 6200]
  }
];

export const CHART_DATA: ChartDataPoint[] = [
  { name: 'Jan', value: 2100, prev: 2000 },
  { name: 'Feb', value: 2150, prev: 2050 },
  { name: 'Mar', value: 2080, prev: 2100 },
  { name: 'Apr', value: 2200, prev: 2150 },
  { name: 'May', value: 2350, prev: 2200 },
  { name: 'Jun', value: 2400, prev: 2250 },
  { name: 'Jul', value: 2450, prev: 2300 },
];

export const AVATAR_URL = "https://lh3.googleusercontent.com/aida-public/AB6AXuBG20E9Ru_tDmVA0tXBtPi2YL2YZthh3dxtATXKjzeetjwvovdP0jOZqc0otJxMm4gdG364SVOv0orpwzM3k3gZ6ApbNfwTFMU-sarVaxsEVNwNIe3SubA5FefJ_2k-7ggfU-WKEtzdKIQGbEdKRuf7XKmD5jZ0E8FeKc-EXbf2zFTDyNg9YnYzOUGjsI_VZEt_pIxs_QYVzUYVxFbyaEwRKwc2H8WvKj-y2aG68ZqvuyhNtsBzoSpuQzpljgYaD66ybOaMpZyHtx4";
