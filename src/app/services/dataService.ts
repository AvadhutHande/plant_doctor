import { Field, ProfileData, WeatherData, CropMarketInfo, PriceDataPoint } from '../types';

// =============================================================================
// MOCK DATA
// =============================================================================

export const MOCK_FIELDS: Field[] = [
  { id: '1', name: 'North Field', size: '2.5 Acres', crop: 'Cotton', stage: 'Flowering' },
  { id: '2', name: 'South Plot', size: '1.2 Acres', crop: 'Wheat', stage: 'Sowing' },
  { id: '3', name: 'East Garden', size: '0.8 Acres', crop: 'Vegetables', stage: 'Harvesting' },
];

export const MOCK_PROFILE: ProfileData = {
  name: "Avadhut Rhande",
  farmerId: "MH-2024-8932",
  phone: "+91 7843072842",
  email: "avadhutrhande@gmail.com",
  village: "Umbraj No 1",
  pinCode: "412412",
  coordinates: { lat: 19.0760, lng: 72.8777 },
  totalLand: 45, // Guntha
  numFields: 3,
  irrigationType: 'Drip',
  waterAvailability: 'Medium',
  farmingExperience: 15,
  seasonalBudget: 50000,
  riskPreference: 'Balanced',
  preferredCrops: ['Cotton', 'Soybean', 'Wheat'],
  farmingType: 'Mixed',
  language: 'English',
  notificationsEnabled: true,
  activeCrops: 3,
  seasonEarnings: 125000,
};

export const CROP_DATA_MAP: Record<string, any> = {
  'Cotton': { daysSinceSowing: 45, expectedHarvest: '15 May 2026' },
  'Wheat': { daysSinceSowing: 30, expectedHarvest: '10 Apr 2026' },
  'Soybean': { daysSinceSowing: 85, expectedHarvest: '25 Feb 2026' }
};

export const MARKET_PRICE_DATA: PriceDataPoint[] = [
  { date: 'Sep', price: 5800 },
  { date: 'Oct', price: 5950 },
  { date: 'Nov', price: 6100 },
  { date: 'Dec', price: 6050 },
  { date: 'Jan', price: 6200 },
  { date: 'Feb', price: 6250 },
  { date: 'Mar', price: 6400 }
];

export const MANDI_PRICES = [
  { mandi: 'Solapur Mandi', price: 6250, change: '+12%', trend: 'up' },
  { mandi: 'Pune APMC', price: 6180, change: '+8%', trend: 'up' },
  { mandi: 'Latur Market', price: 6320, change: '+15%', trend: 'up' },
  { mandi: 'Sangli Mandi', price: 6090, change: '+5%', trend: 'up' },
  { mandi: 'Nashik APMC', price: 5980, change: '-2%', trend: 'down' }
];

export const OTHER_CROPS_MARKET = [
  { crop: 'Wheat', price: 2150, trend: '+8%', demand: 'High', trendDir: 'up' },
  { crop: 'Soybean', price: 4200, trend: '+12%', demand: 'High', trendDir: 'up' },
  { crop: 'Sugarcane', price: 3100, trend: '+5%', demand: 'Medium', trendDir: 'up' },
  { crop: 'Tomato', price: 1800, trend: '-3%', demand: 'Low', trendDir: 'down' },
  { crop: 'Onion', price: 2500, trend: '+15%', demand: 'High', trendDir: 'up' }
];

export const PRICE_PREDICTIONS = [
  { period: 'Next Week', price: '₹6,300 - ₹6,400', confidence: 85, trend: 'up' },
  { period: 'Next Month', price: '₹6,500 - ₹6,700', confidence: 72, trend: 'up' },
  { period: 'Harvest Season', price: '₹6,200 - ₹6,500', confidence: 68, trend: 'stable' }
];

// =============================================================================
// ENHANCED MARKET DATA FOR SEARCH & FILTER
// =============================================================================

