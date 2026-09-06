/**
 * Central Type Definitions for Smart Agriculture Advisory System
 * Single source of truth for all TypeScript interfaces and types
 * 
 * Usage: import { Field, ProfileData, etc. } from '../types'
 */

// =============================================================================
// FIELD TYPES
// =============================================================================

/**
 * Represents a field/plot of land owned by a farmer
 * Used across: Dashboard, Weather, AI Tools, Market, Field Details
 */
export interface Field {
  id: string;
  name: string;
  size: string; // Display format (e.g., "2.5 Acres")
  area: number; // Numeric area in guntha
  crop: string; // Current crop or "Fallow" if empty
  stage: string; // Growth stage
  cropAssignedDate?: string; // When crop was assigned
  expectedHarvestDate?: string; // Estimated harvest date
  isActive: boolean; // Whether field has an active crop
}

/**
 * Context type for field selection
 * Used in: AppLayout (FieldContext)
 */
export interface FieldContextType {
  selectedField: Field;
  setSelectedField: (field: Field) => void;
}

// =============================================================================
// FIELD MANAGEMENT TYPES (NEW)
// =============================================================================

/**
 * Comprehensive field list with management operations
 */
export interface FieldsContextType {
  fields: Field[];
  addField: (field: Omit<Field, 'id'>) => void;
  updateField: (id: string, updates: Partial<Field>) => void;
  removeField: (id: string) => void;
  assignCropToField: (fieldId: string, cropName: string, stage?: string) => void;
  clearCropFromField: (fieldId: string) => void;
  getActiveFieldsCount: () => number;
  getTotalAreaInGuntha: () => number;
}

/**
 * Crop assignment data
 */
export interface CropAssignment {
  fieldId: string;
  cropName: string;
  stage: string;
  assignedDate: string;
  expectedHarvestDate: string;
}

// =============================================================================
// USER / PROFILE TYPES
// =============================================================================

/**
 * Complete user profile data
 * Used across: ProfileContext, Profile pages, Dashboard, Weather, AI Tools
 */
export interface ProfileData {
  // Personal Info
  name: string;
  farmerId: string;
  phone: string;
  email: string;
  
  // Location
  village: string;
  pinCode: string;
  coordinates?: { lat: number; lng: number };
  
  // Farm Details
  totalLand: number;
  numFields: number;
  irrigationType: 'Drip' | 'Sprinkler' | 'Canal' | 'Rainfed';
  waterAvailability: 'Low' | 'Medium' | 'High';
  
  // Experience
  farmingExperience: number;
  seasonalBudget: number;
  riskPreference: 'Safe' | 'Balanced' | 'High Profit';
  
  // Preferences
  preferredCrops: string[];
  farmingType: 'Organic' | 'Chemical' | 'Mixed';
  language: 'English' | 'Hindi' | 'Marathi';
  notificationsEnabled: boolean;
  
  // Profile Picture
  profilePicture?: string;
  
  // Stats (read-only)
  activeCrops: number;
  seasonEarnings: number;
}

/**
 * Context type for profile management
 * Used in: ProfileContext
 */
export interface ProfileContextType {
  profile: ProfileData;
  updateProfile: (data: Partial<ProfileData>) => void;
  resetProfile: () => void;
}

// =============================================================================
// COMPONENT PROPS TYPES
// =============================================================================

/**
 * Props for components that need field selection
 */
export interface FieldAwareProps {
  selectedField: Field;
}

/**
 * Props for components with back navigation
 */
export interface NavigableProps {
  onBack: () => void;
}

/**
 * Props for detail pages (field + navigation)
 */
export interface FieldDetailProps extends FieldAwareProps, NavigableProps {}

/**
 * Props for Profile component
 */
export interface ProfileProps {
  onLogout: () => void;
}

// =============================================================================
// EXPENSE TRACKER TYPES
// =============================================================================

/**
 * Expense category summary
 * Used in: ExpenseTracker
 */
export interface ExpenseCategory {
  category: string;
  amount: number;
  color: string;
}

/**
 * Individual transaction record
 * Used in: ExpenseTracker
 */
export interface Transaction {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  type: 'expense' | 'income';
}

/**
 * Props for ExpenseTracker component
 */
export interface ExpenseTrackerProps extends NavigableProps {
  selectedField: {
    name: string;
    crop: string;
  };
}

// =============================================================================
// FERTILIZER RECOMMENDATION TYPES
// =============================================================================

