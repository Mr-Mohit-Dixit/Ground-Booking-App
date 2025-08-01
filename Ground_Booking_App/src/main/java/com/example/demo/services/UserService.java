package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.dto.RegisterRequest;
import com.example.demo.entities.City;
import com.example.demo.entities.Roles;
import com.example.demo.entities.User;
import com.example.demo.repositories.CityRepository;
import com.example.demo.repositories.RoleRepository;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    public User authenticateUser(String usernameOrEmail, String passwords) {
    	
    	User user = userRepository.findByUsername(usernameOrEmail);
        
        if (user == null) {
            user = userRepository.findByEmail(usernameOrEmail);
        }

        if (user != null && user.getPasswords().equals(passwords)) {
            return user;
        }

        // Authentication failed
        return null;
    }
    
    public User registerUser(RegisterRequest request, RoleRepository roleRepository, CityRepository cityRepository) {

    	 // Print received role ID and available roles
        System.out.println("Received Role ID: " + request.getRId());
        System.out.println("All roles in database:");
        roleRepository.findAll().forEach(role -> System.out.println("rId: " + role.getRId()));
    	
        // Check for duplicate username, email, or aadhar
        if (userRepository.existsByUsername(request.getUsername()) ||
            userRepository.existsByEmail(request.getEmail()) ||
            userRepository.existsByAadhar(request.getAadhar())) {
            return null;
        }

        // Fetch role
        Optional<Roles> roleOpt = roleRepository.findById(request.getRId());
        if (roleOpt.isEmpty()) {
            return null;
        }

        // Fetch city
        Optional<City> cityOpt = cityRepository.findById(request.getCId());
        if (cityOpt.isEmpty()) {
            return null;
        }

        // Create and populate User object
        User user = new User();
        user.setUsername(request.getUsername());
        user.setEmail(request.getEmail());
        user.setPasswords(request.getPasswords());
        user.setAadhar(request.getAadhar());
        user.setUAddress(request.getuAddress());
        user.setUPhoneNo(request.getuPhoneNo());
        user.setRole(roleOpt.get());
        user.setCity(cityOpt.get());

        // Save user
        return userRepository.save(user);
    }



    // Existing methods from the previous code block
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(int id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User getUserByAadhar(String aadhar) {
        return userRepository.findByAadhar(aadhar);
    }
}
