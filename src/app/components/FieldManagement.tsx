import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight, Plus, Edit, Trash2, Sprout, MapPin } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useFields } from '../contexts/FieldsContext';
import { useProfile } from '../contexts/ProfileContext';

export default function FieldManagement() {
  const navigate = useNavigate();
  const { fields, assignCropToField, clearCropFromField } = useFields();
  const { profile } = useProfile();
  const [showCropAssignment, setShowCropAssignment] = useState<string | null>(null);

  const availableCrops = ['Cotton', 'Wheat', 'Soybean', 'Tomato', 'Onion', 'Sugarcane', 'Rice', 'Maize'];
  const cropStages = ['Sowing', 'Vegetative', 'Flowering', 'Fruiting', 'Harvesting'];

  const handleAssignCrop = (fieldId: string, crop: string) => {
    assignCropToField(fieldId, crop, 'Sowing');
    setShowCropAssignment(null);
  };

  const handleClearCrop = (fieldId: string) => {
    if (confirm('Are you sure you want to clear this crop from the field?')) {
      clearCropFromField(fieldId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-amber-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-green-700 rounded-lg transition-colors"
          >
            <ChevronRight className="w-6 h-6 rotate-180" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">Manage Fields</h1>
            <p className="text-sm text-green-100">Total: {profile.totalLand} Guntha • {fields.length} Fields</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4 text-center">
              <Sprout className="w-6 h-6 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-700">{profile.activeCrops}</p>
              <p className="text-xs text-gray-700">Active Crops</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4 text-center">
              <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-700">{fields.length}</p>
              <p className="text-xs text-gray-700">Total Fields</p>
            </CardContent>
          </Card>
        </div>

        {/* Fields List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Your Fields</h2>
          </div>

          {fields.map((field) => (
            <Card key={field.id} className="shadow-md hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{field.name}</h3>
                      {field.isActive && field.crop !== 'Fallow' ? (
                        <Badge className="bg-green-500">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="text-gray-500">Fallow</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">Area: {field.size}</p>
                  </div>
                </div>

                {/* Current Crop Info */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Current Crop:</span>
                    <span className="text-sm font-medium text-gray-800">{field.crop}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Stage:</span>
                    <span className="text-sm font-medium text-gray-800">{field.stage}</span>
                  </div>
                  {field.cropAssignedDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Started:</span>
                      <span className="text-sm font-medium text-gray-800">
                        {new Date(field.cropAssignedDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {field.isActive && field.crop !== 'Fallow' ? (
                    <>
                      <Button
                        onClick={() => navigate(`/app/dashboard/field-details`)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        size="sm"
                      >
                        <Sprout className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                      <Button
                        onClick={() => handleClearCrop(field.id)}
                        variant="outline"
                        className="text-red-600 border-red-300 hover:bg-red-50"
                        size="sm"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => setShowCropAssignment(field.id)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Start New Crop
                    </Button>
                  )}
                </div>

                {/* Crop Assignment Panel */}
                {showCropAssignment === field.id && (
                  <div className="mt-3 pt-3 border-t space-y-2">
                    <p className="text-sm font-medium text-gray-700 mb-2">Select Crop to Plant:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {availableCrops.map((crop) => (
                        <Button
                          key={crop}
                          onClick={() => handleAssignCrop(field.id, crop)}
                          variant="outline"
                          className="h-auto py-2 hover:bg-green-50 hover:border-green-400"
                          size="sm"
                        >
                          {crop}
                        </Button>
                      ))}
                    </div>
                    <Button
                      onClick={() => setShowCropAssignment(null)}
                      variant="ghost"
                      className="w-full mt-2"
                      size="sm"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <p className="text-sm text-blue-800">
              💡 <strong>Tip:</strong> You can manage the number of fields from your Profile settings. 
              Each field can have one active crop at a time.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
