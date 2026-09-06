import { useNavigate } from 'react-router';
import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronRight, MapPin, User, Settings, FileText, Plus, Minus, Camera, Loader2, Navigation } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { toast } from 'sonner';
import { useProfile } from '../contexts/ProfileContext';
import { ProfileData } from '../types';

type FormData = Omit<ProfileData, 'farmerId' | 'activeCrops' | 'seasonEarnings'>;

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useProfile();
  const [expandedSection, setExpandedSection] = useState<string | null>('location');
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | undefined>(profile.profilePicture);
  
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      name: profile.name,
      phone: profile.phone,
      email: profile.email,
      village: profile.village,
      pinCode: profile.pinCode,
      totalLand: profile.totalLand,
      numFields: profile.numFields,
      irrigationType: profile.irrigationType,
      waterAvailability: profile.waterAvailability,
      farmingExperience: profile.farmingExperience,
      seasonalBudget: profile.seasonalBudget,
      riskPreference: profile.riskPreference,
      preferredCrops: profile.preferredCrops,
      farmingType: profile.farmingType,
      language: profile.language,
      notificationsEnabled: profile.notificationsEnabled,
      profilePicture: profile.profilePicture,
    }
  });

  const watchedValues = watch();

  useEffect(() => {
    if (profile) {
      reset({
        name: profile.name || '',
        phone: profile.phone || '',
        email: profile.email || '',
        village: profile.village || '',
        pinCode: profile.pinCode || '',
        totalLand: profile.totalLand || 0,
        numFields: profile.numFields || 0,
        irrigationType: profile.irrigationType || 'Drip',
        waterAvailability: profile.waterAvailability || 'Medium',
        farmingExperience: profile.farmingExperience || 0,
        seasonalBudget: profile.seasonalBudget || 0,
        riskPreference: profile.riskPreference || 'Balanced',
        preferredCrops: profile.preferredCrops || [],
        farmingType: profile.farmingType || 'Mixed',
        language: profile.language || 'English',
        notificationsEnabled: profile.notificationsEnabled ?? true,
        profilePicture: profile.profilePicture || '',
      });
    }
  }, [profile, reset]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleDetectLocation = async () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    setIsDetectingLocation(true);
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use reverse geocoding API (OpenStreetMap Nominatim)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          
          if (data.address) {
            const village = data.address.village || data.address.town || data.address.city || '';
            const pinCode = data.address.postcode || '';
            
            setValue('village', village);
            setValue('pinCode', pinCode);
            setValue('coordinates', { lat: latitude, lng: longitude });
            
            toast.success('Location detected successfully!');
          }
        } catch (error) {
          toast.error('Failed to fetch address details');
        } finally {
          setIsDetectingLocation(false);
        }
      },
      (error) => {
        setIsDetectingLocation(false);
        toast.error('Unable to retrieve your location');
      }
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        setValue('profilePicture', result);
        toast.success('Profile picture updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleCrop = (crop: string) => {
    const currentCrops = watchedValues.preferredCrops || [];
    const newCrops = currentCrops.includes(crop)
      ? currentCrops.filter(c => c !== crop)
      : [...currentCrops, crop];
    setValue('preferredCrops', newCrops);
  };

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    updateProfile(data);
    
    toast.success('Profile updated successfully!', {
      description: 'Your changes have been saved.',
    });
    
    setIsSaving(false);
    
    setTimeout(() => {
      navigate(-1);
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      <div className="bg-green-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-green-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <h1 className="text-xl font-semibold">Edit Profile</h1>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {/* Profile Picture Section */}
        <Card className="shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden flex items-center justify-center">
                  {previewImage ? (
                    <img src={previewImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-gray-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 shadow-lg"
                >
                  <Camera className="w-4 h-4" />
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
              <div className="text-center space-y-1 w-full">
                <Input
                  {...register('name', { required: 'Name is required' })}
                  placeholder="Full Name"
                  className="text-center font-semibold"
                />
                {errors.name && (
                  <p className="text-xs text-red-600">{errors.name.message}</p>
                )}
                <p className="text-sm text-gray-600">ID: {profile.farmerId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Info Section */}
        <Card className="shadow-md">
          <CardContent className="p-4 space-y-3">
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input
                {...register('phone', { required: 'Phone is required' })}
                type="tel"
                placeholder="Enter phone number"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input
                {...register('email')}
                type="email"
                placeholder="Enter email (optional)"
                className="h-11"
              />
            </div>
          </CardContent>
        </Card>

        {/* Location Section */}
        <Card className="shadow-md overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('location')}
            className="w-full p-4 flex items-center justify-between bg-green-50 hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-800">Location</span>
            </div>
            <ChevronRight className={`w-5 h-5 transition-transform ${expandedSection === 'location' ? 'rotate-90' : ''}`} />
          </button>
          {expandedSection === 'location' && (
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label>Village/City</Label>
                <Input
                  {...register('village', { required: 'Village is required' })}
                  placeholder="Enter village name"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>PIN Code</Label>
                <Input
                  {...register('pinCode', { required: 'PIN code is required' })}
                  type="text"
                  placeholder="Enter PIN code"
                  className="h-11"
                />
              </div>
              <Button
                type="button"
                onClick={handleDetectLocation}
                disabled={isDetectingLocation}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {isDetectingLocation ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <Navigation className="w-4 h-4 mr-2" />
                    Detect My Location
                  </>
                )}
              </Button>
            </CardContent>
          )}
        </Card>

        {/* Farm Details Section */}
        <Card className="shadow-md overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('farm')}
            className="w-full p-4 flex items-center justify-between bg-amber-50 hover:bg-amber-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-amber-600" />
              <span className="font-semibold text-gray-800">Farm Details</span>
            </div>
            <ChevronRight className={`w-5 h-5 transition-transform ${expandedSection === 'farm' ? 'rotate-90' : ''}`} />
          </button>
          {expandedSection === 'farm' && (
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label>Total Land (Guntha)</Label>
                <Input
                  {...register('totalLand', { 
                    required: 'Total land is required',
                    min: { value: 1, message: 'Must be at least 1' }
                  })}
                  type="number"
                  placeholder="Enter land in guntha"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Number of Fields</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setValue('numFields', Math.max(1, watchedValues.numFields - 1))}
                    className="h-11 w-11"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    {...register('numFields')}
                    type="number"
                    value={watchedValues.numFields}
                    readOnly
                    className="h-11 text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setValue('numFields', watchedValues.numFields + 1)}
                    className="h-11 w-11"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Irrigation Type</Label>
                <Select
                  value={watchedValues.irrigationType}
                  onValueChange={(value) => setValue('irrigationType', value as any)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Drip">Drip Irrigation</SelectItem>
                    <SelectItem value="Sprinkler">Sprinkler</SelectItem>
                    <SelectItem value="Canal">Canal</SelectItem>
                    <SelectItem value="Rainfed">Rainfed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Water Availability</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Medium', 'High'] as const).map((level) => (
                    <Button
                      key={level}
                      type="button"
                      variant={watchedValues.waterAvailability === level ? 'default' : 'outline'}
                      className={`h-11 ${
                        watchedValues.waterAvailability === level
                          ? 'bg-blue-600 hover:bg-blue-700'
                          : 'hover:bg-blue-50 hover:border-blue-400'
                      }`}
                      onClick={() => setValue('waterAvailability', level)}
                    >
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Experience Section */}
        <Card className="shadow-md overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('experience')}
            className="w-full p-4 flex items-center justify-between bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <User className="w-5 h-5 text-purple-600" />
              <span className="font-semibold text-gray-800">Experience & Budget</span>
            </div>
            <ChevronRight className={`w-5 h-5 transition-transform ${expandedSection === 'experience' ? 'rotate-90' : ''}`} />
          </button>
          {expandedSection === 'experience' && (
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label>Farming Experience (Years)</Label>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setValue('farmingExperience', Math.max(0, watchedValues.farmingExperience - 1))}
                    className="h-11 w-11"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    {...register('farmingExperience')}
                    type="number"
                    value={watchedValues.farmingExperience}
                    readOnly
                    className="h-11 text-center"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setValue('farmingExperience', watchedValues.farmingExperience + 1)}
                    className="h-11 w-11"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Seasonal Budget (₹)</Label>
                <Input
                  {...register('seasonalBudget', {
                    required: 'Budget is required',
                    min: { value: 0, message: 'Budget cannot be negative' }
                  })}
                  type="number"
                  placeholder="Enter budget"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label>Risk Preference</Label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Safe', 'Balanced', 'High Profit'] as const).map((risk) => (
                    <Button
                      key={risk}
                      type="button"
                      variant={watchedValues.riskPreference === risk ? 'default' : 'outline'}
                      className={`h-11 text-xs ${
                        watchedValues.riskPreference === risk
                          ? 'bg-green-600 hover:bg-green-700'
                          : 'hover:bg-green-50 hover:border-green-400'
                      }`}
                      onClick={() => setValue('riskPreference', risk)}
                    >
                      {risk}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Preferences Section */}
        <Card className="shadow-md overflow-hidden">
          <button
            type="button"
            onClick={() => toggleSection('preferences')}
            className="w-full p-4 flex items-center justify-between bg-blue-50 hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-800">Preferences</span>
            </div>
            <ChevronRight className={`w-5 h-5 transition-transform ${expandedSection === 'preferences' ? 'rotate-90' : ''}`} />
          </button>
          {expandedSection === 'preferences' && (
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label>Preferred Crops (Select Multiple)</Label>
                <div className="flex flex-wrap gap-2">
                  {['Cotton', 'Wheat', 'Soybean', 'Tomato', 'Onion', 'Sugarcane', 'Rice', 'Maize'].map((crop) => (
                    <button
                      key={crop}
                      type="button"
                      onClick={() => toggleCrop(crop)}
                      className={`px-4 py-2 rounded-full text-sm transition-colors ${
                        watchedValues.preferredCrops?.includes(crop)
                          ? 'bg-green-600 text-white'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Farming Type</Label>
                <div className="space-y-2">
                  {(['Organic', 'Chemical', 'Mixed'] as const).map((type) => (
                    <label
                      key={type}
                      className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                        watchedValues.farmingType === type
                          ? 'bg-green-50 border-green-400'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      <input
                        type="radio"
                        {...register('farmingType')}
                        value={type}
                        checked={watchedValues.farmingType === type}
                        onChange={(e) => setValue('farmingType', e.target.value as any)}
                        className="w-4 h-4 text-green-600"
                      />
                      <span className="text-gray-800">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Language Preference</Label>
                <Select
                  value={watchedValues.language}
                  onValueChange={(value) => setValue('language', value as any)}
                >
                  <SelectTrigger className="h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">हिंदी (Hindi)</SelectItem>
                    <SelectItem value="Marathi">मराठी (Marathi)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <Label className="text-sm font-medium">Push Notifications</Label>
                  <p className="text-xs text-gray-600">Receive alerts and reminders</p>
                </div>
                <Switch
                  checked={watchedValues.notificationsEnabled}
                  onCheckedChange={(checked) => setValue('notificationsEnabled', checked)}
                />
              </div>
            </CardContent>
          )}
        </Card>

        {/* Save Button */}
        <Button
          type="submit"
          disabled={isSaving}
          className="w-full h-12 bg-green-600 hover:bg-green-700 text-lg shadow-lg"
        >
          {isSaving ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Saving Changes...
            </>
          ) : (
            'Save Changes'
          )}
        </Button>

        {/* Cancel Button */}
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate(-1)}
          className="w-full h-12"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
