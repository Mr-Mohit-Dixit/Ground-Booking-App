package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "sport")
public class Sport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sId")
    private int sId;

    @Column(name = "sName", nullable = false)
    private String sName;

    @Column(name = "sRate", nullable = false)
    private double sRate;

    // Default constructor is required by JPA
    public Sport() {
    }

    public Sport(int sId) {
		super();
		this.sId = sId;
	}

	public Sport(String sName, double sRate) {
        this.sName = sName;
        this.sRate = sRate;
    }

    // Getters and Setters
    public int getSId() {
        return sId;
    }

    public void setSId(int sId) {
        this.sId = sId;
    }

    public String getSName() {
        return sName;
    }

    public void setSName(String sName) {
        this.sName = sName;
    }

    public double getSRate() {
        return sRate;
    }

    public void setSRate(double sRate) {
        this.sRate = sRate;
    }

    @Override
    public String toString() {
        return "Sport{" +
               "sId=" + sId +
               ", sName='" + sName + '\'' +
               ", sRate=" + sRate +
               '}';
    }
}
