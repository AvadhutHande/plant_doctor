package com.smartfarming.app.models;

import java.util.List;

public class Disease {
    private String name;
    private String scientificName;
    private String severity;
    private int confidence;
    private List<String> organicRemedies;
    private List<ChemicalTreatment> chemicalTreatments;
    private List<String> preventionTips;

    public Disease() {
    }

    public Disease(String name, String scientificName, String severity, int confidence) {
        this.name = name;
        this.scientificName = scientificName;
        this.severity = severity;
        this.confidence = confidence;
    }

    // Getters and Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getScientificName() { return scientificName; }
    public void setScientificName(String scientificName) { this.scientificName = scientificName; }

    public String getSeverity() { return severity; }
    public void setSeverity(String severity) { this.severity = severity; }

    public int getConfidence() { return confidence; }
    public void setConfidence(int confidence) { this.confidence = confidence; }

    public List<String> getOrganicRemedies() { return organicRemedies; }
    public void setOrganicRemedies(List<String> organicRemedies) { this.organicRemedies = organicRemedies; }

    public List<ChemicalTreatment> getChemicalTreatments() { return chemicalTreatments; }
    public void setChemicalTreatments(List<ChemicalTreatment> chemicalTreatments) { 
        this.chemicalTreatments = chemicalTreatments; 
    }

    public List<String> getPreventionTips() { return preventionTips; }
    public void setPreventionTips(List<String> preventionTips) { this.preventionTips = preventionTips; }

    // Inner class for Chemical Treatment
    public static class ChemicalTreatment {
        private String name;
        private String dosage;
        private String frequency;
        private String caution;

        public ChemicalTreatment(String name, String dosage, String frequency, String caution) {
            this.name = name;
            this.dosage = dosage;
            this.frequency = frequency;
            this.caution = caution;
        }

        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getDosage() { return dosage; }
        public void setDosage(String dosage) { this.dosage = dosage; }

        public String getFrequency() { return frequency; }
        public void setFrequency(String frequency) { this.frequency = frequency; }

        public String getCaution() { return caution; }
        public void setCaution(String caution) { this.caution = caution; }
    }
}
