import { TrendingUp, Wallet, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from './ui/card';
import { useLanguage } from '../contexts/LanguageContext';
import { FieldAwareProps } from '../types';

export default function Market({ selectedField }: FieldAwareProps) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const getMarketPrice = (crop: string) => {
    switch(crop) {
      case 'Cotton': return '₹6,250';
      case 'Wheat': return '₹2,450';
      case 'Soybean': return '₹4,800';
      default: return '₹3,000';
    }
  };

  const currentPrice = getMarketPrice(selectedField.crop);

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl text-green-800">{t('market.title')} & Income</h1>
        <p className="text-gray-600">{t('market.marketTrends')} for {selectedField.crop}</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs opacity-90">{t('market.todayPrices')} {selectedField.crop}</p>
            <p className="text-2xl">{currentPrice}</p>
            <p className="text-xs opacity-90">{t('market.pricePerQuintal')}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md">
          <CardContent className="p-4 space-y-1">
            <p className="text-xs opacity-90">This Month</p>
            <p className="text-2xl">+12%</p>
            <p className="text-xs opacity-90">price increase</p>
          </CardContent>
        </Card>
      </div>

      {/* Market Tools */}
      <div className="space-y-3">
        <h2 className="text-lg text-gray-800">{t('market.title')} Tools</h2>
        
        <Card 
          className="shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/app/market/prices')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-8 h-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-base text-gray-800">{t('market.viewAllPrices')}</p>
                  <p className="text-sm text-gray-600">{t('market.marketTrends')}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        <Card 
          className="shadow-md cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => navigate('/app/market/income-comparison')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-50 rounded-lg">
                  <Wallet className="w-8 h-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-base text-gray-800">{t('market.incomeComparison')}</p>
                  <p className="text-sm text-gray-600">{t('market.compareIncome')}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Crops */}
      <Card className="border-green-200 shadow-md">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-base text-gray-800">Top Performing Crops (This Season)</h3>
          <div className="space-y-2">
            <CropPerformance crop="Cotton" profit="+18%" color="green" />
            <CropPerformance crop="Soybean" profit="+12%" color="green" />
            <CropPerformance crop="Wheat" profit="+8%" color="green" />
            <CropPerformance crop="Sugarcane" profit="-3%" color="red" />
          </div>
        </CardContent>
      </Card>

      {/* Market Tips */}
      <Card className="border-blue-200 bg-blue-50 shadow-md">
        <CardContent className="p-4 space-y-2">
          <h3 className="text-base text-blue-900">{t('market.sellingTips')}</h3>
          <ul className="space-y-1 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Check multiple mandi prices before selling</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Consider storage if prices are expected to rise</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Sell gradually instead of all at once</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600">•</span>
              <span>Use government MSP as a safety net</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function CropPerformance({ crop, profit, color }: { crop: string; profit: string; color: 'green' | 'red' }) {
  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <p className="text-sm text-gray-800">{crop}</p>
      <p className={`text-sm ${color === 'green' ? 'text-green-600' : 'text-red-600'}`}>
        {profit}
      </p>
    </div>
  );
}