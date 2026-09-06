import { useState, useEffect } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, MapPin, Search, X, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FieldDetailProps } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { DataService, COMPREHENSIVE_MARKET_DATA } from '../services/dataService';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { useFields } from '../contexts/FieldsContext';

const priceData = [
  { id: 'sep', month: 'Sep', price: 5800 },
  { id: 'oct', month: 'Oct', price: 5950 },
  { id: 'nov', month: 'Nov', price: 6100 },
  { id: 'dec', month: 'Dec', price: 6050 },
  { id: 'jan', month: 'Jan', price: 6200 },
  { id: 'feb', month: 'Feb', price: 6250 },
  { id: 'mar', month: 'Mar', price: 6400 }
];

const mandiPrices = [
  { id: 'solapur', mandi: 'Solapur Mandi', price: 6250, change: '+12%', trend: 'up' },
  { id: 'pune', mandi: 'Pune APMC', price: 6180, change: '+8%', trend: 'up' },
  { id: 'latur', mandi: 'Latur Market', price: 6320, change: '+15%', trend: 'up' },
  { id: 'sangli', mandi: 'Sangli Mandi', price: 6090, change: '+5%', trend: 'up' },
  { id: 'nashik', mandi: 'Nashik APMC', price: 5980, change: '-2%', trend: 'down' }
];

const otherCrops = [
  { id: 'wheat', crop: 'Wheat', price: 2150, trend: '+8%', demand: 'High', trendDir: 'up' },
  { id: 'soybean', crop: 'Soybean', price: 4200, trend: '+12%', demand: 'High', trendDir: 'up' },
  { id: 'sugarcane', crop: 'Sugarcane', price: 3100, trend: '+5%', demand: 'Medium', trendDir: 'up' },
  { id: 'tomato', crop: 'Tomato', price: 1800, trend: '-3%', demand: 'Low', trendDir: 'down' },
  { id: 'onion', crop: 'Onion', price: 2500, trend: '+15%', demand: 'High', trendDir: 'up' }
];

const predictions = [
  { id: 'week', period: 'Next Week', price: '₹6,300 - ₹6,400', confidence: 85, trend: 'up' },
  { id: 'month', period: 'Next Month', price: '₹6,500 - ₹6,700', confidence: 72, trend: 'up' },
  { id: 'harvest', period: 'Harvest Season', price: '₹6,200 - ₹6,500', confidence: 68, trend: 'stable' }
];

type ComparisonData = {
  selectedCrop: string;
  selectedCropPrice: number;
  selectedCropTrend: string;
  selectedCropDemand: string;
  userCrop: string;
  userCropPrice: number;
  userCropTrend: string;
  userCropDemand: string;
};