export const AVAILABLE_CROPS = [
  'Cotton', 'Wheat', 'Soybean', 'Sugarcane', 'Rice', 'Onion', 'Tomato', 
  'Potato', 'Maize', 'Bajra', 'Jowar', 'Groundnut', 'Sunflower', 'Chilli',
  'Turmeric', 'Garlic', 'Gram', 'Tur', 'Moong', 'Urad'
];

export const AVAILABLE_STATES = [
  'Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh',
  'Gujarat', 'Rajasthan', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu',
  'Telangana', 'West Bengal', 'Bihar', 'Odisha'
];

export const MARKETS_BY_STATE: Record<string, string[]> = {
  'Maharashtra': ['Solapur Mandi', 'Pune APMC', 'Latur Market', 'Nashik APMC', 'Mumbai APMC', 'Aurangabad Mandi', 'Nagpur APMC', 'Kolhapur Market'],
  'Punjab': ['Ludhiana Mandi', 'Amritsar APMC', 'Jalandhar Market', 'Patiala Mandi'],
  'Haryana': ['Karnal Mandi', 'Hisar APMC', 'Rohtak Market', 'Panipat Mandi'],
  'Uttar Pradesh': ['Lucknow Mandi', 'Kanpur APMC', 'Varanasi Market', 'Meerut Mandi'],
  'Madhya Pradesh': ['Indore Mandi', 'Bhopal APMC', 'Jabalpur Market', 'Gwalior Mandi'],
  'Gujarat': ['Ahmedabad APMC', 'Surat Mandi', 'Rajkot Market', 'Vadodara APMC'],
  'Rajasthan': ['Jaipur Mandi', 'Jodhpur APMC', 'Kota Market', 'Udaipur Mandi'],
  'Karnataka': ['Bangalore APMC', 'Mysore Mandi', 'Hubli Market', 'Belgaum APMC'],
  'Andhra Pradesh': ['Vijayawada APMC', 'Guntur Mandi', 'Visakhapatnam Market'],
  'Tamil Nadu': ['Chennai APMC', 'Coimbatore Mandi', 'Madurai Market'],
  'Telangana': ['Hyderabad APMC', 'Warangal Mandi', 'Karimnagar Market'],
  'West Bengal': ['Kolkata APMC', 'Siliguri Mandi', 'Durgapur Market'],
  'Bihar': ['Patna Mandi', 'Muzaffarpur APMC', 'Bhagalpur Market'],
  'Odisha': ['Bhubaneswar APMC', 'Cuttack Mandi', 'Rourkela Market']
};

