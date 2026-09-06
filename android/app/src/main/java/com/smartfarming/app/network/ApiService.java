package com.smartfarming.app.network;

import com.smartfarming.app.models.Crop;
import com.smartfarming.app.models.Disease;
import com.smartfarming.app.models.Farmer;
import com.smartfarming.app.models.Weather;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

/**
 * Retrofit API Service Interface
 * TODO: Implement actual API endpoints when backend is ready
 * 
 * This interface defines all the API endpoints that will be used
 * to communicate with the Flask backend in the future.
 */
public interface ApiService {
    
    // ==================== Authentication APIs ====================
    
    /**
     * Login API
     * TODO: Implement when backend authentication is ready
     */
    @POST("api/auth/login")
    Call<LoginResponse> login(@Body LoginRequest request);
    
    /**
     * Register API
     * TODO: Implement when backend registration is ready
     */
    @POST("api/auth/register")
    Call<RegisterResponse> register(@Body RegisterRequest request);
    
    // ==================== Weather APIs ====================
    
    /**
     * Get current weather
     * TODO: Connect to weather API or backend weather service
     */
    @GET("api/weather/current")
    Call<Weather> getCurrentWeather(@Query("location") String location);
    
    /**
     * Get weather forecast
     * TODO: Implement 7-day forecast API
     */
    @GET("api/weather/forecast")
    Call<List<Weather>> getWeatherForecast(@Query("location") String location);
    
    // ==================== Disease Detection APIs ====================
    
    /**
     * Upload image for disease detection
     * TODO: Implement AI-based disease detection API
     */
    @POST("api/disease/detect")
    Call<Disease> detectDisease(@Body DiseaseDetectionRequest request);
    
    // ==================== Soil Analysis APIs ====================
    
    /**
     * Analyze soil parameters
     * TODO: Implement soil analysis API
     */
    @POST("api/soil/analyze")
    Call<SoilAnalysisResponse> analyzeSoil(@Body SoilAnalysisRequest request);
    
    // ==================== Crop Recommendation APIs ====================
    
    /**
     * Get crop recommendations
     * TODO: Implement AI-based crop recommendation API
     */
    @POST("api/crop/recommend")
    Call<List<Crop>> getCropRecommendations(@Body CropRecommendationRequest request);
    
    // ==================== Market Price APIs ====================
    
    /**
     * Get market prices
     * TODO: Implement real-time market price API
     */
    @GET("api/market/prices")
    Call<MarketPriceResponse> getMarketPrices(@Query("crop") String cropName);
    
    // ==================== Fertilizer APIs ====================
    
    /**
     * Get fertilizer recommendations
     * TODO: Implement fertilizer recommendation API
     */
    @GET("api/fertilizer/recommend")
    Call<FertilizerResponse> getFertilizerRecommendation(@Query("crop") String cropName);
    
    // ==================== Government Schemes APIs ====================
    
    /**
     * Get government schemes
     * TODO: Implement government schemes API
     */
    @GET("api/schemes")
    Call<List<GovernmentScheme>> getGovernmentSchemes();
    
    
    // ==================== Request/Response Models ====================
    // TODO: Define these models when implementing actual APIs
    
    class LoginRequest {
        public String phone;
        public String password;
    }
    
    class LoginResponse {
        public boolean success;
        public String token;
        public Farmer farmer;
        public String message;
    }
    
    class RegisterRequest {
        public String name;
        public String phone;
        public String village;
        public String password;
    }
    
    class RegisterResponse {
        public boolean success;
        public String message;
    }
    
    class DiseaseDetectionRequest {
        public String imageBase64;
        public String cropType;
    }
    
    class SoilAnalysisRequest {
        public double ph;
        public double nitrogen;
        public double phosphorus;
        public double potassium;
    }
    
    class SoilAnalysisResponse {
        public String soilType;
        public String healthStatus;
        public int healthScore;
        public List<String> recommendations;
    }
    
    class CropRecommendationRequest {
        public double soilPh;
        public double nitrogen;
        public double phosphorus;
        public double potassium;
        public String location;
        public String season;
    }
    
    class MarketPriceResponse {
        public String cropName;
        public double currentPrice;
        public List<PriceHistory> priceHistory;
        public List<MandiPrice> mandiPrices;
    }
    
    class PriceHistory {
        public String date;
        public double price;
    }
    
    class MandiPrice {
        public String mandiName;
        public double price;
        public String trend;
    }
    
    class FertilizerResponse {
        public String cropName;
        public List<FertilizerStage> stages;
    }
    
    class FertilizerStage {
        public String stageName;
        public String timing;
        public List<Fertilizer> fertilizers;
    }
    
    class Fertilizer {
        public String name;
        public String quantity;
        public String method;
        public String type; // organic or chemical
    }
    
    class GovernmentScheme {
        public String name;
        public String fullName;
        public String benefit;
        public String description;
        public List<String> eligibility;
        public List<String> documents;
    }
}
