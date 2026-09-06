import { ArrowLeft, Droplets, Leaf, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { NavigableProps } from '../types';

interface FertilizerRecommendationProps extends NavigableProps {}

interface FertilizerItem {
  name: string;
  quantity: string;
  method: string;
}

interface PlanStage {
  stage: string;
  timing: string;
  organic: FertilizerItem[];
  chemical: FertilizerItem[];
}

const FERTILIZER_PLANS: Record<string, PlanStage[]> = {
  'Cotton': [
    {
      stage: 'Basal (Before Sowing)',
      timing: 'Day 0',
      organic: [
        { name: 'Well-decomposed FYM', quantity: '5-7 tonnes/acre', method: 'Mix with soil during land preparation' }
      ],
      chemical: [
        { name: 'DAP (Di-Ammonium Phosphate)', quantity: '50 kg/acre', method: 'Apply and mix in soil' },
        { name: 'Potash (MOP)', quantity: '25 kg/acre', method: 'Apply and mix in soil' }
      ]
    },
    {
      stage: 'First Top Dressing',
      timing: '20-25 days after sowing',
      organic: [
        { name: 'Neem Cake', quantity: '100 kg/acre', method: 'Apply near plant base' }
      ],
      chemical: [
        { name: 'Urea', quantity: '25 kg/acre', method: 'Apply in rows between plants and irrigate' }
      ]
    },
    {
      stage: 'Second Top Dressing',
      timing: '40-45 days after sowing',
      organic: [
        { name: 'Vermicompost', quantity: '500 kg/acre', method: 'Apply around plants' }
      ],
      chemical: [
        { name: 'Urea', quantity: '25 kg/acre', method: 'Apply and irrigate immediately' },
        { name: '19:19:19 (NPK)', quantity: '10 kg/acre', method: 'Foliar spray (dissolve in water)' }
      ]
    }
  ],
  'Wheat': [
    {
      stage: 'Basal Application',
      timing: 'At sowing',
      organic: [
        { name: 'Compost', quantity: '4 tonnes/acre', method: 'Spread evenly' }
      ],
      chemical: [
        { name: 'DAP', quantity: '55 kg/acre', method: 'Drill below seed' },
        { name: 'MOP', quantity: '20 kg/acre', method: 'Broadcast' }
      ]
    },
    {
      stage: 'Crown Root Initiation',
      timing: '20-25 DAS',
      organic: [],
      chemical: [
        { name: 'Urea', quantity: '45 kg/acre', method: 'Top dressing before irrigation' },
        { name: 'Zinc Sulfate', quantity: '10 kg/acre', method: 'Soil application' }
      ]
    },
    {
      stage: 'Booting Stage',
      timing: '55-60 DAS',
      organic: [],
      chemical: [
        { name: 'Urea', quantity: '45 kg/acre', method: 'Top dressing' }
      ]
    }
  ],
  'Soybean': [
    {
      stage: 'Basal Dose',
      timing: 'At sowing',
      organic: [
        { name: 'FYM', quantity: '5 tonnes/acre', method: 'Soil incorporation' }
      ],
      chemical: [
        { name: 'DAP', quantity: '50 kg/acre', method: 'Drill with seed' },
        { name: 'Sulphur', quantity: '10 kg/acre', method: 'Soil application' }
      ]
    },
    {
      stage: 'Flowering Stage',
      timing: '30-35 DAS',
      organic: [
        { name: 'Vermiwash', quantity: '10%', method: 'Foliar spray' }
      ],
      chemical: [
        { name: '19:19:19', quantity: '5g/L water', method: 'Foliar spray' }
      ]
    }
  ]
};

const defaultPlan = FERTILIZER_PLANS['Cotton'];

export default function FertilizerRecommendation({ onBack, selectedField }: FertilizerRecommendationProps & { selectedField: { crop: string } }) {
  const currentPlan = FERTILIZER_PLANS[selectedField?.crop] || defaultPlan;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-blue-700 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl">Fertilizer Recommendation</h1>
            <p className="text-sm text-blue-100">For {selectedField?.crop || 'Selected'} Crop</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Crop Info */}
        <Card className="border-green-200 bg-green-50 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Leaf className="w-8 h-8 text-green-600" />
              <div className="flex-1">
                <p className="text-sm text-gray-700">Selected Crop</p>
                <p className="text-lg text-green-800">{selectedField?.crop}</p>
              </div>
              <Badge className="bg-green-600">Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Fertilizer Timeline */}
        <div className="space-y-3">
          <h2 className="text-lg text-gray-800">Fertilizer Application Plan</h2>
          
          {currentPlan.map((plan, index) => (
            <Card key={index} className="shadow-md border-l-4 border-l-blue-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{plan.stage}</CardTitle>
                    <p className="text-xs text-gray-600 mt-1">⏰ {plan.timing}</p>
                  </div>
                  <Badge variant="outline" className="text-blue-700 border-blue-300">
                    Stage {index + 1}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Organic Options */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-green-600" />
                    <h4 className="text-sm text-green-800">Organic Options</h4>
                  </div>
                  <div className="space-y-2">
                    {plan.organic.map((item, idx) => (
                      <div key={idx} className="p-3 bg-green-50 rounded-lg text-sm">
                        <p className="text-green-900">{item.name}</p>
                        <p className="text-xs text-gray-700 mt-1">Quantity: {item.quantity}</p>
                        <p className="text-xs text-gray-600 mt-1">Method: {item.method}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chemical Options */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-600" />
                    <h4 className="text-sm text-blue-800">Chemical Fertilizers</h4>
                  </div>
                  <div className="space-y-2">
                    {plan.chemical.map((item, idx) => (
                      <div key={idx} className="p-3 bg-blue-50 rounded-lg text-sm">
                        <p className="text-blue-900">{item.name}</p>
                        <p className="text-xs text-gray-700 mt-1">Quantity: {item.quantity}</p>
                        <p className="text-xs text-gray-600 mt-1">Method: {item.method}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Cost Estimate */}
        <Card className="border-purple-300 bg-purple-50 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Estimated Cost</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-700">Organic Fertilizers</span>
              <span className="text-sm text-gray-900">₹8,000 - ₹10,000</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-white rounded-lg">
              <span className="text-sm text-gray-700">Chemical Fertilizers</span>
              <span className="text-sm text-gray-900">₹6,000 - ₹8,000</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-200 rounded-lg">
              <span className="text-sm text-purple-900">Total (per acre)</span>
              <span className="text-base text-purple-900">₹14,000 - ₹18,000</span>
            </div>
          </CardContent>
        </Card>

        {/* Best Practices */}
        <Card className="border-amber-300 bg-amber-50 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Best Practices</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="text-gray-800">Apply fertilizers in the morning or evening</p>
                <p className="text-xs text-gray-600 mt-1">Avoid application during peak sun hours</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="text-gray-800">Ensure soil moisture before application</p>
                <p className="text-xs text-gray-600 mt-1">Irrigate if soil is dry</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="text-gray-800">Mix organic and chemical for best results</p>
                <p className="text-xs text-gray-600 mt-1">Improves soil health and crop yield</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <p className="text-gray-800">Don't over-fertilize</p>
                <p className="text-xs text-gray-600 mt-1">Excess can harm plants and soil</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Safety Warning */}
        <Card className="border-red-300 bg-red-50 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div className="text-sm text-red-900">
                <p className="mb-1">Safety Precautions</p>
                <ul className="text-xs text-red-800 space-y-1">
                  <li>• Wear gloves and mask while handling chemical fertilizers</li>
                  <li>• Store fertilizers in a cool, dry place away from children</li>
                  <li>• Wash hands thoroughly after application</li>
                  <li>• Follow manufacturer's instructions carefully</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