// Comprehensive market price database
export const COMPREHENSIVE_MARKET_DATA: Array<{
  crop: string;
  state: string;
  market: string;
  price: number;
  trend: string;
  trendDir: 'up' | 'down' | 'stable';
  demand: 'High' | 'Medium' | 'Low';
  msp?: number;
}> = [
  // Cotton
  { crop: 'Cotton', state: 'Maharashtra', market: 'Solapur Mandi', price: 6250, trend: '+12%', trendDir: 'up', demand: 'High', msp: 6080 },
  { crop: 'Cotton', state: 'Maharashtra', market: 'Pune APMC', price: 6180, trend: '+8%', trendDir: 'up', demand: 'High', msp: 6080 },
  { crop: 'Cotton', state: 'Maharashtra', market: 'Latur Market', price: 6320, trend: '+15%', trendDir: 'up', demand: 'High', msp: 6080 },
  { crop: 'Cotton', state: 'Gujarat', market: 'Ahmedabad APMC', price: 6150, trend: '+10%', trendDir: 'up', demand: 'High', msp: 6080 },
  { crop: 'Cotton', state: 'Punjab', market: 'Ludhiana Mandi', price: 6100, trend: '+7%', trendDir: 'up', demand: 'Medium', msp: 6080 },
  
  // Wheat
  { crop: 'Wheat', state: 'Punjab', market: 'Ludhiana Mandi', price: 2250, trend: '+10%', trendDir: 'up', demand: 'High', msp: 2015 },
  { crop: 'Wheat', state: 'Haryana', market: 'Karnal Mandi', price: 2280, trend: '+12%', trendDir: 'up', demand: 'High', msp: 2015 },
  { crop: 'Wheat', state: 'Uttar Pradesh', market: 'Lucknow Mandi', price: 2180, trend: '+8%', trendDir: 'up', demand: 'High', msp: 2015 },
  { crop: 'Wheat', state: 'Madhya Pradesh', market: 'Indore Mandi', price: 2150, trend: '+6%', trendDir: 'up', demand: 'Medium', msp: 2015 },
  { crop: 'Wheat', state: 'Maharashtra', market: 'Pune APMC', price: 2100, trend: '+5%', trendDir: 'up', demand: 'Medium', msp: 2015 },
  
  // Soybean
  { crop: 'Soybean', state: 'Madhya Pradesh', market: 'Indore Mandi', price: 4350, trend: '+15%', trendDir: 'up', demand: 'High', msp: 4200 },
  { crop: 'Soybean', state: 'Maharashtra', market: 'Latur Market', price: 4280, trend: '+12%', trendDir: 'up', demand: 'High', msp: 4200 },
  { crop: 'Soybean', state: 'Rajasthan', market: 'Kota Market', price: 4200, trend: '+10%', trendDir: 'up', demand: 'High', msp: 4200 },
  { crop: 'Soybean', state: 'Karnataka', market: 'Bangalore APMC', price: 4150, trend: '+8%', trendDir: 'up', demand: 'Medium', msp: 4200 },
  
  // Rice
  { crop: 'Rice', state: 'Punjab', market: 'Amritsar APMC', price: 2100, trend: '+7%', trendDir: 'up', demand: 'High', msp: 1940 },
  { crop: 'Rice', state: 'Haryana', market: 'Karnal Mandi', price: 2050, trend: '+6%', trendDir: 'up', demand: 'High', msp: 1940 },
  { crop: 'Rice', state: 'Uttar Pradesh', market: 'Varanasi Market', price: 2000, trend: '+5%', trendDir: 'up', demand: 'Medium', msp: 1940 },
  { crop: 'Rice', state: 'West Bengal', market: 'Kolkata APMC', price: 1980, trend: '+4%', trendDir: 'up', demand: 'Medium', msp: 1940 },
  { crop: 'Rice', state: 'Andhra Pradesh', market: 'Vijayawada APMC', price: 1950, trend: '+3%', trendDir: 'up', demand: 'Medium', msp: 1940 },
  
  // Onion
  { crop: 'Onion', state: 'Maharashtra', market: 'Nashik APMC', price: 2650, trend: '+18%', trendDir: 'up', demand: 'High' },
  { crop: 'Onion', state: 'Maharashtra', market: 'Pune APMC', price: 2580, trend: '+15%', trendDir: 'up', demand: 'High' },
  { crop: 'Onion', state: 'Karnataka', market: 'Bangalore APMC', price: 2450, trend: '+12%', trendDir: 'up', demand: 'High' },
  { crop: 'Onion', state: 'Gujarat', market: 'Ahmedabad APMC', price: 2400, trend: '+10%', trendDir: 'up', demand: 'Medium' },
  
  // Tomato
  { crop: 'Tomato', state: 'Karnataka', market: 'Bangalore APMC', price: 1950, trend: '-2%', trendDir: 'down', demand: 'Medium' },
  { crop: 'Tomato', state: 'Maharashtra', market: 'Pune APMC', price: 1800, trend: '-3%', trendDir: 'down', demand: 'Low' },
  { crop: 'Tomato', state: 'Andhra Pradesh', market: 'Guntur Mandi', price: 1750, trend: '-5%', trendDir: 'down', demand: 'Low' },
  
  // Sugarcane
  { crop: 'Sugarcane', state: 'Uttar Pradesh', market: 'Lucknow Mandi', price: 3250, trend: '+6%', trendDir: 'up', demand: 'High', msp: 3150 },
  { crop: 'Sugarcane', state: 'Maharashtra', market: 'Kolhapur Market', price: 3180, trend: '+5%', trendDir: 'up', demand: 'Medium', msp: 3150 },
  { crop: 'Sugarcane', state: 'Karnataka', market: 'Belgaum APMC', price: 3100, trend: '+4%', trendDir: 'up', demand: 'Medium', msp: 3150 },
  
  // Maize
  { crop: 'Maize', state: 'Karnataka', market: 'Bangalore APMC', price: 1950, trend: '+8%', trendDir: 'up', demand: 'High', msp: 1870 },
  { crop: 'Maize', state: 'Andhra Pradesh', market: 'Vijayawada APMC', price: 1900, trend: '+7%', trendDir: 'up', demand: 'High', msp: 1870 },
  { crop: 'Maize', state: 'Bihar', market: 'Patna Mandi', price: 1850, trend: '+5%', trendDir: 'up', demand: 'Medium', msp: 1870 },
  
  // Potato
  { crop: 'Potato', state: 'Uttar Pradesh', market: 'Agra Mandi', price: 1200, trend: '+5%', trendDir: 'up', demand: 'High' },
  { crop: 'Potato', state: 'West Bengal', market: 'Kolkata APMC', price: 1150, trend: '+4%', trendDir: 'up', demand: 'High' },
  { crop: 'Potato', state: 'Punjab', market: 'Jalandhar Market', price: 1100, trend: '+3%', trendDir: 'up', demand: 'Medium' },
];

