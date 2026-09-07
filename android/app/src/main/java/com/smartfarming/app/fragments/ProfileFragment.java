package com.smartfarming.app.fragments;

import android.content.Intent;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AlertDialog;
import androidx.fragment.app.Fragment;

import com.smartfarming.app.R;
import com.smartfarming.app.activities.CropCalendarActivity;
import com.smartfarming.app.activities.ExpenseTrackerActivity;
import com.smartfarming.app.activities.GovernmentSchemesActivity;
import com.smartfarming.app.activities.LoginActivity;
import com.smartfarming.app.utils.SessionManager;

/**
 * Profile Fragment
 * Shows:
 * - Farmer profile information
 * - Farm statistics
 * - Tools & services menu
 * - Settings
 * - Logout
 * 
 * TODO: Implement full UI from fragment_profile.xml when created
 */
public class ProfileFragment extends Fragment {
    
    private SessionManager sessionManager;
    
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_profile, container, false);
        
        sessionManager = new SessionManager(requireContext());
        
        initViews(view);
        setupProfileTools(view);
        setupLogout(view);
        
        return view;
    }
    
    private void initViews(View view) {
        // TODO: Initialize and populate profile views
        // TextView tvName = view.findViewById(R.id.tvFarmerName);
        // tvName.setText(sessionManager.getUserName());
        
        // TextView tvLocation = view.findViewById(R.id.tvLocation);
        // tvLocation.setText(sessionManager.getUserLocation());
    }
    
    private void setupProfileTools(View view) {
        // TODO: Setup navigation to tools
        // findViewById(R.id.cardGovernmentSchemes).setOnClickListener(v -> 
        //     startActivity(new Intent(getActivity(), GovernmentSchemesActivity.class)));
        
        // findViewById(R.id.cardExpenseTracker).setOnClickListener(v -> 
        //     startActivity(new Intent(getActivity(), ExpenseTrackerActivity.class)));
        
        // findViewById(R.id.cardCropCalendar).setOnClickListener(v -> 
        //     startActivity(new Intent(getActivity(), CropCalendarActivity.class)));
    }
    
    private void setupLogout(View view) {
        // TODO: Setup logout button
        // Button btnLogout = view.findViewById(R.id.btnLogout);
        // btnLogout.setOnClickListener(v -> showLogoutConfirmation());
    }
    
    private void showLogoutConfirmation() {
        new AlertDialog.Builder(requireContext())
            .setTitle("Logout")
            .setMessage(R.string.logout_confirmation)
            .setPositiveButton("Yes", (dialog, which) -> performLogout())
            .setNegativeButton("No", null)
            .show();
    }
    
    private void performLogout() {
        sessionManager.logout();
        
        Intent intent = new Intent(getActivity(), LoginActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        requireActivity().finish();
    }
}
