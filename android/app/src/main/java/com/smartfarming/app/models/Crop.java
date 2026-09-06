package com.smartfarming.app.models;

public class Crop {
    private String name;
    private int confidence;
    private String reason;
    private String duration;
    private String waterRequirement;
    private String expectedYield;
    private String marketDemand;
    private String profitPotential;
    private double cultivationCost;
    private double revenue;
    private double profit;
    private boolean recommended;

    public Crop() {
    }

    public Crop(String name, int confidence, String reason, String duration, 
                String waterRequirement, String expectedYield, String marketDemand, String profitPotential) {
        this.name = name;
        this.confidence = confidence;
        this.reason = reason;
        this.duration = duration;
        this.waterRequirement = waterRequirement;
        this.expectedYield = expectedYield;
        this.marketDemand = marketDemand;
        this.profitPotential = profitPotential;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getConfidence() { return confidence; }
    public void setConfidence(int confidence) { this.confidence = confidence; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public String getWaterRequirement() { return waterRequirement; }
    public void setWaterRequirement(String waterRequirement) { this.waterRequirement = waterRequirement; }

    public String getExpectedYield() { return expectedYield; }
    public void setExpectedYield(String expectedYield) { this.expectedYield = expectedYield; }

    public String getMarketDemand() { return marketDemand; }
    public void setMarketDemand(String marketDemand) { this.marketDemand = marketDemand; }

    public String getProfitPotential() { return profitPotential; }
    public void setProfitPotential(String profitPotential) { this.profitPotential = profitPotential; }

    public double getCultivationCost() { return cultivationCost; }
    public void setCultivationCost(double cultivationCost) { this.cultivationCost = cultivationCost; }

    public double getRevenue() { return revenue; }
    public void setRevenue(double revenue) { this.revenue = revenue; }

    public double getProfit() { return profit; }
    public void setProfit(double profit) { this.profit = profit; }

    public boolean isRecommended() { return recommended; }
    public void setRecommended(boolean recommended) { this.recommended = recommended; }
}
