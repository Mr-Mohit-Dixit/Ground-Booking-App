package com.example.demo.dto;

/**
 * A Data Transfer Object (DTO) for handling login requests.
 * It contains the user's username or email and their password.
 */
public class LoginRequest {

    private String usernameOrEmail;
    private String passwords; // Note: In a real app, this should be handled securely.

    public String getUsernameOrEmail() {
        return usernameOrEmail;
    }

    public void setUsernameOrEmail(String usernameOrEmail) {
        this.usernameOrEmail = usernameOrEmail;
    }

    public String getPasswords() {
        return passwords;
    }

    public void setPasswords(String passwords) {
        this.passwords = passwords;
    }
}