// =============================================================================
// SERVICE METHODS
// =============================================================================

export const DataService = {
  getFields: async (): Promise<Field[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_FIELDS), 500);
    });
  },

  getProfile: async (): Promise<ProfileData> => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(MOCK_PROFILE), 500);
    });
  },

  getCropDetails: (cropName: string) => {
    return CROP_DATA_MAP[cropName] || { daysSinceSowing: 0, expectedHarvest: 'N/A' };
  },

  getMarketData: async () => {
    return new Promise((resolve) => {
      setTimeout(() => resolve({
        priceHistory: MARKET_PRICE_DATA,
        mandiPrices: MANDI_PRICES,
        otherCrops: OTHER_CROPS_MARKET,
        predictions: PRICE_PREDICTIONS
      }), 500);
    });
  },

  // New methods for enhanced market search
  searchMarketPrices: (crop?: string, state?: string, market?: string) => {
    let results = COMPREHENSIVE_MARKET_DATA;
    
    if (crop) {
      results = results.filter(item => item.crop.toLowerCase() === crop.toLowerCase());
    }
    if (state) {
      results = results.filter(item => item.state.toLowerCase() === state.toLowerCase());
    }
    if (market) {
      results = results.filter(item => item.market.toLowerCase().includes(market.toLowerCase()));
    }
    
    return results;
  },

  getCropMarketInfo: (cropName: string) => {
    const cropData = COMPREHENSIVE_MARKET_DATA.filter(
      item => item.crop.toLowerCase() === cropName.toLowerCase()
    );
    
    if (cropData.length === 0) return null;
    
    // Calculate average price and trend
    const avgPrice = Math.round(
      cropData.reduce((sum, item) => sum + item.price, 0) / cropData.length
    );
    
    return {
      crop: cropName,
      currentPrice: avgPrice,
      markets: cropData,
      msp: cropData[0].msp || null
    };
  },

  getAvailableCrops: () => AVAILABLE_CROPS,
  getAvailableStates: () => AVAILABLE_STATES,
  getMarketsByState: (state: string) => MARKETS_BY_STATE[state] || [],
};