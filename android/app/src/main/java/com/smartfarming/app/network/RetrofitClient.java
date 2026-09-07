package com.smartfarming.app.network;

import okhttp3.OkHttpClient;
import okhttp3.logging.HttpLoggingInterceptor;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

import java.util.concurrent.TimeUnit;

/**
 * Retrofit Client Singleton
 * TODO: Update BASE_URL when backend server is deployed
 * Currently set to localhost - change to actual server URL
 */
public class RetrofitClient {
    
    // TODO: Replace with actual backend URL when ready
    // Example: https://api.smartfarming.com/
    private static final String BASE_URL = "http://10.0.2.2:5000/"; // Android emulator localhost
    
    private static RetrofitClient instance;
    private final Retrofit retrofit;
    
    private RetrofitClient() {
        // Create logging interceptor for debugging
        HttpLoggingInterceptor loggingInterceptor = new HttpLoggingInterceptor();
        loggingInterceptor.setLevel(HttpLoggingInterceptor.Level.BODY);
        
        // Create OkHttp client with timeout settings
        OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .addInterceptor(loggingInterceptor)
                .build();
        
        // Create Retrofit instance
        retrofit = new Retrofit.Builder()
                .baseUrl(BASE_URL)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build();
    }
    
    /**
     * Get singleton instance
     */
    public static synchronized RetrofitClient getInstance() {
        if (instance == null) {
            instance = new RetrofitClient();
        }
        return instance;
    }
    
    /**
     * Get API service
     */
    public ApiService getApiService() {
        return retrofit.create(ApiService.class);
    }
}
