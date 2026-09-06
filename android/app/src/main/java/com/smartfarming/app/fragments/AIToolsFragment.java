package com.smartfarming.app.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import com.smartfarming.app.R;
import com.smartfarming.app.activities.CropRecommendationActivity;
import com.smartfarming.app.activities.DiseaseDetectionActivity;
import com.smartfarming.app.activities.FertilizerRecommendationActivity;
import com.smartfarming.app.activities.SmartAdvisoryActivity;
import com.smartfarming.app.activities.SoilAnalysisActivity;

/**
 * AI Tools Fragment
 * Shows grid of AI-powered tools:
 * - Disease Detection
 * - Soil Analysis
 * - Crop Recommendation
 * - Fertilizer Recommendation
 * - Smart Farming Advisory
 * 
 * TODO: Implement full UI from fragment_ai_tools.xml when created
 */
public class AIToolsFragment extends Fragment {
    
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_ai_tools, container, false);
        
        setupToolCards(view);
        
        return view;
    }
    
    private void setupToolCards(View view) {
        // TODO: Setup click listeners for all tool cards
        // findViewById(R.id.cardDiseaseDetection).setOnClickListener(v -> 
        //     startActivity(new Intent(getActivity(), DiseaseDetectionActivity.class)));
        
        // findViewById(R.id.cardSoilAnalysis).setOnClickListener(v -> 
        //     startActivity(new Intent(getActivity(), SoilAnalysisActivity.class)));
        
        // findViewById(R.id.cardCropRecommendation).setOnClickListener(v -> 
        //     startActivity(new Intent(getActivity(), CropRecommendationActivity.class)));
        
        // findViewById(R.id.cardFertilizer).setOnClickListener(v -> 
        //     startActivity(new Intent(getActivity(), FertilizerRecommendationActivity.class)));
        
        // findViewById(R.id.cardSmartAdvisory).setOnClickListener(v -> 
        //     startActivity(new Intent(getActivity(), SmartAdvisoryActivity.class)));
    }
}