export default function MarketPricesEnhanced({ selectedField, onBack }: FieldDetailProps) {
  const { t } = useLanguage();
  const { fields } = useFields();
  const [activeTab, setActiveTab] = useState<'my-crop' | 'other-crops' | 'search'>('my-crop');
  
  // Search & Filter State
  const [searchCrop, setSearchCrop] = useState<string>('');
  const [searchState, setSearchState] = useState<string>('');
  const [searchMarket, setSearchMarket] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Comparison State
  const [showComparison, setShowComparison] = useState(false);
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  
  const availableCrops = DataService.getAvailableCrops();
  const availableStates = DataService.getAvailableStates();
  const [availableMarkets, setAvailableMarkets] = useState<string[]>([]);

  // Update available markets when state changes
  useEffect(() => {
    if (searchState) {
      const markets = DataService.getMarketsByState(searchState);
      setAvailableMarkets(markets);
      // Reset market selection when state changes
      setSearchMarket('');
    } else {
      setAvailableMarkets([]);
      setSearchMarket('');
    }
  }, [searchState]);

  // Handle search
  const handleSearch = () => {
    if (!searchCrop && !searchState && !searchMarket) {
      // Don't search if all filters are empty
      return;
    }
    
    const results = DataService.searchMarketPrices(searchCrop, searchState, searchMarket);
    setSearchResults(results);
    setHasSearched(true);
  };

  // Reset filters
  const handleReset = () => {
    setSearchCrop('');
    setSearchState('');
    setSearchMarket('');
    setSearchResults([]);
    setHasSearched(false);
    setAvailableMarkets([]);
  };

  // Handle comparison
  const handleCompare = (selectedCropName: string) => {
    // Find user's crop data
    const userCrop = selectedField.crop;
    const userCropData = COMPREHENSIVE_MARKET_DATA.find(
      item => item.crop.toLowerCase() === userCrop.toLowerCase()
    );
    
    // Find selected crop data
    const selectedCropData = COMPREHENSIVE_MARKET_DATA.find(
      item => item.crop.toLowerCase() === selectedCropName.toLowerCase()
    );

    if (userCropData && selectedCropData) {
      setComparisonData({
        selectedCrop: selectedCropName,
        selectedCropPrice: selectedCropData.price,
        selectedCropTrend: selectedCropData.trend,
        selectedCropDemand: selectedCropData.demand,
        userCrop: userCrop,
        userCropPrice: userCropData.price,
        userCropTrend: userCropData.trend,
        userCropDemand: userCropData.demand,
      });
      setShowComparison(true);
    }
  };

  const closeComparison = () => {
    setShowComparison(false);
    setComparisonData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-blue-700 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl">{t('market.marketPrices')}</h1>
            <p className="text-sm text-blue-100">{t('market.realTimePredictions')}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Tabs */}
        <div className="flex gap-2 bg-white p-1 rounded-lg shadow-md">
          <button
            onClick={() => setActiveTab('my-crop')}
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'my-crop'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t('market.myCrop')}
          </button>
          <button
            onClick={() => setActiveTab('other-crops')}
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'other-crops'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {t('market.otherCrops')}
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'search'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Search className="w-4 h-4 inline mr-1" />
            {t('market.searchPrices')}
          </button>
        </div>

        {/* Comparison Modal */}
        <Dialog open={showComparison} onOpenChange={setShowComparison}>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{t('market.compareCrops')}</DialogTitle>
              <DialogDescription>{t('market.compareCropsDescription')}</DialogDescription>
            </DialogHeader>
            {comparisonData && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {/* Your Crop */}
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">{t('market.yourCrop')}</p>
                    <h3 className="text-lg font-bold text-green-800">{comparisonData.userCrop}</h3>
                    <p className="text-2xl font-bold text-green-700 mt-2">₹{comparisonData.userCropPrice}</p>
                    <p className="text-xs text-gray-600 mt-1">{t('market.perQuintal')}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className="bg-green-600">{comparisonData.userCropDemand}</Badge>
                      <span className={`text-sm ${
                        comparisonData.userCropTrend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {comparisonData.userCropTrend}
                      </span>
                    </div>
                  </div>

                  {/* Selected Crop */}
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-xs text-gray-600 mb-2">{t('market.selectedCrop')}</p>
                    <h3 className="text-lg font-bold text-blue-800">{comparisonData.selectedCrop}</h3>
                    <p className="text-2xl font-bold text-blue-700 mt-2">₹{comparisonData.selectedCropPrice}</p>
                    <p className="text-xs text-gray-600 mt-1">{t('market.perQuintal')}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <Badge className="bg-blue-600">{comparisonData.selectedCropDemand}</Badge>
                      <span className={`text-sm ${
                        comparisonData.selectedCropTrend.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {comparisonData.selectedCropTrend}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Difference */}
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 font-medium mb-2">{t('market.priceDifference')}</p>
                  <div className="flex items-center justify-center gap-2">
                    {comparisonData.selectedCropPrice > comparisonData.userCropPrice ? (
                      <>
                        <TrendingUp className="w-6 h-6 text-green-600" />
                        <p className="text-xl font-bold text-green-700">
                          ₹{comparisonData.selectedCropPrice - comparisonData.userCropPrice} {t('market.higher')}
                        </p>
                      </>
                    ) : comparisonData.selectedCropPrice < comparisonData.userCropPrice ? (
                      <>
                        <TrendingDown className="w-6 h-6 text-red-600" />
                        <p className="text-xl font-bold text-red-700">
                          ₹{comparisonData.userCropPrice - comparisonData.selectedCropPrice} {t('market.lower')}
                        </p>
                      </>
                    ) : (
                      <p className="text-xl font-bold text-gray-700">Equal</p>
                    )}
                  </div>
                </div>

                {/* Insights */}
                <div className="bg-amber-50 p-4 rounded-lg">
                  <p className="text-sm font-medium text-gray-800 mb-2">
                    {t('market.comparisonInsights')}
                  </p>
                  <div className="space-y-2 text-sm text-gray-700">
                    <p>
                      • {comparisonData.selectedCrop} {t('market.demandLevel')}: {comparisonData.selectedCropDemand}
                    </p>
                    <p>
                      • {comparisonData.userCrop} {t('market.demandLevel')}: {comparisonData.userCropDemand}
                    </p>
                    {comparisonData.selectedCropPrice > comparisonData.userCropPrice && (
                      <p className="text-green-700">
                        ✓ {comparisonData.selectedCrop} offers better returns currently
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {activeTab === 'search' ? (
          <>
            {/* Search & Filter Section */}
            <Card className="shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{t('market.findTodaysPrice')}</CardTitle>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filters */}
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {t('market.selectCrop')}
                    </label>
                    <Select value={searchCrop} onValueChange={setSearchCrop}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('market.selectCrop')} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableCrops.map((crop) => (
                          <SelectItem key={crop} value={crop}>
                            {crop}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">
                      {t('market.selectState')}
                    </label>
                    <Select value={searchState} onValueChange={setSearchState}>
                      <SelectTrigger>
                        <SelectValue placeholder={t('market.selectState')} />
                      </SelectTrigger>
                      <SelectContent>
                        {availableStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {searchState && availableMarkets.length > 0 && (
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-1 block">
                        {t('market.selectMarket')}
                      </label>
                      <Select value={searchMarket} onValueChange={setSearchMarket}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('market.selectMarket')} />
                        </SelectTrigger>
                        <SelectContent>
                          {availableMarkets.map((market) => (
                            <SelectItem key={market} value={market}>
                              {market}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={handleSearch}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                    disabled={!searchCrop && !searchState && !searchMarket}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    {t('market.apply')}
                  </Button>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    className="flex-1"
                  >
                    {t('market.reset')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {t('market.searchResults')} ({searchResults.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">{result.crop}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <MapPin className="w-3 h-3" />
                            <span>{result.market}, {result.state}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">₹{result.price}</p>
                          <p className="text-xs text-gray-600">{t('market.perQuintal')}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge className={`${
                            result.demand === 'High' ? 'bg-green-600' :
                            result.demand === 'Medium' ? 'bg-yellow-600' :
                            'bg-gray-500'
                          }`}>
                            {result.demand} {t('market.demand')}
                          </Badge>
                          <span className={`text-sm ${
                            result.trendDir === 'up' ? 'text-green-600' : 
                            result.trendDir === 'down' ? 'text-red-600' :
                            'text-gray-600'
                          }`}>
                            {result.trend}
                          </span>
                        </div>
                        {result.msp && (
                          <p className="text-xs text-gray-600">
                            MSP: ₹{result.msp}
                          </p>
                        )}
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleCompare(result.crop)}
                        className="w-full bg-purple-600 hover:bg-purple-700"
                      >
                        {t('market.compare')} {t('common.with')} {selectedField.crop}
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {searchResults.length === 0 && hasSearched && (
              <Card className="shadow-md">
                <CardContent className="py-8 text-center">
                  <p className="text-gray-600 mb-2">{t('market.noResultsFound')}</p>
                  <p className="text-sm text-gray-500">{t('market.tryDifferentFilters')}</p>
                </CardContent>
              </Card>
            )}
          </>
        ) : activeTab === 'my-crop' ? (
          <>
            {/* Current Price */}
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm opacity-90">{t('market.todaysPrice')} {selectedField.crop}</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl">₹6,250</p>
                    <p className="text-lg opacity-90">{t('market.perQuintal')}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <TrendingUp className="w-5 h-5" />
                    <p className="text-sm">+12% {t('market.fromLastMonth')}</p>
                  </div>
                  <p className="text-xs opacity-75 pt-1">{t('market.lastUpdated')} 2 {t('market.hoursAgo')}</p>
                </div>
              </CardContent>
            </Card>

            {/* Price Trend Chart */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{t('market.sixMonthTrend')}</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={priceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="month" 
                      tick={{ fontSize: 12 }}
                      stroke="#6b7280"
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      stroke="#6b7280"
                      domain={[5500, 6500]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                      formatter={(value) => [`₹${value}`, 'Price']}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      dot={{ fill: '#10b981', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Price Predictions */}
            <Card className="border-purple-300 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  {t('market.aiPredictions')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {predictions.map((pred) => (
                  <div key={pred.id} className="p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-800">{pred.period}</p>
                        <p className="text-lg text-purple-800 mt-1">{pred.price}</p>
                      </div>
                      <Badge className="bg-purple-600">{pred.confidence}%</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {pred.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : pred.trend === 'down' ? (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      ) : (
                        <div className="w-4 h-4" />
                      )}
                      <div className="flex-1 bg-white rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${pred.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Mandi-wise Prices */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{t('market.nearbyMandis')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mandiPrices.map((mandi) => (
                  <div 
                    key={mandi.id} 
                    className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{mandi.mandi}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{t('market.perQuintal')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base text-gray-900">₹{mandi.price}</p>
                      <p className={`text-xs ${
                        mandi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {mandi.change}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* MSP Info */}
            <Card className="border-green-300 bg-green-50 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">{t('market.governmentMSP')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <p className="text-sm text-gray-700">{t('market.minimumSupportPrice')}</p>
                    <p className="text-xs text-gray-600 mt-0.5">{selectedField.crop} ({t('market.mediumStaple')})</p>
                  </div>
                  <p className="text-xl text-green-700">₹6,080</p>
                </div>
                <p className="text-xs text-gray-700 px-3">
                  {t('market.mspAdvice')}
                </p>
              </CardContent>
            </Card>

            {/* Market Tips */}
            <Card className="border-blue-300 bg-blue-50 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{t('market.sellingStrategy')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">📈</span>
                  <span>{t('market.strategyTip1')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">🏪</span>
                  <span>{t('market.strategyTip2')}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">💡</span>
                  <span>{t('market.strategyTip3')}</span>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Other Crops Table */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{t('market.compareOtherCrops')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {otherCrops.map((item) => (
                  <div 
                    key={item.id} 
                    className="p-3 bg-gray-50 rounded-lg space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{item.crop}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{t('market.perQuintal')}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-base text-gray-900">₹{item.price}</p>
                          <p className={`text-xs ${
                            item.trendDir === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {item.trend}
                          </p>
                        </div>
                        <Badge className={`${
                          item.demand === 'High' ? 'bg-green-600' :
                          item.demand === 'Medium' ? 'bg-yellow-600' :
                          'bg-gray-500'
                        }`}>
                          {item.demand}
                        </Badge>
                      </div>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => handleCompare(item.crop)}
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      {t('market.compare')} {t('common.with')} {selectedField.crop}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips for Other Crops */}
            <Card className="border-amber-300 bg-amber-50 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">{t('market.highDemandCrops')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>{t('market.considerNextSeason')}</p>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Onion</strong> - Prices up 15%, high demand expected</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Soybean</strong> - Good profit margins, suitable for your soil</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-amber-600 mt-1">•</span>
                  <span><strong>Wheat</strong> - Stable demand, low risk option</span>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}