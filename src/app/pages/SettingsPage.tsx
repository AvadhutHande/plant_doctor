import { useNavigate } from 'react-router';
import { useState } from 'react';
import {
  ChevronRight,
  Bell,
  Globe,
  Moon,
  Shield,
  HelpCircle,
  Info,
  Trash2,
  Download,
  Upload,
  AlertTriangle,
  Check,
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { toast } from 'sonner';
import { useProfile } from '../contexts/ProfileContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../translations';

export default function SettingsPage() {
  const navigate = useNavigate();
  const { profile, updateProfile, resetProfile } = useProfile();
  const { t, language, changeLanguage } = useLanguage();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);

  const handleExportData = () => {
    const dataStr = JSON.stringify(profile, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `farming-data-${Date.now()}.json`;
    link.click();
    toast.success(t('messages.uploadSuccess'));
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const data = JSON.parse(event.target.result);
          updateProfile(data);
          toast.success(t('messages.uploadSuccess'));
        } catch (error) {
          toast.error(t('messages.uploadError'));
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleClearData = () => {
    resetProfile();
    toast.success(t('messages.deleteSuccess'));
  };

  const toggleNotification = (key: string, value: boolean) => {
    toast.info(`${key} ${t('settings.notifications')} ${value ? 'enabled' : 'disabled'}`);
  };

  const handleLanguageChange = (newLanguage: Language) => {
    changeLanguage(newLanguage);
    setIsLanguageDialogOpen(false);
    toast.success(t('messages.saveSuccess'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-green-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <h1 className="text-xl font-semibold">{t('settings.title')}</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Notifications */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Bell className="w-5 h-5 text-green-600" />
            {t('settings.notifications')}
          </h2>
          <Card>
            <CardContent className="p-4 space-y-4">
              <SettingToggle
                label={t('settings.pushNotifications')}
                description={t('common.info')}
                checked={profile.notificationsEnabled}
                onChange={(checked) => {
                  updateProfile({ notificationsEnabled: checked });
                  toast.success(`${t('settings.notifications')} ${checked ? 'enabled' : 'disabled'}`);
                }}
              />
              <SettingToggle
                label={t('settings.weatherAlerts')}
                description={t('weather.weatherAlert')}
                checked={true}
                onChange={(checked) => toggleNotification('Weather', checked)}
              />
              <SettingToggle
                label={t('settings.cropReminders')}
                description={t('common.info')}
                checked={true}
                onChange={(checked) => toggleNotification('Crop', checked)}
              />
              <SettingToggle
                label={t('settings.marketUpdates')}
                description={t('market.marketTrends')}
                checked={true}
                onChange={(checked) => toggleNotification('Market', checked)}
              />
            </CardContent>
          </Card>
        </section>

        {/* Language & Display */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            {t('settings.languageDisplay')}
          </h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <Dialog open={isLanguageDialogOpen} onOpenChange={setIsLanguageDialogOpen}>
                <DialogTrigger asChild>
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="p-2 bg-gray-50 rounded-lg">
                      <Globe className="w-5 h-5 text-gray-500" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-800">{t('profile.language')}</p>
                      <p className="text-xs text-gray-600">{language}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
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
              <SettingToggle
                label={t('settings.darkMode')}
                description={t('common.info')}
                icon={<Moon className="w-5 h-5 text-gray-500" />}
                checked={isDarkMode}
                onChange={setIsDarkMode}
              />
            </CardContent>
          </Card>
        </section>

        {/* Data & Privacy */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Shield className="w-5 h-5 text-purple-600" />
            {t('settings.dataPrivacy')}
          </h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <SettingItem
                icon={<Download className="w-5 h-5 text-blue-600" />}
                label={t('settings.exportData')}
                value={t('common.download')}
                onClick={handleExportData}
              />
              <SettingItem
                icon={<Upload className="w-5 h-5 text-green-600" />}
                label={t('settings.importData')}
                value={t('common.upload')}
                onClick={handleImportData}
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium text-gray-800">{t('settings.clearData')}</p>
                      <p className="text-xs text-gray-600">{t('common.info')}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      {t('settings.clearData')}?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {t('messages.cannotUndo')}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t('common.cancel')}</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleClearData}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      {t('common.delete')}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </section>

        {/* Help & Support */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-orange-600" />
            {t('settings.helpSupport')}
          </h2>
          <Card>
            <CardContent className="p-4 space-y-3">
              <SettingItem
                icon={<HelpCircle className="w-5 h-5 text-gray-500" />}
                label={t('settings.helpCenter')}
                value={t('common.info')}
                onClick={() => toast.info(t('settings.helpCenter'))}
              />
              <SettingItem
                icon={<Info className="w-5 h-5 text-gray-500" />}
                label={t('settings.aboutApp')}
                value={t('settings.version') + ' 1.0'}
                onClick={() => {
                  toast.info('Smart Farming Advisory System v1.0');
                }}
              />
            </CardContent>
          </Card>
        </section>

        {/* App Info */}
        <div className="text-center text-sm text-gray-500 pt-4 pb-8">
          <p className="font-medium">Smart Farming Advisory App</p>
          <p className="text-xs mt-1">{t('settings.version')} 1.0.0 (Build 2026.02.19)</p>
          <p className="text-xs mt-1">© 2026 All rights reserved</p>
        </div>
      </div>
    </div>
  );
}

function SettingItem({
  icon,
  label,
  value,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
      <div className="flex-1 text-left">
        <p className="text-sm font-medium text-gray-800">{label}</p>
        <p className="text-xs text-gray-600">{value}</p>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-400" />
    </button>
  );
}

function SettingToggle({
  icon,
  label,
  description,
  checked,
  onChange,
}: {
  icon?: React.ReactNode;
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center gap-3 flex-1">
        {icon && <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>}
        <div>
          <Label className="text-sm font-medium text-gray-800">{label}</Label>
          <p className="text-xs text-gray-600">{description}</p>
        </div>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}