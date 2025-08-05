package com.example.demo.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime; // For bDateTime
import java.time.LocalTime;    // For timeFrom, timeTo

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bId")
    private Integer bId;

    // Many-to-one relationship with User entity
    @ManyToOne
    @JoinColumn(name = "uId", nullable = false) // Foreign key to User
    private User user;

    // Many-to-one relationship with Ground entity
    @ManyToOne
    @JoinColumn(name = "gId", nullable = false) // Foreign key to Ground
    private Ground ground;

    @Column(name = "bDateTime", nullable = false)
    private LocalDateTime bDateTime; // Date and time of booking

    @Column(name = "timeFrom", nullable = false)
    private LocalTime timeFrom; // Start time of the booking slot

    @Column(name = "timeTo", nullable = false)
    private LocalTime timeTo;   // End time of the booking slot

    @Column(name = "bAmt", nullable = false)
    private Double bAmt; // Booking amount

    // Default constructor
    public Booking() {
    }

    // Constructor with all fields (optional, but good for testing)
    public Booking(User user, Ground ground, LocalDateTime bDateTime, LocalTime timeFrom, LocalTime timeTo, Double bAmt) {
        this.user = user;
        this.ground = ground;
        this.bDateTime = bDateTime;
        this.timeFrom = timeFrom;
        this.timeTo = timeTo;
        this.bAmt = bAmt;
    }

    // Getters and Setters
    public Integer getBId() {
        return bId;
    }

    public void setBId(Integer bId) {
        this.bId = bId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Ground getGround() {
        return ground;
    }

    public void setGround(Ground ground) {
        this.ground = ground;
    }

    public LocalDateTime getBDateTime() {
        return bDateTime;
    }

    public void setBDateTime(LocalDateTime bDateTime) {
        this.bDateTime = bDateTime;
    }

    public LocalTime getTimeFrom() {
        return timeFrom;
    }

    public void setTimeFrom(LocalTime timeFrom) {
        this.timeFrom = timeFrom;
    }

    public LocalTime getTimeTo() {
        return timeTo;
    }

    public void setTimeTo(LocalTime timeTo) {
        this.timeTo = timeTo;
    }

    public Double getBAmt() {
        return bAmt;
    }

    public void setBAmt(Double bAmt) {
        this.bAmt = bAmt;
    }
}