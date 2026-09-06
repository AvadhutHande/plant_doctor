import { ArrowLeft, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { NavigableProps } from '../types';

interface IncomeComparisonProps extends NavigableProps {}

const cropComparison = [
  {
    crop: 'Cotton',
    cultivation: 28000,
    yield: 15,
    pricePerQuintal: 6250,
    revenue: 93750,
    profit: 65750,
    recommended: true
  },
  {
    crop: 'Soybean',
    cultivation: 18000,
    yield: 12,
    pricePerQuintal: 4800,
    revenue: 57600,
    profit: 39600,
    recommended: false
  },
  {
    crop: 'Wheat',
    cultivation: 22000,
    yield: 18,
    pricePerQuintal: 2300,
    revenue: 41400,
    profit: 19400,
    recommended: false
  },
  {
    crop: 'Sugarcane',
    cultivation: 45000,
    yield: 350,
    pricePerQuintal: 350,
    revenue: 122500,
    profit: 77500,
    recommended: true
  }
];

const chartData = cropComparison.map(crop => ({
  name: crop.crop,
  Cost: crop.cultivation,
  Revenue: crop.revenue,
  Profit: crop.profit
}));

export default function IncomeComparison({ onBack }: IncomeComparisonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <div className="bg-purple-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-purple-700 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl">Crop Income Comparison</h1>
            <p className="text-sm text-purple-100">Profit Analysis per Acre</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Info Card */}
        <Card className="border-blue-200 bg-blue-50 shadow-md">
          <CardContent className="p-4 text-sm text-blue-900">
            <p>Compare profitability of different crops based on your soil type, current market prices, and expected yields.</p>
          </CardContent>
        </Card>

        {/* Chart */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Profit Comparison Chart</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 11 }}
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fontSize: 11 }}
                  stroke="#6b7280"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                  formatter={(value) => `₹${value}`}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '12px' }}
                />
                <Bar dataKey="Cost" fill="#ef4444" />
                <Bar dataKey="Revenue" fill="#3b82f6" />
                <Bar dataKey="Profit" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Detailed Comparison */}
        <div className="space-y-3">
          <h2 className="text-lg text-gray-800">Detailed Analysis</h2>
          
          {cropComparison.map((crop, index) => (
            <Card 
              key={index}
              className={`shadow-md ${
                crop.recommended ? 'border-2 border-green-500 bg-green-50' : ''
              }`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <TrendingUp className={`w-6 h-6 ${
                      crop.recommended ? 'text-green-600' : 'text-gray-500'
                    }`} />
                    <div>
                      <CardTitle className="text-base flex items-center gap-2">
                        {crop.crop}
                        {crop.recommended && (
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        )}
                      </CardTitle>
                    </div>
                  </div>
                  {crop.recommended && (
                    <Badge className="bg-green-600">Recommended</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-600">Cultivation Cost</p>
                    <p className="text-lg text-red-700">₹{crop.cultivation.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-600">Expected Yield</p>
                    <p className="text-lg text-gray-800">{crop.yield} qtl/acre</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-600">Price/Quintal</p>
                    <p className="text-lg text-blue-700">₹{crop.pricePerQuintal.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-white rounded-lg">
                    <p className="text-xs text-gray-600">Total Revenue</p>
                    <p className="text-lg text-blue-700">₹{crop.revenue.toLocaleString()}</p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg ${
                  crop.recommended ? 'bg-green-200' : 'bg-purple-100'
                }`}>
                  <p className="text-xs text-gray-700">Net Profit</p>
                  <p className="text-2xl text-green-700 mt-1">₹{crop.profit.toLocaleString()}</p>
                  <p className="text-xs text-gray-600 mt-1">per acre</p>
                </div>

                {/* Cost Breakdown */}
                <div className="text-xs text-gray-600 bg-white p-3 rounded-lg">
                  <p className="mb-1">Cost includes:</p>
                  <p>Seeds • Fertilizers • Pesticides • Irrigation • Labor</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Summary */}
        <Card className="border-green-300 bg-green-50 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">Recommendation Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-800">Most Profitable: Sugarcane</p>
                <p className="text-xs text-gray-600 mt-1">Expected profit: ₹77,500 per acre</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-800">Best ROI: Cotton</p>
                <p className="text-xs text-gray-600 mt-1">235% return on investment</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <TrendingUp className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-gray-800">Market Trend: Rising</p>
                <p className="text-xs text-gray-600 mt-1">Cotton and Sugarcane prices trending upward</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Note */}
        <Card className="border-amber-300 bg-amber-50 shadow-md">
          <CardContent className="p-4 text-xs text-gray-700">
            <p className="text-amber-800 mb-1">📌 Important Note</p>
            <p>Actual profits may vary based on weather conditions, pest attacks, market fluctuations, and farming practices. These are estimated values based on average conditions.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
