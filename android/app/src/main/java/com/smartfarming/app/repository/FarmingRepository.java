package com.smartfarming.app.repository;

import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.smartfarming.app.models.Crop;
import com.smartfarming.app.models.Disease;
import com.smartfarming.app.models.Weather;
import com.smartfarming.app.network.ApiService;
import com.smartfarming.app.network.RetrofitClient;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Repository class for data management
 * Currently uses dummy data
 * TODO: Replace dummy data with actual Retrofit API calls when backend is ready
 */
public class FarmingRepository {
    
    private static FarmingRepository instance;
    private final ApiService apiService;
    
    private FarmingRepository() {
        apiService = RetrofitClient.getInstance().getApiService();
    }
    
    public static synchronized FarmingRepository getInstance() {
        if (instance == null) {
            instance = new FarmingRepository();
        }
        return instance;
    }
    
    // ==================== Weather Data ====================
    
    /**
     * Get current weather
     * TODO: Replace with actual API call: apiService.getCurrentWeather(location)
     */
    public LiveData<Weather> getCurrentWeather(String location) {
        MutableLiveData<Weather> weatherData = new MutableLiveData<>();
        
        // Dummy data
        Weather weather = new Weather();
        weather.setDay("Today");
        weather.setTemperature(32);
        weather.setCondition("Clear Sky");
        weather.setHumidity(65);
        weather.setWindSpeed(12);
        weather.setRainChance(10);
        
        weatherData.setValue(weather);
        return weatherData;
    }
    
    /**
     * Get 7-day weather forecast
     * TODO: Replace with actual API call: apiService.getWeatherForecast(location)
     */
    public LiveData<List<Weather>> getWeatherForecast(String location) {
        MutableLiveData<List<Weather>> forecastData = new MutableLiveData<>();
        
        // Dummy data
        List<Weather> forecast = new ArrayList<>();
        forecast.add(new Weather("Mon", 32, "Sunny", 65, 12, 10));
        forecast.add(new Weather("Tue", 31, "Cloudy", 70, 15, 20));
        forecast.add(new Weather("Wed", 28, "Rainy", 85, 18, 80));
        forecast.add(new Weather("Thu", 29, "Rainy", 80, 16, 70));
        forecast.add(new Weather("Fri", 30, "Cloudy", 75, 14, 30));
        forecast.add(new Weather("Sat", 33, "Sunny", 60, 10, 5));
        forecast.add(new Weather("Sun", 34, "Sunny", 58, 11, 0));
        
        forecastData.setValue(forecast);
        return forecastData;
    }
    
    // ==================== Disease Detection ====================
    
    /**
     * Detect plant disease from image
     * TODO: Replace with actual API call: apiService.detectDisease(request)
     */
    public LiveData<Disease> detectDisease(String imageBase64, String cropType) {
        MutableLiveData<Disease> diseaseData = new MutableLiveData<>();
        
        // Dummy data
        Disease disease = new Disease();
        disease.setName("Early Blight");
        disease.setScientificName("Alternaria solani");
        disease.setSeverity("High");
        disease.setConfidence(92);
        
        List<String> organicRemedies = new ArrayList<>();
        organicRemedies.add("Mix 5ml neem oil with 1 liter water. Spray on affected plants twice a week.");
        organicRemedies.add("Mix 1 tablespoon baking soda + 1 tablespoon vegetable oil in 1 liter water. Spray weekly.");
        organicRemedies.add("Remove and destroy heavily infected leaves to prevent spread.");
        disease.setOrganicRemedies(organicRemedies);
        
        List<Disease.ChemicalTreatment> chemicalTreatments = new ArrayList<>();
        chemicalTreatments.add(new Disease.ChemicalTreatment(
            "Mancozeb 75% WP",
            "2-2.5 grams per liter of water",
            "Spray every 7-10 days",
            "Use protective equipment"
        ));
        chemicalTreatments.add(new Disease.ChemicalTreatment(
            "Chlorothalonil",
            "2 ml per liter of water",
            "Apply at first sign of disease",
            "Avoid during flowering"
        ));
        disease.setChemicalTreatments(chemicalTreatments);
        
        List<String> preventionTips = new ArrayList<>();
        preventionTips.add("Ensure proper spacing between plants for air circulation");
        preventionTips.add("Avoid overhead watering; water at the base");
        preventionTips.add("Practice crop rotation with non-host crops");
        preventionTips.add("Use disease-resistant varieties when available");
        disease.setPreventionTips(preventionTips);
        
        diseaseData.setValue(disease);
        return diseaseData;
    }
    
