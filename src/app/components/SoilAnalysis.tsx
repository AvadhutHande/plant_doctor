import { useState } from 'react';
import { ArrowLeft, TestTube, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { FieldDetailProps } from '../types';

export default function SoilAnalysis({ selectedField, onBack }: FieldDetailProps) {
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [soilData, setSoilData] = useState({
    ph: '',
    nitrogen: '',
    phosphorus: '',
    potassium: ''
  });

  const handleAnalyze = () => {
    setHasAnalyzed(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      {/* Header */}
      <div className="bg-amber-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-amber-700 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl">Soil Analysis</h1>
            <p className="text-sm text-amber-100">Test Your Soil Health</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {!hasAnalyzed ? (
          <>
            {/* Instructions */}
            <Card className="border-amber-200 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-amber-600" />
                  Enter Soil Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-gray-700">
                <p>Enter the soil test results below. You can get these values from your local agricultural office or soil testing lab.</p>
              </CardContent>
            </Card>

            {/* Input Form */}
            <Card className="shadow-md">
              <CardContent className="p-4 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-700">
                    Soil pH Level
                    <span className="text-xs text-gray-500 ml-2">(4.0 - 9.0)</span>
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="e.g., 6.5"
                    value={soilData.ph}
                    onChange={(e) => setSoilData({ ...soilData, ph: e.target.value })}
                    className="h-12 text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-700">
                    Nitrogen (N)
                    <span className="text-xs text-gray-500 ml-2">(kg/ha)</span>
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 280"
                    value={soilData.nitrogen}
                    onChange={(e) => setSoilData({ ...soilData, nitrogen: e.target.value })}
                    className="h-12 text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-700">
                    Phosphorus (P)
                    <span className="text-xs text-gray-500 ml-2">(kg/ha)</span>
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 35"
                    value={soilData.phosphorus}
                    onChange={(e) => setSoilData({ ...soilData, phosphorus: e.target.value })}
                    className="h-12 text-lg"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-gray-700">
                    Potassium (K)
                    <span className="text-xs text-gray-500 ml-2">(kg/ha)</span>
                  </label>
                  <Input
                    type="number"
                    placeholder="e.g., 205"
                    value={soilData.potassium}
                    onChange={(e) => setSoilData({ ...soilData, potassium: e.target.value })}
                    className="h-12 text-lg"
                  />
                </div>

                <Button 
                  onClick={handleAnalyze}
                  className="w-full h-12 bg-amber-600 hover:bg-amber-700"
                >
                  Analyze Soil
                </Button>
              </CardContent>
            </Card>

            {/* Info Card */}
            <Card className="border-blue-200 bg-blue-50 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="mb-1">Don't have soil test results?</p>
                    <p className="text-xs text-blue-700">Visit your nearest Krishi Vigyan Kendra (KVK) or agricultural office for free soil testing services.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            {/* Overall Health */}
            <Card className="border-green-300 bg-green-50 shadow-md">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Soil Health Status</CardTitle>
                  <Badge className="bg-green-600">Good</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <p className="text-sm text-gray-800">Your soil is in good condition for most crops</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1">Overall Score</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                    <span className="text-sm text-gray-800">78/100</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Soil Type */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Soil Type Identification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="p-3 bg-amber-50 rounded-lg">
                  <p className="text-sm text-gray-800">Detected Soil Type</p>
                  <p className="text-lg text-amber-800 mt-1">Loamy Soil</p>
                  <p className="text-xs text-gray-600 mt-2">Ideal for most crops with good water retention and drainage properties</p>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Detailed Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <ParameterCard
                  name="pH Level"
                  value="6.5"
                  status="optimal"
                  range="6.0 - 7.0 (Optimal)"
                  recommendation="Perfect for most crops"
                />
                <ParameterCard
                  name="Nitrogen (N)"
                  value="280 kg/ha"
                  status="good"
                  range="280-560 kg/ha"
                  recommendation="Good level. Maintain with organic matter"
                />
                <ParameterCard
                  name="Phosphorus (P)"
                  value="35 kg/ha"
                  status="low"
                  range="Recommended: 50+ kg/ha"
                  recommendation="Apply DAP or SSP fertilizer"
                />
                <ParameterCard
                  name="Potassium (K)"
                  value="205 kg/ha"
                  status="good"
                  range="200-280 kg/ha"
                  recommendation="Maintain current levels"
                />
              </CardContent>
            </Card>

            {/* Recommendations */}
            <Card className="border-blue-300 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-blue-800">Improvement Recommendations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <RecommendationItem
                  priority="High"
                  title="Increase Phosphorus"
                  description="Apply 50 kg DAP per hectare before sowing"
                  color="red"
                />
                <RecommendationItem
                  priority="Medium"
                  title="Add Organic Matter"
                  description="Apply 5-10 tonnes of well-decomposed FYM per hectare"
                  color="orange"
                />
                <RecommendationItem
                  priority="Low"
                  title="Maintain pH"
                  description="Continue current practices. Test again after 6 months"
                  color="green"
                />
              </CardContent>
            </Card>

            {/* Suitable Crops */}
            <Card className="border-green-300 shadow-md">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">Best Crops for Your Soil</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <CropSuitability crop="Cotton" suitability={95} />
                <CropSuitability crop="Soybean" suitability={90} />
                <CropSuitability crop="Wheat" suitability={85} />
                <CropSuitability crop="Sugarcane" suitability={82} />
                <CropSuitability crop="Maize" suitability={80} />
              </CardContent>
            </Card>

            <Button 
              onClick={() => setHasAnalyzed(false)}
              className="w-full h-12 bg-amber-600 hover:bg-amber-700"
            >
              Test Again
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

function ParameterCard({ name, value, status, range, recommendation }: {
  name: string;
  value: string;
  status: 'optimal' | 'good' | 'low' | 'high';
  range: string;
  recommendation: string;
}) {
  const statusColors = {
    optimal: { bg: 'bg-green-50', text: 'text-green-700', badge: 'bg-green-600' },
    good: { bg: 'bg-blue-50', text: 'text-blue-700', badge: 'bg-blue-600' },
    low: { bg: 'bg-orange-50', text: 'text-orange-700', badge: 'bg-orange-600' },
    high: { bg: 'bg-red-50', text: 'text-red-700', badge: 'bg-red-600' },
  };

  const colors = statusColors[status];

  return (
    <div className={`p-3 ${colors.bg} rounded-lg space-y-2`}>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-800">{name}</p>
        <Badge className={colors.badge}>{status.toUpperCase()}</Badge>
      </div>
      <p className={`text-lg ${colors.text}`}>{value}</p>
      <p className="text-xs text-gray-600">Range: {range}</p>
      <p className="text-xs text-gray-700 flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3" />
        {recommendation}
      </p>
    </div>
  );
}

function RecommendationItem({ priority, title, description, color }: {
  priority: string;
  title: string;
  description: string;
  color: 'red' | 'orange' | 'green';
}) {
  const colors = {
    red: 'bg-red-500',
    orange: 'bg-orange-500',
    green: 'bg-green-500'
  };

  return (
    <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
      <Badge className={`${colors[color]} h-fit`}>{priority}</Badge>
      <div className="flex-1">
        <p className="text-sm text-gray-900">{title}</p>
        <p className="text-xs text-gray-700 mt-1">{description}</p>
      </div>
    </div>
  );
}

function CropSuitability({ crop, suitability }: { crop: string; suitability: number }) {
  return (
    <div className="p-3 bg-green-50 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-gray-800">{crop}</p>
        <span className="text-sm text-green-700">{suitability}%</span>
      </div>
      <div className="bg-white rounded-full h-2">
        <div 
          className="bg-green-500 h-2 rounded-full" 
          style={{ width: `${suitability}%` }}
        ></div>
      </div>
    </div>
  );
}