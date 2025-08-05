package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
    
    // Changed from sId to a ManyToOne relationship with Sport entity
    @ManyToOne
    @JoinColumn(name = "sId") // This is the foreign key column name
    private Sport sport;

    @Column(name = "gStatus")
    private String gStatus;

    @Column(name = "gImages")
    private String gImages;

    public Ground() {
    }

    // Getters and Setters
    public Integer getGId() {
        return gId;
    }

    public void setGId(Integer gId) {
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
    
    public Sport getSport() {
        return sport;
    }
    
    public void setSport(Sport sport) {
        this.sport = sport;
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