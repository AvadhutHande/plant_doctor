import { Camera, TestTube, Sprout, Droplets, CalendarDays, ChevronRight, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from './ui/card';
import { useProfile } from '../contexts/ProfileContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FieldAwareProps } from '../types';

export default function AITools({ selectedField }: FieldAwareProps) {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { t } = useLanguage();

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl text-green-800">{t('aiTools.title')}</h1>
        <p className="text-gray-600">{t('aiTools.subtitle')} {selectedField.crop}</p>
      </div>

      {/* AI Tools Grid */}
      <div className="grid grid-cols-2 gap-3">
        <AIToolCard
          icon={<Camera className="w-10 h-10 text-purple-600" />}
          title={t('aiTools.diseaseDetection')}
          subtitle={t('aiTools.diseaseSubtitle')}
          color="bg-purple-50"
          onClick={() => navigate('/app/ai-tools/disease-detection')}
        />
        <AIToolCard
          icon={<TestTube className="w-10 h-10 text-amber-600" />}
          title={t('aiTools.soilAnalysis')}
          subtitle={t('aiTools.soilSubtitle')}
          color="bg-amber-50"
          onClick={() => navigate('/app/ai-tools/soil-analysis')}
        />
        <AIToolCard
          icon={<Sprout className="w-10 h-10 text-green-600" />}
          title={t('aiTools.cropSuggest')}
          subtitle={t('aiTools.cropSubtitle')}
          color="bg-green-50"
          onClick={() => navigate('/app/ai-tools/crop-recommendation')}
        />
        <AIToolCard
          icon={<Droplets className="w-10 h-10 text-blue-600" />}
          title={t('aiTools.fertilizerReco')}
          subtitle={t('aiTools.fertilizerSubtitle')}
          color="bg-blue-50"
          onClick={() => navigate('/app/ai-tools/fertilizer')}
        />
      </div>

      {/* Smart Advisory */}
      <Card 
        className="shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => navigate('/app/ai-tools/advisory')}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-50 rounded-lg">
                <CalendarDays className="w-8 h-8 text-teal-600" />
              </div>
              <div>
                <p className="text-base text-gray-800">{t('aiTools.smartAdvisory')}</p>
                <p className="text-sm text-gray-600">{t('aiTools.smartAdvisoryDesc')}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Carbon Credits - NEW */}
      <Card 
        className="shadow-md cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-r from-green-50 to-emerald-50 border-green-200"
        onClick={() => navigate('/app/ai-tools/carbon-credits')}
      >
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-base text-gray-800 font-medium">{t('aiTools.carbonCredits')}</p>
                  <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded-full">New</span>
                </div>
                <p className="text-sm text-gray-600">{t('aiTools.carbonCreditsDesc')}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Info Section */}
      <Card className="border-green-200 bg-green-50 shadow-md">
        <CardContent className="p-4 space-y-2">
          <h3 className="text-base text-green-900">{t('aiTools.howAiHelps')}</h3>
          <ul className="space-y-1 text-sm text-green-800">
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <span>{t('aiTools.aiFeature1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <span>{t('aiTools.aiFeature2')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <span>{t('aiTools.aiFeature3')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <span>{t('aiTools.aiFeature4')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600">•</span>
              <span>{t('aiTools.aiFeature5')}</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

function AIToolCard({ icon, title, subtitle, color, onClick }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <Card 
      className={`${color} border-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow`}
      onClick={onClick}
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex justify-center">{icon}</div>
        <div className="text-center">
          <p className="text-sm text-gray-800">{title}</p>
          <p className="text-xs text-gray-600 mt-1">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}