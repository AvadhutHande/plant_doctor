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
import com.smartfarming.app.activities.IncomeComparisonActivity;
import com.smartfarming.app.activities.MarketPricesActivity;

/**
 * Market Fragment
 * Shows:
 * - Market price trends
 * - Income comparison tools
 * - Top performing crops
 * - Market tips
 * 
 * TODO: Implement full UI from fragment_market.xml when created
 * TODO: Create MarketViewModel
 */
public class MarketFragment extends Fragment {
    
    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_market, container, false);
        
        setupMarketTools(view);
        loadMarketData();
        
        return view;
    }
    
    private void setupMarketTools(View view) {
        // TODO: Setup navigation to market tools
        // findViewById(R.id.cardMarketPrices).setOnClickListener(v -> 
        //     startActivity(new Intent(getActivity(), MarketPricesActivity.class)));
        
        // findViewById(R.id.cardIncomeComparison).setOnClickListener(v -> 
        //     startActivity(new Intent(getActivity(), IncomeComparisonActivity.class)));
    }
    
    private void loadMarketData() {
        // TODO: Load market data from ViewModel
        // - Current prices
        // - Top performing crops
        // - Market trends
    }
}
