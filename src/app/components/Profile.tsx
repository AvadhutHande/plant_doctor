import { User, MapPin, Phone, Mail, FileText, Wallet, CalendarDays, LogOut, ChevronRight, Settings, Award, TrendingUp, Map } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { useProfile } from '../contexts/ProfileContext';
import { useFields } from '../contexts/FieldsContext';
import { useLanguage } from '../contexts/LanguageContext';

import { ProfileProps } from '../types';

export default function Profile({ onLogout }: ProfileProps) {
  const navigate = useNavigate();
  const { profile } = useProfile();
  const { fields } = useFields();
  const { t } = useLanguage();

  // Calculate active fields
  const activeFieldsCount = fields.filter(f => f.isActive && f.crop !== 'Fallow').length;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-4 space-y-4 bg-gradient-to-b from-green-50 to-white min-h-screen">
      {/* Profile Header */}
      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center overflow-hidden">
              {profile.profilePicture ? (
                <img src={profile.profilePicture} alt={profile.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-green-600" />
              )}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{profile.name}</h2>
              <p className="text-sm text-green-100">{t('profile.farmerId')}: {profile.farmerId}</p>
              <div className="flex items-center gap-2 mt-1">
                <Award className="w-4 h-4" />
                <span className="text-xs">{profile.farmingExperience} {t('profile.years')} {t('profile.experience')}</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => navigate('/app/profile/edit')}
            className="w-full bg-white text-green-600 hover:bg-green-50 shadow-md"
          >
            <Settings className="w-4 h-4 mr-2" />
            {t('profile.editProfile')}
          </Button>
        </CardContent>
      </Card>

      {/* Personal Info */}
      <Card className="shadow-md">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-base font-semibold text-gray-800 mb-2">{t('profile.personalInfo')}</h3>
          <InfoItem
            icon={<MapPin className="w-5 h-5 text-gray-500" />}
            label={t('profile.village')}
            value={`${profile.village}, ${t('profile.pinCode')}: ${profile.pinCode}`}
          />
          <InfoItem
            icon={<Phone className="w-5 h-5 text-gray-500" />}
            label={t('profile.phone')}
            value={profile.phone}
          />
          {profile.email && (
            <InfoItem
              icon={<Mail className="w-5 h-5 text-gray-500" />}
              label={t('profile.email')}
              value={profile.email}
            />
          )}
        </CardContent>
      </Card>

      {/* Farm Details */}
      <Card className="shadow-md">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-gray-800">{t('profile.farmDetails')}</h3>
            <Button
              onClick={() => navigate('/app/dashboard/field-management')}
              size="sm"
              variant="outline"
              className="h-7 text-xs"
            >
              <Map className="w-3 h-3 mr-1" />
              {t('common.manage')}
            </Button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <DetailBox label={t('profile.totalLand')} value={`${profile.totalLand} ${t('profile.guntha')}`} color="blue" />
            <DetailBox label={t('profile.numFields')} value={`${profile.numFields}`} color="green" />
            <DetailBox label={t('profile.irrigationType')} value={profile.irrigationType} color="cyan" />
            <DetailBox label={t('profile.waterAvailability')} value={profile.waterAvailability} color="indigo" />
          </div>
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">{t('profile.farmingType')}</span>
              <span className="font-medium text-gray-800">{profile.farmingType}</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-1">
              <span className="text-gray-600">{t('profile.riskPreference')}</span>
              <span className="font-medium text-gray-800">{profile.riskPreference}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Farm Stats */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 shadow-md border-0">
          <CardContent className="p-4 text-center space-y-1">
            <TrendingUp className="w-6 h-6 text-blue-700 mx-auto" />
            <p className="text-2xl font-bold text-blue-700">{activeFieldsCount}</p>
            <p className="text-xs text-gray-700">{t('profile.activeCrops')}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 shadow-md border-0">
          <CardContent className="p-4 text-center space-y-1">
            <Wallet className="w-6 h-6 text-green-700 mx-auto" />
            <p className="text-2xl font-bold text-green-700">{formatCurrency(profile.seasonEarnings)}</p>
            <p className="text-xs text-gray-700">{t('profile.thisSeason')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Preferred Crops */}
      {profile.preferredCrops && profile.preferredCrops.length > 0 && (
        <Card className="shadow-md">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">{t('profile.preferredCrops')}</h3>
            <div className="flex flex-wrap gap-2">
              {profile.preferredCrops.map((crop) => (
                <span
                  key={crop}
                  className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                >
                  {crop}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tools & Services */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-800">{t('profile.toolsAndServices')}</h3>

        <MenuCard
          icon={<FileText className="w-6 h-6 text-orange-600" />}
          title={t('profile.governmentSchemes')}
          subtitle={t('profile.viewSubsidies')}
          onClick={() => navigate('/app/schemes')}
        />
        <MenuCard
          icon={<Wallet className="w-6 h-6 text-purple-600" />}
          title={t('profile.expenseTracker')}
          subtitle={t('profile.trackCosts')}
          onClick={() => navigate('/app/expenses')}
        />
        <MenuCard
          icon={<CalendarDays className="w-6 h-6 text-teal-600" />}
          title={t('profile.cropCalendar')}
          subtitle={t('profile.schedules')}
          onClick={() => navigate('/app/calendar')}
        />
        <MenuCard
          icon={<Settings className="w-6 h-6 text-gray-600" />}
          title={t('profile.appSettings')}
          subtitle={t('profile.notifications')}
          onClick={() => navigate('/app/profile/settings')}
        />
      </div>

      {/* Logout Button */}
      <Button
        onClick={onLogout}
        variant="outline"
        className="w-full h-12 text-red-600 border-red-300 hover:bg-red-50 gap-2 shadow-sm"
      >
        <LogOut className="w-5 h-5" />
        Logout
      </Button>

      {/* App Info */}
      <div className="text-center text-sm text-gray-500 pt-4 pb-8">
        <p className="font-medium">Smart Farming Advisory App v1.0</p>
        <p className="text-xs mt-1">© 2026 All rights reserved</p>
        <p className="text-xs mt-2 text-gray-400">
          Language: {profile.language} | Notifications: {profile.notificationsEnabled ? 'On' : 'Off'}
        </p>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-gray-50 rounded-lg">
        {icon}
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-600">{label}</p>
        <p className="text-sm text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
}

function DetailBox({ label, value, color }: { label: string; value: string; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    cyan: 'bg-cyan-50 text-cyan-700 border-cyan-200',
    indigo: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  }[color];

  return (
    <div className={`p-3 rounded-lg border ${colorClasses}`}>
      <p className="text-xs opacity-75 mb-1">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  );
}

function MenuCard({
  icon,
  title,
  subtitle,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-all shadow-sm hover:scale-[1.02]"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gray-50 rounded-lg">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800">{title}</p>
              <p className="text-xs text-gray-600">{subtitle}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </CardContent>
    </Card>
  );
}