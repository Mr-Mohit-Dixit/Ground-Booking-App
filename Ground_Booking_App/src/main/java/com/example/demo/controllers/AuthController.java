package com.example.demo.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.RegisterRequest;
import com.example.demo.entities.City;
import com.example.demo.entities.Roles;
import com.example.demo.entities.User;
import com.example.demo.repositories.CityRepository;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.UserService;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final RoleRepository roleRepository;
    private final CityRepository cityRepository;
    private final UserRepository userRepository;

    public AuthController(UserService userService, RoleRepository roleRepository, CityRepository cityRepository, UserRepository userRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
        this.cityRepository = cityRepository;
		this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        User user = userService.authenticateUser(
                loginRequest.getUsernameOrEmail(),
                loginRequest.getPasswords()
        );

        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username/email or password.");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody RegisterRequest request) {
        System.out.println("----- Incoming RegisterRequest -----");
        System.out.println("Username: " + request.getUsername());
        System.out.println("Email: " + request.getEmail());
        System.out.println("Password: " + request.getPasswords());
        System.out.println("Aadhar: " + request.getAadhar());
        System.out.println("Address: " + request.getuAddress());
        System.out.println("Phone No: " + request.getuPhoneNo());
        System.out.println("Name: " + request.getuName());
        System.out.println("Role ID (rId): " + request.getRId());
        System.out.println("City ID (cId): " + request.getCId());
        System.out.println("------------------------------------");

        // Validate role and city
        if (request.getRId() == null || request.getCId() == null) {
            return ResponseEntity.badRequest().body("Missing role ID or city ID.");
        }

        Optional<Roles> roleOptional = roleRepository.findById(request.getRId());
        Optional<City> cityOptional = cityRepository.findById(request.getCId());

        if (roleOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid role ID.");
        }

        if (cityOptional.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid city ID.");
        }

        // Validate unique fields
        if (userRepository.findByUsername(request.getUsername()) != null ||
        	    userRepository.findByEmail(request.getEmail()) != null ||
        	    userRepository.findByAadhar(request.getAadhar()) != null) {
        	    return null;
        	}

        // Create and save new user
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswords(request.getPasswords());
        user.setAadhar(request.getAadhar());
        user.setUAddress(request.getuAddress());
        user.setUPhoneNo(request.getuPhoneNo()); 
        user.setUName(request.getuName());
        user.setRole(roleOptional.get());
        user.setCity(cityOptional.get());

        System.out.println("Prepared user: " + user);
        System.out.println("Phone number before save: " + user.getUPhoneNo());

        System.out.println("uPhoneNo: " + user.getUPhoneNo());
        
        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully.");
    }
}
