import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Field, FieldsContextType } from '../types';
import { useProfile } from './ProfileContext';

// Generate default fields based on profile numFields
const generateDefaultFields = (numFields: number, totalLand: number): Field[] => {
  const fields: Field[] = [];
  const areaPerField = Math.floor(totalLand / numFields);
  
  const defaultCrops = [
    { crop: 'Cotton', stage: 'Flowering', isActive: true },
    { crop: 'Wheat', stage: 'Vegetative', isActive: true },
    { crop: 'Soybean', stage: 'Harvesting', isActive: true },
    { crop: 'Fallow', stage: 'Fallow', isActive: false },
  ];
  
  for (let i = 0; i < numFields; i++) {
    const defaultCrop = defaultCrops[i % defaultCrops.length];
    const fieldNumber = i + 1;
    
    fields.push({
      id: `field-${Date.now()}-${i}`,
      name: `Field ${fieldNumber}`,
      size: `${areaPerField} Guntha`,
      area: areaPerField,
      crop: defaultCrop.crop,
      stage: defaultCrop.stage,
      isActive: defaultCrop.isActive,
      cropAssignedDate: defaultCrop.isActive ? new Date().toISOString() : undefined,
      expectedHarvestDate: defaultCrop.isActive 
        ? new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString() 
        : undefined,
    });
  }
  
  return fields;
};

const FieldsContext = createContext<FieldsContextType | undefined>(undefined);

export function FieldsProvider({ children }: { children: ReactNode }) {
  const { profile, updateProfile } = useProfile();
  const [fields, setFields] = useState<Field[]>(() => {
    const stored = localStorage.getItem('farmerFields');
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default fields based on profile
    return generateDefaultFields(profile.numFields, profile.totalLand);
  });

  // Sync fields with localStorage
  useEffect(() => {
    localStorage.setItem('farmerFields', JSON.stringify(fields));
    
    // Update profile's activeCrops count
    const activeCount = fields.filter(f => f.isActive && f.crop !== 'Fallow').length;
    if (profile.activeCrops !== activeCount) {
      updateProfile({ activeCrops: activeCount });
    }
  }, [fields]);

  // Sync number of fields with profile changes
  useEffect(() => {
    const currentFieldCount = fields.length;
    const desiredFieldCount = profile.numFields;
    
    if (currentFieldCount !== desiredFieldCount) {
      if (desiredFieldCount > currentFieldCount) {
        // Add new fields
        const newFields: Field[] = [];
        const areaPerField = Math.floor(profile.totalLand / desiredFieldCount);
        
        for (let i = currentFieldCount; i < desiredFieldCount; i++) {
          newFields.push({
            id: `field-${Date.now()}-${i}`,
            name: `Field ${i + 1}`,
            size: `${areaPerField} Guntha`,
            area: areaPerField,
            crop: 'Fallow',
            stage: 'Fallow',
            isActive: false,
          });
        }
        
        setFields([...fields, ...newFields]);
      } else {
        // Remove excess fields (from the end)
        setFields(fields.slice(0, desiredFieldCount));
      }
    }
  }, [profile.numFields]);

  const addField = (field: Omit<Field, 'id'>) => {
    const newField: Field = {
      ...field,
      id: `field-${Date.now()}`,
    };
    setFields([...fields, newField]);
    updateProfile({ numFields: fields.length + 1 });
  };

  const updateField = (id: string, updates: Partial<Field>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeField = (id: string) => {
    setFields(fields.filter(f => f.id !== id));
    updateProfile({ numFields: fields.length - 1 });
  };

  const assignCropToField = (fieldId: string, cropName: string, stage: string = 'Sowing') => {
    setFields(fields.map(f => {
      if (f.id === fieldId) {
        return {
          ...f,
          crop: cropName,
          stage,
          isActive: true,
          cropAssignedDate: new Date().toISOString(),
          expectedHarvestDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
        };
      }
      return f;
    }));
  };

  const clearCropFromField = (fieldId: string) => {
    setFields(fields.map(f => {
      if (f.id === fieldId) {
        return {
          ...f,
          crop: 'Fallow',
          stage: 'Fallow',
          isActive: false,
          cropAssignedDate: undefined,
          expectedHarvestDate: undefined,
        };
      }
      return f;
    }));
  };

  const getActiveFieldsCount = () => {
    return fields.filter(f => f.isActive && f.crop !== 'Fallow').length;
  };

  const getTotalAreaInGuntha = () => {
    return fields.reduce((total, f) => total + f.area, 0);
  };

<<<<<<< HEAD
  const resetFields = (newFields: Field[]) => {
    setFields(newFields);
  };

=======
>>>>>>> a84933492759ed5f5a2e13255c042afa53c1ee26
  return (
    <FieldsContext.Provider
      value={{
        fields,
        addField,
        updateField,
        removeField,
        assignCropToField,
        clearCropFromField,
        getActiveFieldsCount,
        getTotalAreaInGuntha,
<<<<<<< HEAD
        resetFields,
=======
>>>>>>> a84933492759ed5f5a2e13255c042afa53c1ee26
      }}
    >
      {children}
    </FieldsContext.Provider>
  );
}

export function useFields() {
  const context = useContext(FieldsContext);
  if (!context) {
    throw new Error('useFields must be used within FieldsProvider');
  }
  return context;
}
