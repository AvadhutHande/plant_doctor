package com.smartfarming.app.models;

public class Farmer {
    private String id;
    private String name;
    private String phone;
    private String village;
    private String location;
    private String landSize;
    private int activeCrops;
    private double seasonIncome;

    public Farmer() {
    }

    public Farmer(String id, String name, String phone, String village, String location, String landSize) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.village = village;
        this.location = location;
        this.landSize = landSize;
        this.activeCrops = 0;
        this.seasonIncome = 0.0;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getVillage() { return village; }
    public void setVillage(String village) { this.village = village; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getLandSize() { return landSize; }
    public void setLandSize(String landSize) { this.landSize = landSize; }

    public int getActiveCrops() { return activeCrops; }
    public void setActiveCrops(int activeCrops) { this.activeCrops = activeCrops; }

    public double getSeasonIncome() { return seasonIncome; }
    public void setSeasonIncome(double seasonIncome) { this.seasonIncome = seasonIncome; }
}
