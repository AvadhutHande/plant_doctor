import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useProfile } from '../contexts/ProfileContext';
import { useFields } from '../contexts/FieldsContext';
<<<<<<< HEAD
import type { Field } from '../types';
=======
>>>>>>> a84933492759ed5f5a2e13255c042afa53c1ee26
import { Sprout, ChevronRight, ChevronLeft, Minus, Plus, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const CROPS = [
  'Cotton', 'Wheat', 'Soybean', 'Rice', 'Maize', 'Sugarcane',
  'Groundnut', 'Bajra', 'Jowar', 'Onion', 'Tomato', 'Potato',
  'Fallow (No crop)',
];

type Step = 'land' | 'fields' | 'crops' | 'done';

interface FieldSetup {
  name: string;
  area: number;
  crop: string;
}

export default function FarmOverviewPage() {
  const navigate = useNavigate();
  const { profile, updateProfile } = useProfile();
<<<<<<< HEAD
  const { resetFields } = useFields();
=======
  const { addField, fields, removeField } = useFields();
>>>>>>> a84933492759ed5f5a2e13255c042afa53c1ee26

  const [step, setStep] = useState<Step>('land');
  const [totalLand, setTotalLand] = useState('');
  const [numPlots, setNumPlots] = useState(1);
  const [fieldSetups, setFieldSetups] = useState<FieldSetup[]>([]);

  // Build field setups when moving from step 'fields' → 'crops'
  const initFieldSetups = (count: number, land: number) => {
    const area = land > 0 ? Math.floor(land / count) : 0;
    return Array.from({ length: count }, (_, i) => ({
      name: `Field ${i + 1}`,
      area,
      crop: 'Fallow (No crop)',
    }));
  };

  const handleLandNext = () => {
    const val = parseFloat(totalLand);
    if (!totalLand || isNaN(val) || val <= 0) {
      toast.error('Please enter a valid land area.');
      return;
    }
    setStep('fields');
  };

  const handleFieldsNext = () => {
    const land = parseFloat(totalLand);
    setFieldSetups(initFieldSetups(numPlots, land));
    setStep('crops');
  };

  const handleCropChange = (idx: number, crop: string) => {
    setFieldSetups(prev => prev.map((f, i) => i === idx ? { ...f, crop } : f));
  };

  const handleAreaChange = (idx: number, raw: string) => {
    const val = parseFloat(raw);
    setFieldSetups(prev => prev.map((f, i) => i === idx ? { ...f, area: isNaN(val) ? 0 : val } : f));
  };

  const handleFinish = () => {
    const land = parseFloat(totalLand);

<<<<<<< HEAD
    const newFields: Field[] = fieldSetups.map((f, i) => {
=======
    // Update profile
    updateProfile({
      totalLand: land,
      numFields: numPlots,
    });

    // Replace fields: remove all existing, add new ones
    // (FieldsContext syncs numFields via useEffect, but we also set crops)
    // We use updateProfile to trigger the sync, then patch crops via a workaround:
    // Store crop setup in sessionStorage for the FieldsContext to pick up on mount
    const cropMap: Record<string, string> = {};
    const stageMap: Record<string, string> = {};
    fieldSetups.forEach((f) => {
      const isFallow = f.crop === 'Fallow (No crop)';
      cropMap[f.name] = isFallow ? 'Fallow' : f.crop;
      stageMap[f.name] = isFallow ? 'Fallow' : 'Sowing';
    });

    // Save field setup so FieldsContext initialises from it
    const newFields = fieldSetups.map((f, i) => {
>>>>>>> a84933492759ed5f5a2e13255c042afa53c1ee26
      const isFallow = f.crop === 'Fallow (No crop)';
      return {
        id: `field-setup-${Date.now()}-${i}`,
        name: f.name,
        size: `${f.area} Guntha`,
        area: f.area,
        crop: isFallow ? 'Fallow' : f.crop,
        stage: isFallow ? 'Fallow' : 'Sowing',
        isActive: !isFallow,
        cropAssignedDate: !isFallow ? new Date().toISOString() : undefined,
        expectedHarvestDate: !isFallow
          ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
          : undefined,
      };
    });

<<<<<<< HEAD
    // Push fields first so the numFields sync effect sees the correct count
    resetFields(newFields);

    // Update profile stats
    updateProfile({ totalLand: land, numFields: numPlots });

    sessionStorage.setItem('farmOverviewSeen', 'true');
    navigate('/app/dashboard');
=======
    localStorage.setItem('farmerFields', JSON.stringify(newFields));
    sessionStorage.setItem('farmOverviewSeen', 'true');

    // Force reload fields context by reloading the app to the dashboard
    navigate('/app/dashboard');
    window.location.reload(); // cheap but effective to re-read localStorage
>>>>>>> a84933492759ed5f5a2e13255c042afa53c1ee26
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-start">
      <div className="w-full max-w-md min-h-screen bg-white flex flex-col shadow-xl">

        {/* Header */}
        <div className="bg-green-600 text-white px-5 pt-10 pb-6 space-y-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-2 rounded-full">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm text-green-100">Smart Farming Setup</span>
          </div>
          <h1 className="text-xl font-semibold">
            {step === 'land' && 'How much land do you have?'}
            {step === 'fields' && 'How many fields/plots?'}
            {step === 'crops' && 'What are you growing?'}
          </h1>
          <p className="text-green-100 text-sm">
            {step === 'land' && 'Enter your total farm area in Guntha.'}
            {step === 'fields' && 'Tell us how many separate plots your land is divided into.'}
            {step === 'crops' && 'Set the crop for each field. You can change this anytime.'}
          </p>

          {/* Step dots */}
          <div className="flex gap-2 pt-2">
            {(['land', 'fields', 'crops'] as Step[]).map((s, i) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  step === s ? 'w-6 bg-white' : i < ['land','fields','crops'].indexOf(step) ? 'w-3 bg-white/60' : 'w-3 bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 px-5 py-6 space-y-5 overflow-y-auto">

          {/* Step 1: Total Land */}
          {step === 'land' && (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Total Land Area
                </label>
                <div className="relative">
                  <input
                    type="number"
                    inputMode="decimal"
                    min="1"
                    placeholder="e.g. 40"
                    value={totalLand}
                    onChange={e => setTotalLand(e.target.value)}
                    className="w-full h-14 px-4 pr-20 text-xl border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 text-gray-800"
                    autoFocus
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">
                    Guntha
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  1 Acre = 40 Guntha · 1 Hectare ≈ 98.8 Guntha
                </p>
              </div>

              {totalLand && !isNaN(parseFloat(totalLand)) && parseFloat(totalLand) > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <p className="text-sm text-green-800">
                    <span className="font-semibold">{parseFloat(totalLand).toFixed(1)} Guntha</span>
                    {' '}≈{' '}
                    <span className="font-semibold">{(parseFloat(totalLand) / 40).toFixed(2)} acres</span>
                    {' '}of farmland
                  </p>
                </div>
              )}
            </>
          )}

          {/* Step 2: Number of Plots */}
          {step === 'fields' && (
            <>
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-700">
                  Number of Plots / Fields
                </label>
                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={() => setNumPlots(p => Math.max(1, p - 1))}
                    className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </button>
                  <span className="text-5xl font-bold text-gray-800 w-16 text-center">
                    {numPlots}
                  </span>
                  <button
                    onClick={() => setNumPlots(p => Math.min(10, p + 1))}
                    className="w-12 h-12 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-green-500 hover:bg-green-50 transition-colors"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <p className="text-center text-xs text-gray-500">Maximum 10 fields</p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map(n => (
                  <button
                    key={n}
                    onClick={() => setNumPlots(n)}
                    className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${
                      numPlots === n
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {n} {n === 1 ? 'Plot' : 'Plots'}
                  </button>
                ))}
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                <p className="text-xs text-amber-800">
                  Each plot will be approx.{' '}
                  <span className="font-semibold">
                    {Math.floor(parseFloat(totalLand || '0') / numPlots)} Guntha
                  </span>{' '}
                  — you can adjust sizes in the next step.
                </p>
              </div>
            </>
          )}

          {/* Step 3: Crop per field */}
          {step === 'crops' && (
            <div className="space-y-4">
              {fieldSetups.map((field, idx) => (
                <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2.5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-800">{field.name}</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        inputMode="decimal"
                        min="1"
                        value={field.area || ''}
                        onChange={e => handleAreaChange(idx, e.target.value)}
                        className="w-20 h-7 px-2 text-sm border border-gray-300 rounded-lg text-right focus:outline-none focus:border-green-500"
                      />
                      <span className="text-xs text-gray-500">Guntha</span>
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-gray-500 mb-2">Select crop:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {CROPS.map(crop => (
                        <button
                          key={crop}
                          onClick={() => handleCropChange(idx, crop)}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                            field.crop === crop
                              ? 'bg-green-600 text-white border-green-600'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-green-400'
                          }`}
                        >
                          {crop}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="px-5 py-4 border-t border-gray-100 space-y-3">
          {step === 'land' && (
            <Button
              onClick={handleLandNext}
              className="w-full h-12 bg-green-600 hover:bg-green-700 rounded-xl text-base flex items-center justify-center gap-2"
            >
              Next
              <ChevronRight className="w-5 h-5" />
            </Button>
          )}

          {step === 'fields' && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('land')}
                className="flex-1 h-12 rounded-xl border-gray-300 flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handleFieldsNext}
                className="flex-2 flex-1 h-12 bg-green-600 hover:bg-green-700 rounded-xl flex items-center justify-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}

          {step === 'crops' && (
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep('fields')}
                className="flex-1 h-12 rounded-xl border-gray-300 flex items-center justify-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
              <Button
                onClick={handleFinish}
                className="flex-1 h-12 bg-green-600 hover:bg-green-700 rounded-xl flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                Save & Continue
              </Button>
            </div>
          )}

          <button
            onClick={() => {
              sessionStorage.setItem('farmOverviewSeen', 'true');
              navigate('/app/dashboard');
            }}
            className="w-full text-center text-sm text-gray-400 hover:text-gray-600 py-1"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
