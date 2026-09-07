import { useNavigate } from 'react-router';
import {
  CloudRain,
  AlertTriangle,
  Camera,
  TestTube,
  Sprout,
  Droplets,
  CalendarDays,
  TrendingUp,
  Wallet,
  FileText,
  ChevronRight,
  Sun,
  Wind,
  Activity,
  Edit,
  Globe,
  Layers,
  CheckCircle2,
  Circle,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useProfile } from '../contexts/ProfileContext';
import { useFields } from '../contexts/FieldsContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Field, FieldAwareProps } from '../types';
import { Language } from '../translations';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

export default function Dashboard({ selectedField }: FieldAwareProps) {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { fields } = useFields();
  const { t, language, changeLanguage } = useLanguage();
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);

  // Extract first name for greeting
  const firstName = profile.name.split(' ')[0] || 'Farmer';

  // Calculate stats
  const activeFieldsCount = fields.filter(f => f.isActive && f.crop !== 'Fallow').length;
  const fallowFieldsCount = fields.filter(f => !f.isActive || f.crop === 'Fallow').length;

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage);
    setIsLanguageDialogOpen(false);
    toast.success(t('messages.saveSuccess'));
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-green-800">{t('dashboard.subtitle')}, {firstName}!</h1>
            <p className="text-gray-600">{profile.village}, Maharashtra</p>
          </div>
          {/* Language Selector Button */}
          <Dialog open={isLanguageDialogOpen} onOpenChange={setIsLanguageDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 border-green-300 hover:bg-green-50"
              >
                <Globe className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">{language}</span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('profile.language')}</DialogTitle>
                <DialogDescription>
                  {t('common.select')} {t('profile.language')}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-4">
                {(['English', 'Hindi', 'Marathi'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                      language === lang
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <p className="font-medium text-gray-900">{lang}</p>
                        <p className="text-xs text-gray-500">
                          {lang === 'English' ? 'English' : lang === 'Hindi' ? 'हिंदी' : 'मराठी'}
                        </p>
                      </div>
                    </div>
                    {language === lang && (
                      <Check className="w-5 h-5 text-green-600" />
                    )}
                  </button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Farm Overview Card */}
      <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-orange-200 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800">{t('dashboard.title')}</h3>
            <Button
              onClick={() => navigate('/app/dashboard/field-management')}
              size="sm"
              variant="outline"
              className="h-8 text-xs border-orange-300 hover:bg-orange-100"
            >
              <Edit className="w-3 h-3 mr-1" />
              {t('dashboard.manageFields')}
            </Button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">{t('dashboard.totalLand')}</p>
              <p className="text-lg font-bold text-gray-800">{profile.totalLand}</p>
              <p className="text-xs text-gray-500">{t('profile.guntha')}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">{t('dashboard.activeCrops')}</p>
              <p className="text-lg font-bold text-green-700">{activeFieldsCount}</p>
              <p className="text-xs text-gray-500">{t('profile.fields')}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 mb-1">{t('dashboard.fallow')}</p>
              <p className="text-lg font-bold text-orange-700">{fallowFieldsCount}</p>
              <p className="text-xs text-gray-500">{t('profile.fields')}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Field Info Card */}
      <Card 
        className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => navigate('/app/dashboard/field-details')}
      >
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{t('dashboard.currentField')}</p>
              <h3 className="text-xl font-semibold">{selectedField.name}</h3>
            </div>
            <ChevronRight className="w-6 h-6" />
          </div>
          <div className="grid grid-cols-3 gap-3 pt-2 border-t border-green-500">
            <div>
              <p className="text-xs opacity-80">{t('dashboard.area')}</p>
              <p className="text-sm font-medium">{selectedField.size}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">{t('dashboard.crop')}</p>
              <p className="text-sm font-medium">{selectedField.crop}</p>
            </div>
            <div>
              <p className="text-xs opacity-80">{t('dashboard.stage')}</p>
              <p className="text-sm font-medium">{selectedField.stage}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Fields Overview */}
      <Card className="border-gray-200 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              <Layers className="w-4 h-4 text-green-600" />
              All Fields
            </h3>
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-green-700 hover:text-green-800 hover:bg-green-50 px-2"
              onClick={() => navigate('/app/dashboard/field-management')}
            >
              Manage <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
          <div className="space-y-2">
            {fields.map((field) => {
              const isFallow = !field.isActive || field.crop === 'Fallow';
              const isSelected = field.id === selectedField.id;
              return (
                <button
                  key={field.id}
                  onClick={() => navigate('/app/dashboard/field-details')}
                  className={`w-full flex items-center gap-3 p-2.5 rounded-lg border transition-all text-left ${
                    isSelected
                      ? 'border-green-400 bg-green-50'
                      : isFallow
                      ? 'border-gray-200 bg-gray-50/60 hover:border-gray-300'
                      : 'border-green-100 bg-white hover:border-green-300 hover:bg-green-50/40'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isFallow ? 'bg-gray-200' : 'bg-green-100'}`}>
                    {isFallow
                      ? <Circle className="w-4 h-4 text-gray-400" />
                      : <CheckCircle2 className="w-4 h-4 text-green-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-gray-800 truncate">{field.name}</span>
                      {isSelected && <span className="text-[10px] bg-green-600 text-white px-1.5 py-0.5 rounded-full">Selected</span>}
                    </div>
                    <span className="text-xs text-gray-500">
                      {field.area} Guntha · {isFallow ? 'No crop' : `${field.crop} – ${field.stage}`}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-300 shrink-0" />
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Weather Card */}
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-sm opacity-90">{t('dashboard.todaysWeather')}</p>
              <div className="flex items-center gap-2">
                <Sun className="w-12 h-12" />
                <span className="text-4xl">32°C</span>
              </div>
              <p className="text-sm opacity-90">{t('dashboard.clearSky')}</p>
            </div>
            <div className="text-right space-y-2">
              <div className="flex items-center gap-1 text-sm">
                <Wind className="w-4 h-4" />
                <span>12 km/h</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <Droplets className="w-4 h-4" />
                <span>65%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crop Health Status */}
      <Card className="border-green-200 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-green-100 rounded-full">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t('dashboard.cropHealth')}</p>
                <p className="text-lg text-green-700">{t('dashboard.goodCondition')}</p>
              </div>
            </div>
            <Badge className="bg-green-500">{t('dashboard.active')}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Alerts */}
      <Card className="border-orange-200 bg-orange-50 shadow-md">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-orange-900">{t('dashboard.alertFor')} {selectedField.crop}</p>
              <p className="text-xs text-orange-700 mt-1">
                {selectedField.crop === 'Cotton' ? t('dashboard.alertCotton') : 
                 selectedField.crop === 'Wheat' ? t('dashboard.alertWheat') :
                 selectedField.crop === 'Soybean' ? t('dashboard.alertSoybean') :
                 t('dashboard.alertGeneral')}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="text-lg text-gray-800">{t('dashboard.quickActions')}</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <QuickActionCard
            icon={<Camera className="w-8 h-8 text-purple-600" />}
            title={t('dashboard.diseaseDetection')}
            subtitle={t('dashboard.aiScan')}
            color="bg-purple-50"
            onClick={() => navigate('/app/ai-tools/disease-detection')}
          />
          <QuickActionCard
            icon={<TestTube className="w-8 h-8 text-amber-600" />}
            title={t('dashboard.soilAnalysis')}
            subtitle={t('dashboard.testSoil')}
            color="bg-amber-50"
            onClick={() => navigate('/app/ai-tools/soil-analysis')}
          />
          <QuickActionCard
            icon={<Sprout className="w-8 h-8 text-green-600" />}
            title={t('dashboard.cropSuggest')}
            subtitle={t('dashboard.aiRecommend')}
            color="bg-green-50"
            onClick={() => navigate('/app/ai-tools/crop-recommendation')}
          />
          <QuickActionCard
            icon={<Droplets className="w-8 h-8 text-blue-600" />}
            title={t('dashboard.fertilizer')}
            subtitle={t('dashboard.getAdvice')}
            color="bg-blue-50"
            onClick={() => navigate('/app/ai-tools/fertilizer')}
          />
        </div>
      </div>

      {/* All Features */}
      <div className="space-y-3">
        <h2 className="text-lg text-gray-800">{t('dashboard.allFeatures')}</h2>
        
        <FeatureListItem
          icon={<CalendarDays className="w-6 h-6 text-green-600" />}
          title={t('dashboard.smartAdvisory')}
          subtitle={t('dashboard.cropLifecycle')}
          onClick={() => navigate('/app/ai-tools/advisory')}
        />
        <FeatureListItem
          icon={<TrendingUp className="w-6 h-6 text-blue-600" />}
          title={t('dashboard.marketPrices')}
          subtitle={t('dashboard.pricePredictions')}
          onClick={() => navigate('/app/market/prices')}
        />
        <FeatureListItem
          icon={<Wallet className="w-6 h-6 text-purple-600" />}
          title={t('dashboard.incomeComparison')}
          subtitle={t('dashboard.compareCropProfits')}
          onClick={() => navigate('/app/market/income-comparison')}
        />
        <FeatureListItem
          icon={<FileText className="w-6 h-6 text-orange-600" />}
          title={t('dashboard.govtSchemes')}
          subtitle={t('dashboard.subsidiesBenefits')}
          onClick={() => navigate('/app/schemes')}
        />
        <FeatureListItem
          icon={<Wallet className="w-6 h-6 text-red-600" />}
          title={t('dashboard.expenseTracker')}
          subtitle={t('dashboard.trackCostsProfits')}
          onClick={() => navigate('/app/expenses')}
        />
        <FeatureListItem
          icon={<CalendarDays className="w-6 h-6 text-teal-600" />}
          title={t('dashboard.cropCalendar')}
          subtitle={t('dashboard.remindersSchedules')}
          onClick={() => navigate('/app/calendar')}
        />
      </div>
    </div>
  );
}

function QuickActionCard({ 
  icon, 
  title, 
  subtitle, 
  color, 
  onClick 
}: { 
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
      <CardContent className="p-4 space-y-2">
        <div className="flex justify-center">{icon}</div>
        <div className="text-center">
          <p className="text-sm text-gray-800">{title}</p>
          <p className="text-xs text-gray-600">{subtitle}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function FeatureListItem({ 
  icon, 
  title, 
  subtitle, 
  onClick 
}: { 
  icon: React.ReactNode; 
  title: string; 
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-md transition-shadow shadow-sm"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              {icon}
            </div>
            <div>
              <p className="text-sm text-gray-800">{title}</p>
              <p className="text-xs text-gray-600">{subtitle}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
}