    // ==================== Crop Recommendations ====================
    
    /**
     * Get crop recommendations
     * TODO: Replace with actual API call: apiService.getCropRecommendations(request)
     */
    public LiveData<List<Crop>> getCropRecommendations(double ph, double n, double p, double k) {
        MutableLiveData<List<Crop>> cropsData = new MutableLiveData<>();
        
        // Dummy data
        List<Crop> crops = new ArrayList<>();
        
        Crop cotton = new Crop();
        cotton.setName("Cotton");
        cotton.setConfidence(95);
        cotton.setReason("Perfect soil pH and NPK levels");
        cotton.setDuration("150-180 days");
        cotton.setWaterRequirement("Medium");
        cotton.setExpectedYield("15-20 quintals/acre");
        cotton.setMarketDemand("High");
        cotton.setProfitPotential("₹60,000 - ₹80,000/acre");
        cotton.setRecommended(true);
        crops.add(cotton);
        
        Crop soybean = new Crop();
        soybean.setName("Soybean");
        soybean.setConfidence(88);
        soybean.setReason("Good rainfall prediction");
        soybean.setDuration("90-120 days");
        soybean.setWaterRequirement("Medium");
        soybean.setExpectedYield("12-15 quintals/acre");
        soybean.setMarketDemand("High");
        soybean.setProfitPotential("₹45,000 - ₹55,000/acre");
        crops.add(soybean);
        
        Crop wheat = new Crop();
        wheat.setName("Wheat");
        wheat.setConfidence(82);
        wheat.setReason("Suitable temperature range");
        wheat.setDuration("120-150 days");
        wheat.setWaterRequirement("Low to Medium");
        wheat.setExpectedYield("18-22 quintals/acre");
        wheat.setMarketDemand("Medium");
        wheat.setProfitPotential("₹40,000 - ₹50,000/acre");
        crops.add(wheat);
        
        cropsData.setValue(crops);
        return cropsData;
    }
    
    // ==================== Income Comparison ====================
    
    /**
     * Get crop income comparison data
     * TODO: Replace with actual API call when backend is ready
     */
    public LiveData<List<Crop>> getIncomeComparison() {
        MutableLiveData<List<Crop>> comparisonData = new MutableLiveData<>();
        
        // Dummy data
        List<Crop> crops = new ArrayList<>();
        
        Crop cotton = new Crop();
        cotton.setName("Cotton");
        cotton.setCultivationCost(28000);
        cotton.setRevenue(93750);
        cotton.setProfit(65750);
        cotton.setRecommended(true);
        crops.add(cotton);
        
        Crop soybean = new Crop();
        soybean.setName("Soybean");
        soybean.setCultivationCost(18000);
        soybean.setRevenue(57600);
        soybean.setProfit(39600);
        crops.add(soybean);
        
        Crop wheat = new Crop();
        wheat.setName("Wheat");
        wheat.setCultivationCost(22000);
        wheat.setRevenue(41400);
        wheat.setProfit(19400);
        crops.add(wheat);
        
        Crop sugarcane = new Crop();
        sugarcane.setName("Sugarcane");
        sugarcane.setCultivationCost(45000);
        sugarcane.setRevenue(122500);
        sugarcane.setProfit(77500);
        sugarcane.setRecommended(true);
        crops.add(sugarcane);
        
        comparisonData.setValue(crops);
        return comparisonData;
    }
}
