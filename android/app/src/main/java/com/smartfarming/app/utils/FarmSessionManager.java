package com.smartfarming.app.utils;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * FarmSessionManager
 * Central state management for the application.
 * Holds the currently selected Field and its Active Crop.
 * All fragments should observe this to update their UI.
 */
public class FarmSessionManager {
    private static FarmSessionManager instance;

    // State Variables
    private final MutableLiveData<String> selectedFieldId = new MutableLiveData<>();
    private final MutableLiveData<String> activeCropId = new MutableLiveData<>();
    private final MutableLiveData<String> sowingDate = new MutableLiveData<>();
    private final MutableLiveData<String> cropStage = new MutableLiveData<>();

    // Mock Data Store (In a real app, this would be a Repository/Database)
    private final List<Field> fields = new ArrayList<>();
    private final Map<String, CropInfo> fieldCrops = new HashMap<>();

    // Private Constructor
    private FarmSessionManager() {
        initializeMockData();
    }

    // Singleton Instance
    public static synchronized FarmSessionManager getInstance() {
        if (instance == null) {
            instance = new FarmSessionManager();
        }
        return instance;
    }

    // Initialize Mock Data
    private void initializeMockData() {
        // Mock Fields
        fields.add(new Field("F001", "North Field (5 Acres)"));
        fields.add(new Field("F002", "South Plot (2.5 Acres)"));
        fields.add(new Field("F003", "River Side (10 Acres)"));

        // Mock Crops for Fields
        // Field 1: Wheat, Sowed 45 days ago
        fieldCrops.put("F001", new CropInfo("C001", "Wheat", "2023-11-15", "Vegetative Stage"));

        // Field 2: Rice, Sowed 10 days ago
        fieldCrops.put("F002", new CropInfo("C002", "Rice", "2023-12-20", "Seedling Stage"));
        
        // Field 3: No Active Crop
        // No entry means empty field
    }

    // Getters for LiveData
    public LiveData<String> getSelectedFieldId() {
        return selectedFieldId;
    }

    public LiveData<String> getActiveCropId() {
        return activeCropId;
    }
    
    public LiveData<String> getSowingDate() {
        return sowingDate;
    }

    public LiveData<String> getCropStage() {
        return cropStage;
    }

    // Get List of Fields for Dropdown
    public List<Field> getFields() {
        return fields;
    }

    // Action: Select Field
    public void selectField(String fieldId) {
        selectedFieldId.setValue(fieldId);

        // Fetch active crop logic
        if (fieldCrops.containsKey(fieldId)) {
            CropInfo info = fieldCrops.get(fieldId);
            activeCropId.setValue(info.cropId);
            sowingDate.setValue(info.sowingDate);
            cropStage.setValue(info.stage);
        } else {
            // No active crop
            activeCropId.setValue(null);
            sowingDate.setValue(null);
            cropStage.setValue(null);
        }
    }
    
    // Helper Classes
    public static class Field {
        public String id;
        public String name;
        
        public Field(String id, String name) {
            this.id = id;
            this.name = name;
        }
        
        @Override
        public String toString() {
            return name; // Useful for Spinner adapter
        }
    }
    
    private static class CropInfo {
        String cropId;
        String cropName;
        String sowingDate;
        String stage;
        
        public CropInfo(String cropId, String cropName, String sowingDate, String stage) {
            this.cropId = cropId;
            this.cropName = cropName;
            this.sowingDate = sowingDate;
            this.stage = stage;
        }
    }
}
