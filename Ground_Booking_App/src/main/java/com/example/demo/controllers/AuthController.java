package com.example.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.User;
import com.example.demo.dto.LoginRequest;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Handles user login authentication.
     * @param loginRequest The DTO containing the user's login credentials.
     * @return A ResponseEntity with the authenticated user object and HTTP status OK
     * on success, or a ResponseEntity with a message and HTTP status UNAUTHORIZED
     * on failure.
     */
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.authenticateUser(
                loginRequest.getUsernameOrEmail(),
                loginRequest.getPasswords()
        );

        if (user != null) {
            // Authentication successful.
            // In a production app, you would generate a JWT token here.
            return ResponseEntity.ok(user);
        } else {
            // Authentication failed.
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username/email or password.");
        }
    }
}
