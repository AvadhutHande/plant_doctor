package com.smartfarming.app.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.smartfarming.app.R;
import com.smartfarming.app.utils.FarmSessionManager;

/**
 * Weather Fragment
 * Shows:
 * - Current weather
 * - 7-day forecast
 * - Weather alerts
 * - Disaster prevention tips
 * 
 * TODO: Implement full UI from fragment_weather.xml when created
 * TODO: Create WeatherViewModel
 * TODO: Create WeatherForecastAdapter
 */
public class WeatherFragment extends Fragment {
    
    // TODO: Add ViewModel
    // private WeatherViewModel viewModel;
    
    private FarmSessionManager farmSessionManager;
    private TextView tvWeatherField;
    
    // TODO: Add RecyclerView for forecast
    // private RecyclerView rvForecast;
    // private WeatherForecastAdapter adapter;
    
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_weather, container, false);
        
        farmSessionManager = FarmSessionManager.getInstance();
        
        initViews(view);
        setupRecyclerView();
        observeWeatherData();
        
        return view;
    }
    
    private void initViews(View view) {
        tvWeatherField = view.findViewById(R.id.tvWeatherField);
        
        // TODO: Initialize other views
        // tvCurrentTemp = view.findViewById(R.id.tvCurrentTemp);
        // tvCondition = view.findViewById(R.id.tvCondition);
        // rvForecast = view.findViewById(R.id.rvForecast);
    }
    
    private void setupRecyclerView() {
        // TODO: Setup RecyclerView
        // adapter = new WeatherForecastAdapter();
        // rvForecast.setLayoutManager(new LinearLayoutManager(getContext()));
        // rvForecast.setAdapter(adapter);
    }
    
    private void observeWeatherData() {
        farmSessionManager.getSelectedFieldId().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(String fieldId) {
                // In a real app, use fieldId to get location and fetch specific weather
                if (tvWeatherField != null) {
                    tvWeatherField.setText("Location: Field " + fieldId + " (Simulated)");
                }
            }
        });
        
        // TODO: Observe other data from ViewModel
        // viewModel = new ViewModelProvider(this).get(WeatherViewModel.class);
        // viewModel.getCurrentWeather().observe(getViewLifecycleOwner(), weather -> {
        //     // Update UI with current weather
        // });
        // viewModel.getForecast().observe(getViewLifecycleOwner(), forecast -> {
        //     adapter.setData(forecast);
        // });
    }
}
