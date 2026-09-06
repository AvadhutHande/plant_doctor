package com.smartfarming.app.utils;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * Session Manager for handling user authentication state
 * Uses SharedPreferences for local storage
 * TODO: Integrate with backend authentication when API is ready
 */
public class SessionManager {
    private static final String PREF_NAME = "SmartFarmingPrefs";
    private static final String KEY_IS_LOGGED_IN = "isLoggedIn";
    private static final String KEY_USER_ID = "userId";
    private static final String KEY_USER_NAME = "userName";
    private static final String KEY_USER_PHONE = "userPhone";
    private static final String KEY_USER_LOCATION = "userLocation";

    private final SharedPreferences prefs;
    private final SharedPreferences.Editor editor;

    public SessionManager(Context context) {
        prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
        editor = prefs.edit();
    }

    /**
     * Create login session
     * TODO: Replace with API token storage when backend is integrated
     */
    public void createLoginSession(String userId, String name, String phone, String location) {
        editor.putBoolean(KEY_IS_LOGGED_IN, true);
        editor.putString(KEY_USER_ID, userId);
        editor.putString(KEY_USER_NAME, name);
        editor.putString(KEY_USER_PHONE, phone);
        editor.putString(KEY_USER_LOCATION, location);
        editor.apply();
    }

    /**
     * Check if user is logged in
     */
    public boolean isLoggedIn() {
        return prefs.getBoolean(KEY_IS_LOGGED_IN, false);
    }

    /**
     * Get user name
     */
    public String getUserName() {
        return prefs.getString(KEY_USER_NAME, "Farmer");
    }

    /**
     * Get user phone
     */
    public String getUserPhone() {
        return prefs.getString(KEY_USER_PHONE, "");
    }

    /**
     * Get user location
     */
    public String getUserLocation() {
        return prefs.getString(KEY_USER_LOCATION, "");
    }

    /**
     * Get user ID
     */
    public String getUserId() {
        return prefs.getString(KEY_USER_ID, "");
    }

    /**
     * Logout user - clear session
     * TODO: Call logout API when backend is ready
     */
    public void logout() {
        editor.clear();
        editor.apply();
    }
}
