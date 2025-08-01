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
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "uId")
    private int uId;

    @ManyToOne
    @JoinColumn(name = "rId", referencedColumnName = "rid")
    private Roles role; // Renamed from rId to role for better object representation

    @Column(name = "uName", nullable = false)
    private String uName;

    @Column(name = "uPhoneNo", nullable = false, length = 15)
    private String uPhoneNo; // Renamed to uPhoneNo for clarity

    @Column(name = "aadhar", nullable = false, unique = true, length = 12)
    private String aadhar;

    @Column(name = "uAddress", nullable = false, columnDefinition = "TEXT")
    private String uAddress; // Renamed to uAddress for clarity

    // Assuming a City entity exists for the cId foreign key
    // You'll need to create the City entity similar to Roles if you haven't already
    @ManyToOne
    @JoinColumn(name = "cId", referencedColumnName = "cid")
    private City city; // Renamed from cId to city for better object representation

    @Column(name = "email", unique = true, length = 50)
    private String email;

    @Column(name = "username", unique = true, length = 50)
    private String username;

    @Column(name = "passwords", nullable = false, length = 255)
    private String passwords;

    public User() {
    }

    public User(Roles role, String uName, String uPhoneNo, String aadhar, String uAddress, City city, String email, String username, String passwords) {
        this.role = role;
        this.uName = uName;
        this.uPhoneNo = uPhoneNo;
        this.aadhar = aadhar;
        this.uAddress = uAddress;
        this.city = city;
        this.email = email;
        this.username = username;
        this.passwords = passwords;
    }

    // Getters and Setters
    public int getUId() {
        return uId;
    }

    public void setUId(int uId) {
        this.uId = uId;
    }

    public Roles getRole() {
        return role;
    }

    public void setRole(Roles role) {
        this.role = role;
    }

    public String getUName() {
        return uName;
    }

    public void setUName(String uName) {
        this.uName = uName;
    }

    public String getUPhoneNo() {
        return uPhoneNo;
    }

    public void setUPhoneNo(String uPhoneNo) {
        this.uPhoneNo = uPhoneNo;
    }

    public String getAadhar() {
        return aadhar;
    }

    public void setAadhar(String aadhar) {
        this.aadhar = aadhar;
    }

    public String getUAddress() {
        return uAddress;
    }

    public void setUAddress(String uAddress) {
        this.uAddress = uAddress;
    }

    public City getCity() {
        return city;
    }

    public void setCity(City city) {
        this.city = city;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPasswords() {
        return passwords;
    }

    public void setPasswords(String passwords) {
        this.passwords = passwords;
    }

    @Override
    public String toString() {
        return "User{" +
                "uId=" + uId +
                ", role=" + (role != null ? role.getRName() : "null") + // To avoid infinite loop with bi-directional
                ", uName='" + uName + '\'' +
                ", uPhoneNo='" + uPhoneNo + '\'' +
                ", aadhar='" + aadhar + '\'' +
                ", uAddress='" + uAddress + '\'' +
                ", city=" + (city != null ? city.getCName() : "null") + // Assuming City has a getCName()
                ", email='" + email + '\'' +
                ", username='" + username + '\'' +
                ", passwords='" + passwords + '\'' +
                '}';
    }
}