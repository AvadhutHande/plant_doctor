package com.smartfarming.app.activities;

import android.os.Bundle;
import android.text.TextUtils;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.smartfarming.app.R;

/**
 * Registration Activity
 * Handles new farmer registration
 * TODO: Integrate with backend API for actual registration
 */
public class RegisterActivity extends AppCompatActivity {
    
    private EditText etName, etPhone, etVillage, etPassword, etConfirmPassword;
    private Button btnRegister;
    private TextView tvBackToLogin;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_register);
        
        initViews();
        
        btnRegister.setOnClickListener(v -> attemptRegistration());
        tvBackToLogin.setOnClickListener(v -> finish());
    }
    
    private void initViews() {
        etName = findViewById(R.id.etName);
        etPhone = findViewById(R.id.etPhone);
        etVillage = findViewById(R.id.etVillage);
        etPassword = findViewById(R.id.etPassword);
        etConfirmPassword = findViewById(R.id.etConfirmPassword);
        btnRegister = findViewById(R.id.btnRegister);
        tvBackToLogin = findViewById(R.id.tvBackToLogin);
    }
    
    /**
     * Attempt registration
     * TODO: Replace with actual API registration call
     */
    private void attemptRegistration() {
        String name = etName.getText().toString().trim();
        String phone = etPhone.getText().toString().trim();
        String village = etVillage.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        String confirmPassword = etConfirmPassword.getText().toString().trim();
        
        // Validation
        if (TextUtils.isEmpty(name)) {
            etName.setError("Name is required");
            etName.requestFocus();
            return;
        }
        
        if (TextUtils.isEmpty(phone)) {
            etPhone.setError("Phone number is required");
            etPhone.requestFocus();
            return;
        }
        
        if (phone.length() != 10) {
            etPhone.setError("Please enter valid 10-digit phone number");
            etPhone.requestFocus();
            return;
        }
        
        if (TextUtils.isEmpty(village)) {
            etVillage.setError("Village/Location is required");
            etVillage.requestFocus();
            return;
        }
        
        if (TextUtils.isEmpty(password)) {
            etPassword.setError("Password is required");
            etPassword.requestFocus();
            return;
        }
        
        if (password.length() < 6) {
            etPassword.setError("Password must be at least 6 characters");
            etPassword.requestFocus();
            return;
        }
        
        if (!password.equals(confirmPassword)) {
            etConfirmPassword.setError("Passwords do not match");
            etConfirmPassword.requestFocus();
            return;
        }
        
        // TODO: Call API for registration
        performDummyRegistration(name, phone, village);
    }
    
    /**
     * Dummy registration - accepts any valid data
     * TODO: Replace with actual API call using Retrofit
     */
    private void performDummyRegistration(String name, String phone, String village) {
        Toast.makeText(this, "Registration successful! Please login.", Toast.LENGTH_LONG).show();
        finish();
    }
}
