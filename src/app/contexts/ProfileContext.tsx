import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProfileData, ProfileContextType } from '../types';

const defaultProfile: ProfileData = {
  name: 'Ramesh Patil',
  farmerId: 'MH2024001',
  phone: '+91 98765 43210',
  email: 'ramesh.patil@example.com',
  village: 'Solapur',
  pinCode: '413002',
  totalLand: 50,
  numFields: 3,
  irrigationType: 'Drip',
  waterAvailability: 'Medium',
  farmingExperience: 10,
  seasonalBudget: 100000,
  riskPreference: 'Balanced',
  preferredCrops: ['Cotton', 'Wheat', 'Soybean'],
  farmingType: 'Mixed',
  language: 'English',
  notificationsEnabled: true,
  activeCrops: 3,
  seasonEarnings: 280000,
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<ProfileData>(() => {
    const stored = localStorage.getItem('farmerProfile');
    return stored ? { ...defaultProfile, ...JSON.parse(stored) } : defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem('farmerProfile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (data: Partial<ProfileData>) => {
    setProfile(prev => ({ ...prev, ...data }));
  };

  const resetProfile = () => {
    setProfile(defaultProfile);
    localStorage.removeItem('farmerProfile');
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, resetProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider');
  }
  return context;
}
