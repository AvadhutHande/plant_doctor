import { useState } from 'react';
import { ArrowLeft, Sprout, TrendingUp, CheckCircle2, Award } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FieldDetailProps } from '../types';

const cropRecommendations = [
  {
    name: 'Cotton',
    confidence: 95,
    reason: 'Perfect soil pH and NPK levels',
    duration: '150-180 days',
    waterReq: 'Medium',
    expectedYield: '15-20 quintals/acre',
    marketDemand: 'High',
    profitPotential: '₹60,000 - ₹80,000/acre'
  },
  {
    name: 'Soybean',
    confidence: 88,
    reason: 'Good rainfall prediction',
    duration: '90-120 days',
    waterReq: 'Medium',
    expectedYield: '12-15 quintals/acre',
    marketDemand: 'High',
    profitPotential: '₹45,000 - ₹55,000/acre'
  },
  {
    name: 'Wheat',
    confidence: 82,
    reason: 'Suitable temperature range',
    duration: '120-150 days',
    waterReq: 'Low to Medium',
    expectedYield: '18-22 quintals/acre',
    marketDemand: 'Medium',
    profitPotential: '₹40,000 - ₹50,000/acre'
  }
];

export default function CropRecommendation({ selectedField, onBack }: FieldDetailProps) {
  const [selectedCrop, setSelectedCrop] = useState<number | null>(null);

  // Derive soil type from field ID for demo purposes
  const getSoilType = (id: string) => {
    switch(id) {
      case '1': return 'Black Cotton';
      case '2': return 'Loamy';
      case '3': return 'Red Soil';
      default: return 'Loamy';
    }
  };
  
  const soilType = getSoilType(selectedField.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-green-700 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl">Crop Recommendation</h1>
            <p className="text-sm text-green-100">AI-Based Suggestions for {selectedField.name}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Analysis Info */}
        <Card className="border-blue-200 bg-blue-50 shadow-md">
          <CardContent className="p-4">
            <h3 className="text-sm text-blue-900 mb-2">Analysis Based On:</h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Soil Type: {soilType}</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>pH: 6.5 (Good)</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Weather: Favorable</span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Season: Kharif</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Crop Recommendations */}
        <div className="space-y-3">
          <h2 className="text-lg text-gray-800">Recommended Crops</h2>
          
          {cropRecommendations.map((crop, index) => (
            <Card 
              key={index}
              className={`shadow-md cursor-pointer transition-all ${
                selectedCrop === index ? 'border-green-500 border-2' : ''
              } ${index === 0 ? 'border-amber-300 border-2' : ''}`}
              onClick={() => setSelectedCrop(selectedCrop === index ? null : index)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Sprout className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{crop.name}</CardTitle>
                        {index === 0 && (
                          <Badge className="bg-amber-500 flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            Recommended
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{crop.reason}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-600">{crop.confidence}%</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-xs text-gray-600">Duration</p>
                      <p className="text-gray-800">{crop.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Water Need</p>
                      <p className="text-gray-800">{crop.waterReq}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Expected Yield</p>
                      <p className="text-gray-800">{crop.expectedYield}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Market Demand</p>
                      <p className="text-gray-800">{crop.marketDemand}</p>
                    </div>
                  </div>
                </div>

                {selectedCrop === index && (
                  <div className="space-y-3 pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-600">Profit Potential</p>
                        <p className="text-sm text-blue-900">{crop.profitPotential}</p>
                      </div>
                    </div>

                    <div className="space-y-2 p-3 bg-green-50 rounded-lg">
                      <p className="text-sm text-gray-800 font-medium">Why suggested?</p>
                      <ul className="space-y-1 text-xs text-gray-700">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Matches soil conditions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Suitable rainfall pattern</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>High market demand</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>Good crop rotation option</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card className="border-amber-300 bg-amber-50 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Important Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <span>Use certified seeds from authorized dealers</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <span>Prepare land 2-3 weeks before sowing</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <span>Follow recommended spacing for better yield</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <span>Monitor weather updates regularly</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}