/**
 * Single fertilizer item
 * Used in: FertilizerRecommendation
 */
export interface FertilizerItem {
  name: string;
  quantity: string;
  cost: string;
  timing: string;
}

/**
 * Fertilization plan stage
 * Used in: FertilizerRecommendation
 */
export interface PlanStage {
  stage: string;
  timing: string;
  fertilizers: FertilizerItem[];
}

// =============================================================================
// CROP CALENDAR TYPES
// =============================================================================

/**
 * Props for CropCalendar component
 */
export interface CropCalendarProps extends NavigableProps {
  selectedField: {
    name: string;
    crop: string;
  };
}

// =============================================================================
// WEATHER TYPES
// =============================================================================

/**
 * Weather data structure
 * Used in: Weather component
 */
export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  rainfall: number;
  forecast: WeatherForecast[];
}

/**
 * Weather forecast for upcoming days
 */
export interface WeatherForecast {
  day: string;
  high: number;
  low: number;
  condition: string;
  rainfall: number;
}

// =============================================================================
// MARKET TYPES
// =============================================================================

/**
 * Market price data point
 * Used in: MarketPrices component
 */
export interface PriceDataPoint {
  date: string;
  price: number;
}

/**
 * Crop market information
 */
export interface CropMarketInfo {
  crop: string;
  currentPrice: number;
  trend: 'up' | 'down' | 'stable';
  change: number;
  priceHistory: PriceDataPoint[];
}

// =============================================================================
// ERROR BOUNDARY TYPES
// =============================================================================

/**
 * Props for ErrorBoundary component
 */
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

/**
 * State for ErrorBoundary component
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  showDetails: boolean;
}

// =============================================================================
// AUTHENTICATION TYPES
// =============================================================================

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data
 */
export interface RegistrationData extends LoginCredentials {
  name: string;
  phone: string;
  village: string;
  confirmPassword: string;
}

// =============================================================================
// UTILITY TYPES
// =============================================================================

/**
 * Generic API response structure (for future backend integration)
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Generic loading state
 */
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

/**
 * Date range for filtering
 */
export interface DateRange {
  startDate: Date;
  endDate: Date;
}

/**
 * Coordinates for location-based features
 */
export interface Coordinates {
  lat: number;
  lng: number;
}

/**
 * Notification settings
 */
export interface NotificationSettings {
  enabled: boolean;
  weatherAlerts: boolean;
  marketUpdates: boolean;
  cropAdvisories: boolean;
  schemeNotifications: boolean;
}

// =============================================================================
// ENUMS (exported as const for better tree-shaking)
// =============================================================================

/**
 * Crop growth stages
 */
export const CropStages = {
  SOWING: 'Sowing',
  VEGETATIVE: 'Vegetative',
  FLOWERING: 'Flowering',
  FRUITING: 'Fruiting',
  HARVESTING: 'Harvesting',
  FALLOW: 'Fallow',
} as const;

export type CropStage = typeof CropStages[keyof typeof CropStages];

/**
 * Weather conditions
 */
export const WeatherConditions = {
  SUNNY: 'Sunny',
  CLOUDY: 'Cloudy',
  RAINY: 'Rainy',
  THUNDERSTORM: 'Thunderstorm',
  FOGGY: 'Foggy',
} as const;

export type WeatherCondition = typeof WeatherConditions[keyof typeof WeatherConditions];

/**
 * Irrigation types
 */
export const IrrigationTypes = {
  DRIP: 'Drip',
  SPRINKLER: 'Sprinkler',
  CANAL: 'Canal',
  RAINFED: 'Rainfed',
} as const;

export type IrrigationType = typeof IrrigationTypes[keyof typeof IrrigationTypes];

/**
 * Risk preferences
 */
export const RiskPreferences = {
  SAFE: 'Safe',
  BALANCED: 'Balanced',
  HIGH_PROFIT: 'High Profit',
} as const;

export type RiskPreference = typeof RiskPreferences[keyof typeof RiskPreferences];

/**
 * Languages supported
 */
export const Languages = {
  ENGLISH: 'English',
  HINDI: 'Hindi',
  MARATHI: 'Marathi',
} as const;

export type Language = typeof Languages[keyof typeof Languages];

/**
 * Farming types
 */
export const FarmingTypes = {
  ORGANIC: 'Organic',
  CHEMICAL: 'Chemical',
  MIXED: 'Mixed',
} as const;

export type FarmingType = typeof FarmingTypes[keyof typeof FarmingTypes];