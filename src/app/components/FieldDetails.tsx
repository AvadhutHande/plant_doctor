import { useState } from 'react';
import { ArrowLeft, Plus, Calendar, Sprout, TrendingUp } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { FieldDetailProps } from '../types';

export default function FieldDetails({ selectedField, onBack }: FieldDetailProps) {
  const [showNewCropModal, setShowNewCropModal] = useState(false);
  const [newCrop, setNewCrop] = useState({
    cropName: '',
    sowingDate: '',
    area: ''
  });

  // Mock crop data based on field
  const getCropData = () => {
    const cropDataMap: Record<string, any> = {
      'Cotton': { daysSinceSowing: 45, expectedHarvest: '15 May 2026' },
      'Wheat': { daysSinceSowing: 30, expectedHarvest: '10 Apr 2026' },
      'Soybean': { daysSinceSowing: 85, expectedHarvest: '25 Feb 2026' }
    };
    return cropDataMap[selectedField.crop] || { daysSinceSowing: 0, expectedHarvest: 'N/A' };
  };

  const cropData = getCropData();

  const handleStartNewCrop = () => {
    // Handle crop creation
    console.log('Starting new crop:', newCrop);
    setShowNewCropModal(false);
    setNewCrop({ cropName: '', sowingDate: '', area: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-green-700 rounded-lg transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-semibold">{selectedField.name}</h1>
            <p className="text-sm text-green-100">{selectedField.size}</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Crop Summary Card */}
        <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-lg">
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Sprout className="w-6 h-6" />
              <h2 className="text-lg font-semibold">Current Crop Status</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs opacity-80">Current Crop</p>
                <p className="text-lg font-semibold">{selectedField.crop}</p>
              </div>
              <div>
                <p className="text-xs opacity-80">Growth Stage</p>
                <p className="text-lg font-semibold">{selectedField.stage}</p>
              </div>
              <div>
                <p className="text-xs opacity-80">Days Since Sowing</p>
                <p className="text-lg font-semibold">{cropData.daysSinceSowing} days</p>
              </div>
              <div>
                <p className="text-xs opacity-80">Expected Harvest</p>
                <p className="text-lg font-semibold">{cropData.expectedHarvest}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start New Crop Button */}
        <Button 
          onClick={() => setShowNewCropModal(true)}
          className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 gap-2 shadow-md"
        >
          <Plus className="w-6 h-6" />
          Start New Crop
        </Button>

        {/* Field Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4 text-center space-y-2">
              <div className="flex justify-center">
                <div className="p-3 bg-blue-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-blue-700">₹45K</p>
              <p className="text-sm text-gray-600">Expected Income</p>
            </CardContent>
          </Card>
          
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4 text-center space-y-2">
              <div className="flex justify-center">
                <div className="p-3 bg-green-100 rounded-full">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold text-green-700">75 days</p>
              <p className="text-sm text-gray-600">Till Harvest</p>
            </CardContent>
          </Card>
        </div>

        {/* Crop History */}
        <Card className="shadow-md">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold text-gray-800">Previous Crops</h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">Tomato</p>
                  <p className="text-xs text-gray-600">Oct 2025 - Jan 2026</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">₹38K</p>
                  <p className="text-xs text-gray-600">Profit</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-gray-800">Wheat</p>
                  <p className="text-xs text-gray-600">Jun 2025 - Sep 2025</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-green-600">₹52K</p>
                  <p className="text-xs text-gray-600">Profit</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Crop Modal (Bottom Sheet Style) */}
      {showNewCropModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
          <div className="bg-white w-full rounded-t-3xl max-h-[80vh] overflow-auto animate-slide-up">
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Start New Crop</h2>
                <button 
                  onClick={() => setShowNewCropModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cropName">Select Crop</Label>
                  <select
                    id="cropName"
                    value={newCrop.cropName}
                    onChange={(e) => setNewCrop({...newCrop, cropName: e.target.value})}
                    className="w-full h-12 px-4 border border-gray-300 rounded-lg text-gray-800 bg-white"
                  >
                    <option value="">Choose a crop...</option>
                    <option value="Cotton">Cotton</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Soybean">Soybean</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Onion">Onion</option>
                    <option value="Sugarcane">Sugarcane</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sowingDate">Sowing Date</Label>
                  <Input
                    id="sowingDate"
                    type="date"
                    value={newCrop.sowingDate}
                    onChange={(e) => setNewCrop({...newCrop, sowingDate: e.target.value})}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area">Area Used (Guntha)</Label>
                  <Input
                    id="area"
                    type="number"
                    placeholder="Enter area in guntha"
                    value={newCrop.area}
                    onChange={(e) => setNewCrop({...newCrop, area: e.target.value})}
                    className="h-12"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => setShowNewCropModal(false)}
                    variant="outline"
                    className="flex-1 h-12"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleStartNewCrop}
                    className="flex-1 h-12 bg-green-600 hover:bg-green-700"
                  >
                    Start Tracking
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
