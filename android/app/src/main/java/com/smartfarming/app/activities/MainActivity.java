package com.smartfarming.app.activities;

import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;
import androidx.lifecycle.Observer;
import androidx.recyclerview.widget.RecyclerView;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.bottomsheet.BottomSheetDialog;
import com.google.android.material.navigation.NavigationBarView;
import com.smartfarming.app.R;
import com.smartfarming.app.adapters.FieldSelectionAdapter;
import com.smartfarming.app.fragments.AIToolsFragment;
import com.smartfarming.app.fragments.DashboardFragment;
import com.smartfarming.app.fragments.MarketFragment;
import com.smartfarming.app.fragments.ProfileFragment;
import com.smartfarming.app.fragments.WeatherFragment;
import com.smartfarming.app.utils.FarmSessionManager;

import java.util.List;

/**
 * Main Activity with Bottom Navigation
 * Manages navigation between 5 main fragments
 */
public class MainActivity extends AppCompatActivity {
    
    private BottomNavigationView bottomNavigationView;
    private Fragment currentFragment;
    private FarmSessionManager farmSessionManager;
    
    // Field Selector
    private LinearLayout layoutFieldSelector;
    private TextView tvToolbarFieldName;
    private BottomSheetDialog fieldSelectionSheet;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        // Setup Toolbar
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);
        if (getSupportActionBar() != null) {
            getSupportActionBar().setDisplayShowTitleEnabled(false);
        }

        // Initialize Session Manager
        farmSessionManager = FarmSessionManager.getInstance();

        // Setup Field Selector UI
        layoutFieldSelector = findViewById(R.id.layoutFieldSelector);
        tvToolbarFieldName = findViewById(R.id.tvToolbarFieldName);
        
        layoutFieldSelector.setOnClickListener(v -> showFieldSelectionSheet());

        // Observe selected field to update toolbar title
        farmSessionManager.getSelectedFieldId().observe(this, new Observer<String>() {
            @Override
            public void onChanged(String fieldId) {
                updateToolbarTitle(fieldId);
            }
        });
        
        // Initialize bottom navigation
        bottomNavigationView = findViewById(R.id.bottomNavigation);
        bottomNavigationView.setOnItemSelectedListener(navigationItemSelectedListener);
        
        // Select initial field if not set
        if (farmSessionManager.getSelectedFieldId().getValue() == null) {
            List<FarmSessionManager.Field> fields = farmSessionManager.getFields();
            if (!fields.isEmpty()) {
                farmSessionManager.selectField(fields.get(0).id);
            }
        }

        // Load default fragment (Dashboard)
        if (savedInstanceState == null) {
            loadFragment(new DashboardFragment());
        }
    }

    private void updateToolbarTitle(String fieldId) {
        List<FarmSessionManager.Field> fields = farmSessionManager.getFields();
        for (FarmSessionManager.Field field : fields) {
            if (field.id.equals(fieldId)) {
                tvToolbarFieldName.setText(field.name);
                return;
            }
        }
        tvToolbarFieldName.setText("Select Field");
    }

    private void showFieldSelectionSheet() {
        fieldSelectionSheet = new BottomSheetDialog(this, R.style.Theme_Design_BottomSheetDialog);
        View sheetView = getLayoutInflater().inflate(R.layout.layout_field_selection_sheet, null);
        fieldSelectionSheet.setContentView(sheetView);

        RecyclerView rvFieldList = sheetView.findViewById(R.id.rvFieldList);
        View btnAddField = sheetView.findViewById(R.id.btnAddField);

        List<FarmSessionManager.Field> fields = farmSessionManager.getFields();
        String currentFieldId = farmSessionManager.getSelectedFieldId().getValue();

        FieldSelectionAdapter adapter = new FieldSelectionAdapter(
                fields, 
                currentFieldId, 
                field -> {
                    farmSessionManager.selectField(field.id);
                    fieldSelectionSheet.dismiss();
                    Toast.makeText(this, "Switched to " + field.name, Toast.LENGTH_SHORT).show();
                }
        );

        rvFieldList.setAdapter(adapter);

        btnAddField.setOnClickListener(v -> {
            fieldSelectionSheet.dismiss();
            Toast.makeText(this, "Add Field Feature Coming Soon", Toast.LENGTH_SHORT).show();
        });

        fieldSelectionSheet.show();
    }
    
    private final NavigationBarView.OnItemSelectedListener navigationItemSelectedListener =
        new NavigationBarView.OnItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                Fragment selectedFragment = null;
                int itemId = item.getItemId();
                
                if (itemId == R.id.nav_home) {
                    selectedFragment = new DashboardFragment();
                } else if (itemId == R.id.nav_weather) {
                    selectedFragment = new WeatherFragment();
                } else if (itemId == R.id.nav_ai_tools) {
                    selectedFragment = new AIToolsFragment();
                } else if (itemId == R.id.nav_market) {
                    selectedFragment = new MarketFragment();
                } else if (itemId == R.id.nav_profile) {
                    selectedFragment = new ProfileFragment();
                }
                
                if (selectedFragment != null) {
                    return loadFragment(selectedFragment);
                }
                return false;
            }
        };
    
    private boolean loadFragment(Fragment fragment) {
        if (fragment != null) {
            if (currentFragment != null && 
                currentFragment.getClass().equals(fragment.getClass())) {
                return true;
            }
            
            FragmentTransaction transaction = getSupportFragmentManager().beginTransaction();
            transaction.setCustomAnimations(android.R.anim.fade_in, android.R.anim.fade_out);
            transaction.replace(R.id.fragmentContainer, fragment);
            transaction.commit();
            
            currentFragment = fragment;
            return true;
        }
        return false;
    }
    
    @Override
    public void onBackPressed() {
        if (!(currentFragment instanceof DashboardFragment)) {
            bottomNavigationView.setSelectedItemId(R.id.nav_home);
        } else {
            super.onBackPressed();
        }
    }
}
