package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "City")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cid")
    private int cId;

    @Column(name = "cname", nullable = false, unique = true)
    private String cName;

    public City() {
    }

    public City(String cName) {
        this.cName = cName;
    }

    public int getCId() {
        return cId;
    }

    public void setCId(int cId) {
        this.cId = cId;
    }

    public String getCName() {
        return cName;
    }

    public void setCName(String cName) {
        this.cName = cName;
    }

    @Override
    public String toString() {
        return "City{" +
                "cId=" + cId +
                ", cName='" + cName + '\'' +
                '}';
    }
}