package com.smartfarming.app.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;

import com.smartfarming.app.R;
import com.smartfarming.app.activities.CropRecommendationActivity;
import com.smartfarming.app.activities.DiseaseDetectionActivity;
import com.smartfarming.app.activities.FertilizerRecommendationActivity;
import com.smartfarming.app.activities.SoilAnalysisActivity;
import com.smartfarming.app.utils.FarmSessionManager;
import com.smartfarming.app.utils.SessionManager;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

/**
 * Dashboard Fragment
 * Modern "Bento Grid" Layout
 */
public class DashboardFragment extends Fragment {
    
    private SessionManager sessionManager;
    private FarmSessionManager farmSessionManager;
    
    private TextView tvWelcome, tvDate;
    private TextView tvCurrentCrop, tvCropStage, tvSowingDate, tvFieldAlerts;
    private ProgressBar progressBarStage;
    private ImageView imgCropIcon;
    private CardView cardHero;
    
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_dashboard, container, false);
        
        sessionManager = new SessionManager(requireContext());
        farmSessionManager = FarmSessionManager.getInstance();
        
        initViews(view);
        setupClickListeners(view);
        
        return view;
    }
    
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        observeFieldData();
    }
    
    private void initViews(View view) {
        tvWelcome = view.findViewById(R.id.tvWelcome);
        tvDate = view.findViewById(R.id.tvDate);
        
        if (tvWelcome != null) {
            String userName = sessionManager.getUserName();
            tvWelcome.setText("Welcome, " + userName + "!");
        }
        
        // Set today's date
        SimpleDateFormat sdf = new SimpleDateFormat("EEEE, d MMMM", Locale.getDefault());
        tvDate.setText(sdf.format(new Date()));

        // Hero Card Views
        cardHero = view.findViewById(R.id.cardHero);
        tvCurrentCrop = view.findViewById(R.id.tvCurrentCrop);
        tvCropStage = view.findViewById(R.id.tvCropStage);
        tvSowingDate = view.findViewById(R.id.tvSowingDate);
        tvFieldAlerts = view.findViewById(R.id.tvFieldAlerts);
        progressBarStage = view.findViewById(R.id.progressBarStage);
        imgCropIcon = view.findViewById(R.id.imgCropIcon);
    }
    
    private void observeFieldData() {
        farmSessionManager.getActiveCropId().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(String cropId) {
                if (cropId == null) {
                    // No active crop
                    tvCurrentCrop.setText("No Active Crop");
                    tvCropStage.setText("Field is Fallow");
                    tvSowingDate.setVisibility(View.GONE);
                    tvFieldAlerts.setText("Tap to add crop");
                    progressBarStage.setVisibility(View.GONE);
                    imgCropIcon.setAlpha(0.3f);
                } else {
                    // Determine Crop Name from ID (Mock logic for display)
                    String cropName = cropId.equals("C001") ? "Wheat" : (cropId.equals("C002") ? "Rice" : "Crop " + cropId);
                    tvCurrentCrop.setText(cropName);
                    tvSowingDate.setVisibility(View.VISIBLE);
                    tvFieldAlerts.setText("Conditions Good");
                    progressBarStage.setVisibility(View.VISIBLE);
                    imgCropIcon.setAlpha(1.0f);
                    
                    // Mock icon change
                    if (cropName.equals("Rice")) {
                        // imgCropIcon.setImageResource(R.drawable.ic_rice); // If available
                    }
                }
            }
        });
        
        farmSessionManager.getCropStage().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(String stage) {
                if (stage != null) {
                    tvCropStage.setText(stage);
                    
                    // Mock Progress logic
                    if (stage.contains("Seedling")) progressBarStage.setProgress(20);
                    else if (stage.contains("Vegetative")) progressBarStage.setProgress(50);
                    else if (stage.contains("Flowering")) progressBarStage.setProgress(80);
                    else progressBarStage.setProgress(100);
                }
            }
        });

        farmSessionManager.getSowingDate().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(String date) {
                if (date != null) {
                    tvSowingDate.setText("Sowed on " + date);
                }
            }
        });
    }

    private void setupClickListeners(View view) {
        // TODO: Bind the Quick Action Grid listeners
        // View cardDisease = view.findViewById(R.id.cardDisease); // Need to add IDs to CardViews in XML first
    }
}