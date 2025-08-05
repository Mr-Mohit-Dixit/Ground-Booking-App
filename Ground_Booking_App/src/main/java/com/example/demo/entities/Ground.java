package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ground")
public class Ground {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gId")
    private Integer gId;

    @Column(name = "gName")
    private String gName;

    @Column(name = "gDescription")
    private String gDescription;

    @Column(name = "address")
    private String address;

    @Column(name = "cId")
    private Integer cId;

    @Column(name = "uId")
    private Integer uId;

    @Column(name = "sId")
    private Integer sId;

    @Column(name = "gStatus")
    private String gStatus;

    @Column(name = "gImages")
    private String gImages;

    // Default constructor
    public Ground() {
    }

    // Getters and Setters
    public int getGId() {
        return gId;
    }

    public void setGId(int gId) {
        this.gId = gId;
    }

    public String getGName() {
        return gName;
    }

    public void setGName(String gName) {
        this.gName = gName;
    }

    public String getGDescription() {
        return gDescription;
    }

    public void setGDescription(String gDescription) {
        this.gDescription = gDescription;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Integer getCId() {
        return cId;
    }

    public void setCId(Integer cId) {
        this.cId = cId;
    }

    public Integer getUId() {
        return uId;
    }

    public void setUId(Integer uId) {
        this.uId = uId;
    }

    public Integer getSId() {
        return sId;
    }

    public void setSId(Integer sId) {
        this.sId = sId;
    }

    public String getGStatus() {
        return gStatus;
    }

    public void setGStatus(String gStatus) {
        this.gStatus = gStatus;
    }

    public String getGImages() {
        return gImages;
    }

    public void setGImages(String gImages) {
        this.gImages = gImages;
    }
}