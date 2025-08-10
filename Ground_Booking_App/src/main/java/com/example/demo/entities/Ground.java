package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "ground")
public class Ground {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "gId") Integer gId;

    @Column(name = "gName")
    private String gName;

    @Column(name = "gDescription")
    private String gDescription;

    @Column(name = "address")
    private String address;

    @ManyToOne
    @JoinColumn(name = "cId", referencedColumnName = "cId")
    private City city;

    @ManyToOne
    @JoinColumn(name = "uId", referencedColumnName = "uId")
    private User user;

    @ManyToOne
    @JoinColumn(name = "sId", referencedColumnName = "sId")
    private Sport sport;

    @Column(name = "gStatus")
    private String gStatus;

    @Column(name = "gImages")
    private String gImages;

    public Ground() {
    }

    // Ground variable getters and setters
    public Integer getgId() {
        return gId;
    }

    public void setgId(Integer gId) {
        this.gId = gId;
    }

    public String getgName() {
        return gName;
    }

    public void setgName(String gName) {
        this.gName = gName;
    }

    public String getgDescription() {
        return gDescription;
    }

    public void setgDescription(String gDescription) {
        this.gDescription = gDescription;
    }
    
    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getgStatus() {
        return gStatus;
    }

    public void setgStatus(String gStatus) {
        this.gStatus = gStatus;
    }

    public String getgImages() {
        return gImages;
    }

    public void setgImages(String gImages) {
        this.gImages = gImages;
    }
    
    // Related entity getters and setters
    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Sport getSport() {
        return sport;
    }

    public void setSport(Sport sport) {
        this.sport = sport;
    }
}