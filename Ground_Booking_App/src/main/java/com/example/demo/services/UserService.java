package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * Authenticates a user by checking their username/email and password.
     * @param usernameOrEmail The username or email provided by the user.
     * @param passwords The plaintext password provided by the user.
     * @return The authenticated User object if credentials are valid, otherwise null.
     *
     * IMPORTANT: This method compares passwords in plaintext. In a production
     * environment, you MUST use a password encoder (e.g., BCryptPasswordEncoder)
     * to hash and compare passwords securely.
     */
    public User authenticateUser(String usernameOrEmail, String passwords) {
        // Try to find the user by username first
        User user = userRepository.findByUsername(usernameOrEmail);
        
        // If not found, try to find by email
        if (user == null) {
            user = userRepository.findByEmail(usernameOrEmail);
        }

        // If a user is found, check if the provided password matches
        if (user != null && user.getPasswords().equals(passwords)) {
            // In a real application, you'd compare the plaintext password
            // with a hashed password using a password encoder.
            return user;
        }

        // Authentication failed
        return null;
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
