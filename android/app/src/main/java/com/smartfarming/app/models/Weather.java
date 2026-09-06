package com.smartfarming.app.models;

public class Weather {
    private String day;
    private int temperature;
    private String condition;
    private int humidity;
    private int windSpeed;
    private int rainChance;
    private String icon;

    public Weather() {
    }

    public Weather(String day, int temperature, String condition, int humidity, int windSpeed, int rainChance) {
        this.day = day;
        this.temperature = temperature;
        this.condition = condition;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.rainChance = rainChance;
    }

    // Getters and Setters
    public String getDay() { return day; }
    public void setDay(String day) { this.day = day; }

    public int getTemperature() { return temperature; }
    public void setTemperature(int temperature) { this.temperature = temperature; }

    public String getCondition() { return condition; }
    public void setCondition(String condition) { this.condition = condition; }

    public int getHumidity() { return humidity; }
    public void setHumidity(int humidity) { this.humidity = humidity; }

    public int getWindSpeed() { return windSpeed; }
    public void setWindSpeed(int windSpeed) { this.windSpeed = windSpeed; }

    public int getRainChance() { return rainChance; }
    public void setRainChance(int rainChance) { this.rainChance = rainChance; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}
