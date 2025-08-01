package com.example.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class RegisterRequest {

    @JsonProperty("username")
    private String username;

    @JsonProperty("email")
    private String email;

    @JsonProperty("passwords")
    private String passwords;

    @JsonProperty("aadhar")
    private String aadhar;

    @JsonProperty("uAddress")
    private String uAddress;

    @JsonProperty("uPhoneNo")
    private String uPhoneNo;

    @JsonProperty("uName")
    private String uName;

    @JsonProperty("rId")
    private Integer rId;

    @JsonProperty("cId")
    private Integer cId;

    // Getters
    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public String getPasswords() {
        return passwords;
    }

    public String getAadhar() {
        return aadhar;
    }

    public String getuAddress() {
        return uAddress;
    }

    public String getuPhoneNo() {
        return uPhoneNo;
    }

    public String getuName() {
        return uName;
    }

    public Integer getRId() {
        return rId;
    }

    public Integer getCId() {
        return cId;
    }

    // Setters
    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPasswords(String passwords) {
        this.passwords = passwords;
    }

    public void setAadhar(String aadhar) {
        this.aadhar = aadhar;
    }

    public void setuAddress(String uAddress) {
        this.uAddress = uAddress;
    }

    public void setuPhoneNo(String uPhoneNo) {
        this.uPhoneNo = uPhoneNo;
    }

    public void setuName(String uName) {
        this.uName = uName;
    }

    public void setRId(Integer rId) {
        this.rId = rId;
    }

    public void setCId(Integer cId) {
        this.cId = cId;
    }

    @Override
    public String toString() {
        return "RegisterRequest{" +
               "username='" + username + '\'' +
               ", email='" + email + '\'' +
               ", passwords='" + passwords + '\'' +
               ", aadhar='" + aadhar + '\'' +
               ", uAddress='" + uAddress + '\'' +
               ", uPhoneNo='" + uPhoneNo + '\'' +
               ", uName='" + uName + '\'' +
               ", rId=" + rId +
               ", cId=" + cId +
               '}';
    }
}
