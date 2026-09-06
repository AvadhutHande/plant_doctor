import { useState } from 'react';
import { ArrowLeft, TrendingUp, TrendingDown, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FieldDetailProps } from '../types';

const priceData = [
  { month: 'Sep', price: 5800 },
  { month: 'Oct', price: 5950 },
  { month: 'Nov', price: 6100 },
  { month: 'Dec', price: 6050 },
  { month: 'Jan', price: 6200 },
  { month: 'Feb', price: 6250 },
  { month: 'Mar', price: 6400 }
];

const mandiPrices = [
  { mandi: 'Solapur Mandi', price: 6250, change: '+12%', trend: 'up' },
  { mandi: 'Pune APMC', price: 6180, change: '+8%', trend: 'up' },
  { mandi: 'Latur Market', price: 6320, change: '+15%', trend: 'up' },
  { mandi: 'Sangli Mandi', price: 6090, change: '+5%', trend: 'up' },
  { mandi: 'Nashik APMC', price: 5980, change: '-2%', trend: 'down' }
];

const otherCrops = [
  { crop: 'Wheat', price: 2150, trend: '+8%', demand: 'High', trendDir: 'up' },
  { crop: 'Soybean', price: 4200, trend: '+12%', demand: 'High', trendDir: 'up' },
  { crop: 'Sugarcane', price: 3100, trend: '+5%', demand: 'Medium', trendDir: 'up' },
  { crop: 'Tomato', price: 1800, trend: '-3%', demand: 'Low', trendDir: 'down' },
  { crop: 'Onion', price: 2500, trend: '+15%', demand: 'High', trendDir: 'up' }
];

const predictions = [
  { period: 'Next Week', price: '₹6,300 - ₹6,400', confidence: 85, trend: 'up' },
  { period: 'Next Month', price: '₹6,500 - ₹6,700', confidence: 72, trend: 'up' },
  { period: 'Harvest Season', price: '₹6,200 - ₹6,500', confidence: 68, trend: 'stable' }
];

export default function MarketPrices({ selectedField, onBack }: FieldDetailProps) {
  const [activeTab, setActiveTab] = useState<'my-crop' | 'other-crops'>('my-crop');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-blue-700 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl">Market Prices</h1>
            <p className="text-sm text-blue-100">Real-time & Predictions</p>
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
            My Crop
          </button>
          <button
            onClick={() => setActiveTab('other-crops')}
            className={`flex-1 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === 'other-crops'
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Other Crops
          </button>
        </div>

        {activeTab === 'my-crop' ? (
          <>
            {/* Current Price */}
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-2">
                  <p className="text-sm opacity-90">Today's {selectedField.crop} Price</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-4xl">₹6,250</p>
                    <p className="text-lg opacity-90">per quintal</p>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <TrendingUp className="w-5 h-5" />
                    <p className="text-sm">+12% from last month</p>
                  </div>
                  <p className="text-xs opacity-75 pt-1">Last updated: 2 hours ago</p>
                </div>
              </CardContent>
            </Card>

            {/* Price Trend Chart */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">6-Month Price Trend</CardTitle>
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
                  AI Price Predictions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {predictions.map((pred, index) => (
                  <div key={index} className="p-3 bg-purple-50 rounded-lg">
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
                <CardTitle className="text-lg">Nearby Mandi Prices</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {mandiPrices.map((mandi, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-gray-50 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <MapPin className="w-5 h-5 text-gray-500 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-800">{mandi.mandi}</p>
                        <p className="text-xs text-gray-600 mt-0.5">per quintal</p>
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
                <CardTitle className="text-lg text-green-800">Government MSP</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <div>
                    <p className="text-sm text-gray-700">Minimum Support Price</p>
                    <p className="text-xs text-gray-600 mt-0.5">{selectedField.crop} (Medium Staple)</p>
                  </div>
                  <p className="text-xl text-green-700">₹6,080</p>
                </div>
                <p className="text-xs text-gray-700 px-3">
                  Current market price is above MSP. Good time to sell!
                </p>
              </CardContent>
            </Card>

            {/* Market Tips */}
            <Card className="border-blue-300 bg-blue-50 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Selling Strategy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">📈</span>
                  <span>Prices are trending upward. Consider waiting 1-2 weeks for better rates.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">🏪</span>
                  <span>Latur Market offering highest price (₹6,320) in your region.</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">💡</span>
                  <span>Sell 40-50% of produce now, hold rest for expected price rise.</span>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Other Crops Table */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Compare Other Crops</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {otherCrops.map((item, index) => (
                  <div 
                    key={index} 
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{item.crop}</p>
                        <p className="text-xs text-gray-600 mt-0.5">per quintal</p>
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
                        <div className="text-right min-w-[60px]">
                          <Badge className={`${
                            item.demand === 'High' ? 'bg-green-600' :
                            item.demand === 'Medium' ? 'bg-yellow-600' :
                            'bg-gray-500'
                          }`}>
                            {item.demand}
                          </Badge>
                        </div>
                        <Button 
                          size="sm"
                          variant="outline"
                          className="text-xs h-8"
                        >
                          Compare
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tips for Other Crops */}
            <Card className="border-amber-300 bg-amber-50 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">High Demand Crops</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>Consider these crops for your next season:</p>
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