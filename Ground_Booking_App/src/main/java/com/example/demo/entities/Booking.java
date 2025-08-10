//package com.example.demo.entities;
//
//import jakarta.persistence.*;
//import java.time.LocalDateTime;
//
//@Entity
//@Table(name = "booking")
//public class Booking {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "bId")
//    private Integer bId;
//
//    @ManyToOne
//    @JoinColumn(name = "uId", referencedColumnName = "uId")
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "gId", referencedColumnName = "gId")
//    private Ground ground;
//
//    @Column(name = "bDateTime")
//    private String bDateTime;
//
//    @Column(name = "timeFrom")
//    private String timeFrom;
//
//    @Column(name = "timeTo")
//    private String timeTo;
//
//    @Column(name = "bAmt")
//    private double bAmt;
//
//    public Booking() {
//    }
//    
//    // Getters and Setters for all fields
//
//    public Integer getbId() {
//        return bId;
//    }
//
//    public void setbId(Integer bId) {
//        this.bId = bId;
//    }
//
//    public User getUser() {
//        return user;
//    }
//
//    public void setUser(User user) {
//        this.user = user;
//    }
//
//    public Ground getGid() {
//        return ground;
//    }
//
//    public void setGid(Integer gid) {
//        this.ground.gId = gid;
//    }
//
//    public String getbDateTime() {
//        return bDateTime;
//    }
//
//    public void setbDateTime(String bDateTime) {
//        this.bDateTime = bDateTime;
//    }
//
//    public String getTimeFrom() {
//        return timeFrom;
//    }
//
//    public void setTimeFrom(String timeFrom) {
//        this.timeFrom = timeFrom;
//    }
//
//    public String getTimeTo() {
//        return timeTo;
//    }
//
//    public void setTimeTo(String timeTo) {
//        this.timeTo = timeTo;
//    }
//
//    public double getbAmt() {
//        return bAmt;
//    }
//
//    public void setbAmt(double bAmt) {
//        this.bAmt = bAmt;
//    }
//}



package com.example.demo.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bId")
    private Integer bId;

    @ManyToOne
    @JoinColumn(name = "uId", referencedColumnName = "uId",nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "gId", referencedColumnName = "gId",nullable = false)
    private Ground ground;

    @Column(name = "bDateTime")
    private String bDateTime;

    @Column(name = "timeFrom")
    private String timeFrom;

    @Column(name = "timeTo")
    private String timeTo;

    @Column(name = "bAmt")
    private double bAmt;

    public Booking() {
    }

    // Getters and Setters
    public Integer getbId() {
        return bId;
    }

    public void setbId(Integer bId) {
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

    public String getbDateTime() {
        return bDateTime;
    }

    public void setbDateTime(String bDateTime) {
        this.bDateTime = bDateTime;
    }

    public String getTimeFrom() {
        return timeFrom;
    }

    public void setTimeFrom(String timeFrom) {
        this.timeFrom = timeFrom;
    }

    public String getTimeTo() {
        return timeTo;
    }

    public void setTimeTo(String timeTo) {
        this.timeTo = timeTo;
    }

    public double getbAmt() {
        return bAmt;
    }

    public void setbAmt(double bAmt) {
        this.bAmt = bAmt;
    }
}

