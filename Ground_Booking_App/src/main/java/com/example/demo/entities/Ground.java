package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

/**
 * Entity class representing a Ground.
 * This class maps to the "ground" table in the database.
 */
@Entity
@Table(name = "ground")
public class Ground {

    // Primary key for the Ground entity, auto-generated
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

    // Establishing Many-to-One relationship with a City entity
    // The foreign key column is named "cId"
    // Assuming there is a City entity, though not provided in the original code.
    // To make this work, you would need to create a City entity.
    @ManyToOne
    @JoinColumn(name = "cId", nullable = false)
    private City city;

    // Establishing Many-to-One relationship with a User/Owner entity
    // The foreign key column is named "uId"
    // Assuming there is a User entity, though not provided in the original code.
    // To make this work, you would need to create a User entity.
    @ManyToOne
    @JoinColumn(name = "uId", nullable = false)
    private User owner;
    
    // ManyToOne relationship with Sport entity (as in the original code)
    @ManyToOne
    @JoinColumn(name = "sId", nullable = false)
    private Sport sport;

    @Column(name = "gStatus")
    private String gStatus;	

    // Storing images as a comma-separated string is a simple approach.
    // For a more robust solution, a separate Image entity with a One-to-Many
    // relationship would be ideal.
    @Column(name = "gImages")
    private String gImages;

    // Default constructor is required by JPA
    public Ground() {
    }
    
    // Parameterized constructor for convenience
    public Ground(String gName, String gDescription, String address, City city, User owner, Sport sport, String gStatus, String gImages) {
        this.gName = gName;
        this.gDescription = gDescription;
        this.address = address;
        this.city = city;
        this.owner = owner;
        this.sport = sport;
        this.gStatus = gStatus;
        this.gImages = gImages;
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
    
    // Getters and Setters for the new relationships
    public City getCity() {
        return city;
    }
    
    public void setCity(City city) {
        this.city = city;
    }
    
    public User getOwner() {
        return owner;
    }
    
    public void setOwner(User owner) {
        this.owner = owner;
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
