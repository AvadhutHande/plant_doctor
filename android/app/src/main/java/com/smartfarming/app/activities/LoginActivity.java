package com.smartfarming.app.activities;

import android.content.Intent;
import android.os.Bundle;
import android.text.TextUtils;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.smartfarming.app.R;
import com.smartfarming.app.utils.SessionManager;

/**
 * Login Activity
 * Handles user authentication
 * TODO: Integrate with backend API for actual authentication
 */
public class LoginActivity extends AppCompatActivity {
    
    private EditText etPhone, etPassword;
    private Button btnLogin;
    private TextView tvRegister;
    private SessionManager sessionManager;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);
        
        initViews();
        sessionManager = new SessionManager(this);
        
        btnLogin.setOnClickListener(v -> attemptLogin());
        tvRegister.setOnClickListener(v -> {
            startActivity(new Intent(LoginActivity.this, RegisterActivity.class));
        });
    }
    
    private void initViews() {
        etPhone = findViewById(R.id.etPhone);
        etPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnLogin);
        tvRegister = findViewById(R.id.tvRegister);
    }
    
    /**
     * Attempt login
     * TODO: Replace with actual API authentication call
     * Current implementation uses dummy validation
     */
    private void attemptLogin() {
        String phone = etPhone.getText().toString().trim();
        String password = etPassword.getText().toString().trim();
        
        // Validation
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
        
        // TODO: Call API for authentication
        // For now, using dummy validation
        performDummyLogin(phone);
    }
    
    /**
     * Dummy login - accepts any valid phone and password
     * TODO: Replace with actual API call using Retrofit
     * Example:
     * ApiService apiService = RetrofitClient.getInstance().getApiService();
     * Call<LoginResponse> call = apiService.login(new LoginRequest(phone, password));
     * call.enqueue(new Callback<LoginResponse>() { ... });
     */
    private void performDummyLogin(String phone) {
        // Create dummy session
        sessionManager.createLoginSession(
            "MH2024001",
            "Ramesh Patil",
            phone,
            "Solapur, Maharashtra"
        );
        
        Toast.makeText(this, "Login successful!", Toast.LENGTH_SHORT).show();
        
        // Navigate to MainActivity
        Intent intent = new Intent(LoginActivity.this, MainActivity.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        startActivity(intent);
        finish();
    }
}
