import { Sun, Cloud, CloudRain, Wind, Droplets, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useProfile } from '../contexts/ProfileContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FieldAwareProps } from '../types';

export default function Weather({ selectedField }: FieldAwareProps) {
  const { profile } = useProfile();
  const { t } = useLanguage();
  
  // Generate slightly different weather data based on field ID to simulate local variations
  const baseTemp = 32 + (parseInt(selectedField.id) % 3);
  
  const weeklyForecast = [
    { day: 'Mon', temp: baseTemp, condition: 'sunny', icon: Sun, rain: 10 },
    { day: 'Tue', temp: baseTemp - 1, condition: 'cloudy', icon: Cloud, rain: 20 },
    { day: 'Wed', temp: baseTemp - 4, condition: 'rainy', icon: CloudRain, rain: 80 },
    { day: 'Thu', temp: baseTemp - 3, condition: 'rainy', icon: CloudRain, rain: 70 },
    { day: 'Fri', temp: baseTemp - 2, condition: 'cloudy', icon: Cloud, rain: 30 },
    { day: 'Sat', temp: baseTemp + 1, condition: 'sunny', icon: Sun, rain: 5 },
    { day: 'Sun', temp: baseTemp + 2, condition: 'sunny', icon: Sun, rain: 0 },
  ];

  // Crop specific alerts
  const getAlerts = (crop: string) => {
    const commonAlerts = [
      {
        type: 'info',
        title: 'Temperature Rise',
        description: 'Temperature expected to rise after Thursday',
        tips: [
          'Increase irrigation frequency',
          'Monitor crop water stress',
          'Apply mulching if needed'
        ]
      }
    ];

    if (crop === 'Cotton') {
      return [
        {
          type: 'warning',
          title: 'Pink Bollworm Alert',
          description: 'High humidity favors pest attack in Cotton.',
          tips: [
            'Install pheromone traps',
            'Inspect flower buds',
            'Spray neem oil if needed'
          ]
        },
        ...commonAlerts
      ];
    }
    
    if (crop === 'Wheat') {
      return [
        {
          type: 'warning',
          title: 'Yellow Rust Warning',
          description: 'Cool and humid weather favors rust spread.',
          tips: [
            'Monitor leaves for yellow streaks',
            'Avoid excess nitrogen',
            'Spray Propiconazole if severe'
          ]
        },
        ...commonAlerts
      ];
    }

    if (crop === 'Soybean') {
      return [
        {
          type: 'warning',
          title: 'Heavy Rainfall Alert',
          description: 'Expected rainfall may cause waterlogging.',
          tips: [
            'Ensure proper drainage',
            'Delay chemical application',
            'Check for root rot signs'
          ]
        },
        ...commonAlerts
      ];
    }

    return commonAlerts;
  };

  const currentAlerts = getAlerts(selectedField.crop);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl text-green-800">Weather & Alerts</h1>
        <p className="text-gray-600">{profile.village}, Maharashtra • {selectedField.name}</p>
      </div>

      {/* Current Weather */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
        <CardContent className="p-6 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Today, Feb 7</p>
              <div className="flex items-center gap-2 my-2">
                <Sun className="w-16 h-16" />
                <span className="text-5xl">{baseTemp}°C</span>
              </div>
              <p className="text-lg">Clear Sky</p>
            </div>
            <div className="text-right space-y-2">
              <div className="text-sm">
                <p className="opacity-75">High / Low</p>
                <p className="text-xl">{baseTemp + 2}° / {baseTemp - 8}°</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
            <div className="text-center">
              <Wind className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs opacity-75">Wind</p>
              <p className="text-sm">12 km/h</p>
            </div>
            <div className="text-center">
              <Droplets className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs opacity-75">Humidity</p>
              <p className="text-sm">65%</p>
            </div>
            <div className="text-center">
              <CloudRain className="w-6 h-6 mx-auto mb-1" />
              <p className="text-xs opacity-75">Rain</p>
              <p className="text-sm">10%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Forecast */}
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">7-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-2">
          {weeklyForecast.map((forecast, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3 flex-1">
                <p className="w-12 text-sm text-gray-700">{forecast.day}</p>
                <forecast.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <CloudRain className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{forecast.rain}%</span>
                </div>
                <p className="text-lg text-gray-800 w-12 text-right">{forecast.temp}°</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Weather Alerts & Tips */}
      <div className="space-y-3">
        <h2 className="text-lg text-gray-800">Weather Alerts & Tips for {selectedField.crop}</h2>
        
        {currentAlerts.map((alert, index) => (
          <Card
            key={index}
            className={`shadow-md ${
              alert.type === 'warning' 
                ? 'border-orange-300 bg-orange-50' 
                : 'border-blue-300 bg-blue-50'
            }`}
          >
            <CardContent className="p-4 space-y-3">
              <div className="flex items-start gap-3">
                {alert.type === 'warning' ? (
                  <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
                ) : (
                  <Info className="w-6 h-6 text-blue-600 mt-1" />
                )}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-base text-gray-900">{alert.title}</h3>
                    <Badge 
                      className={
                        alert.type === 'warning' 
                          ? 'bg-orange-500' 
                          : 'bg-blue-500'
                      }
                    >
                      {alert.type === 'warning' ? 'Alert' : 'Info'}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{alert.description}</p>
                </div>
              </div>

              <div className="pl-9">
                <p className="text-sm text-gray-800 mb-2">Recommended Actions:</p>
                <ul className="space-y-1">
                  {alert.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Disaster Prevention Tips */}
      <Card className="shadow-md border-green-200">
        <CardHeader>
          <CardTitle className="text-lg">General Disaster Prevention</CardTitle>
        </CardHeader>
        <CardContent className="p-4 pt-0 space-y-2">
          <TipItem title="Flood Prevention" tip="Create proper drainage channels and embankments" />
          <TipItem title="Drought Management" tip="Install drip irrigation and rainwater harvesting" />
          <TipItem title="Storm Protection" tip="Provide windbreaks and support structures for crops" />
          <TipItem title="Heatwave Care" tip="Use shade nets and increase irrigation during peak heat" />
        </CardContent>
      </Card>
    </div>
  );
}

function TipItem({ title, tip }: { title: string; tip: string }) {
  return (
    <div className="p-3 bg-green-50 rounded-lg">
      <p className="text-sm text-green-800">{title}</p>
      <p className="text-xs text-gray-700 mt-1">{tip}</p>
    </div>
  );
}