import { ArrowLeft, Sprout, Droplets, Bug, Calendar, TrendingUp, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { NavigableProps } from '../types';

interface SmartAdvisoryProps extends NavigableProps {}

const cropStages = [
  {
    stage: 'Land Preparation',
    days: 'Before Sowing',
    status: 'completed',
    icon: Sprout,
    tasks: [
      { task: 'Deep ploughing 2-3 times', completed: true },
      { task: 'Apply FYM and mix in soil', completed: true },
      { task: 'Level the field properly', completed: true }
    ],
    weather: 'Ideal: Dry weather for ploughing'
  },
  {
    stage: 'Sowing',
    days: 'Day 1-3',
    status: 'completed',
    icon: Sprout,
    tasks: [
      { task: 'Seed treatment with fungicide', completed: true },
      { task: 'Sow at 60×30 cm spacing', completed: true },
      { task: 'Apply basal fertilizers', completed: true }
    ],
    weather: 'Ideal: Moist soil, no rain expected for 3 days'
  },
  {
    stage: 'Germination & Early Growth',
    days: 'Day 4-25',
    status: 'current',
    icon: Sprout,
    tasks: [
      { task: 'First irrigation at 20-25 days', completed: false },
      { task: 'Thinning and gap filling', completed: false },
      { task: 'Weed management', completed: false }
    ],
    weather: 'Monitor: Avoid heavy rainfall during germination',
    currentAdvice: 'Light irrigation recommended in next 2 days. Weather forecast shows clear sky.'
  },
  {
    stage: 'Vegetative Growth',
    days: 'Day 26-60',
    status: 'upcoming',
    icon: Droplets,
    tasks: [
      { task: 'First top dressing of Urea', completed: false },
      { task: 'Regular irrigation (10-12 days interval)', completed: false },
      { task: 'Monitor for aphids and jassids', completed: false }
    ],
    weather: 'Critical: Adequate moisture needed'
  },
  {
    stage: 'Flowering & Boll Formation',
    days: 'Day 61-120',
    status: 'upcoming',
    icon: Sprout,
    tasks: [
      { task: 'Second top dressing fertilizer', completed: false },
      { task: 'Pest management (bollworm)', completed: false },
      { task: 'Frequent irrigation', completed: false }
    ],
    weather: 'Critical: Avoid moisture stress during flowering'
  },
  {
    stage: 'Maturity & Harvest',
    days: 'Day 150-180',
    status: 'upcoming',
    icon: TrendingUp,
    tasks: [
      { task: 'Stop irrigation 15 days before harvest', completed: false },
      { task: 'Multiple pickings (3-4 times)', completed: false },
      { task: 'Proper storage after picking', completed: false }
    ],
    weather: 'Ideal: Dry weather for harvesting'
  }
];

export default function SmartAdvisory({ onBack }: SmartAdvisoryProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* Header */}
      <div className="bg-teal-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-teal-700 rounded-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl">Smart Farming Advisory</h1>
            <p className="text-sm text-teal-100">Cotton - Lifecycle Guidance</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Current Status */}
        <Card className="border-blue-300 bg-blue-50 shadow-md">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-6 h-6 text-blue-600 mt-1" />
              <div className="flex-1">
                <p className="text-sm text-gray-700">Current Stage</p>
                <p className="text-lg text-blue-900">Germination & Early Growth</p>
                <p className="text-xs text-gray-600 mt-1">Day 22 of 180 • 12% Complete</p>
                <div className="mt-2 bg-white rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="space-y-3">
          <h2 className="text-lg text-gray-800">Crop Lifecycle Timeline</h2>
          
          {cropStages.map((stage, index) => {
            const Icon = stage.icon;
            const isCurrent = stage.status === 'current';
            const isCompleted = stage.status === 'completed';
            
            return (
              <Card 
                key={index} 
                className={`shadow-md ${
                  isCurrent ? 'border-2 border-blue-500 bg-blue-50' : 
                  isCompleted ? 'bg-green-50 border-green-200' : 
                  'bg-gray-50'
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        isCurrent ? 'bg-blue-200' :
                        isCompleted ? 'bg-green-200' :
                        'bg-gray-200'
                      }`}>
                        <Icon className={`w-5 h-5 ${
                          isCurrent ? 'text-blue-700' :
                          isCompleted ? 'text-green-700' :
                          'text-gray-600'
                        }`} />
                      </div>
                      <div>
                        <CardTitle className="text-base">{stage.stage}</CardTitle>
                        <p className="text-xs text-gray-600 mt-1">{stage.days}</p>
                      </div>
                    </div>
                    <Badge className={
                      isCurrent ? 'bg-blue-600' :
                      isCompleted ? 'bg-green-600' :
                      'bg-gray-400'
                    }>
                      {stage.status === 'current' ? 'Current' : 
                       stage.status === 'completed' ? 'Done' : 'Upcoming'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {/* Current Advice (only for current stage) */}
                  {isCurrent && stage.currentAdvice && (
                    <div className="p-3 bg-blue-100 rounded-lg border border-blue-300">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-blue-700 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-blue-900">Action Needed</p>
                          <p className="text-xs text-blue-800 mt-1">{stage.currentAdvice}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tasks */}
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">Tasks:</p>
                    {stage.tasks.map((item, idx) => (
                      <div 
                        key={idx} 
                        className={`flex items-start gap-2 text-sm p-2 rounded ${
                          item.completed ? 'bg-white line-through text-gray-500' : 
                          isCurrent ? 'bg-white' : 'bg-transparent'
                        }`}
                      >
                        <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          item.completed ? 'text-green-600' : 'text-gray-400'
                        }`} />
                        <span>{item.task}</span>
                      </div>
                    ))}
                  </div>

                  {/* Weather Info */}
                  <div className="text-xs text-gray-600 bg-white p-2 rounded border-l-2 border-amber-400">
                    <span className="text-amber-700">☀️ {stage.weather}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* General Tips */}
        <Card className="border-green-300 bg-green-50 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg text-green-800">General Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Monitor weather updates daily</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Scout fields regularly for pests and diseases</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Keep records of all farming activities</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-gray-700">Adjust plan based on actual weather conditions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
