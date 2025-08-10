package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin; // Added CrossOrigin for consistency

import com.example.demo.entities.Ground;
import com.example.demo.services.GroundService;

import java.util.List;
// Removed Optional import as it's no longer used directly in the controller method

@RestController
@RequestMapping("/api/grounds")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend for this controller too
public class GroundController {

    private final GroundService groundService;

    @Autowired
    public GroundController(GroundService groundService) {
        this.groundService = groundService;
    }

    @GetMapping("/getAll") 
    public List<Ground> getAllGrounds() {
        return groundService.getAllGrounds();
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Ground> getGroundById(@PathVariable Integer id) {
        Ground ground = groundService.getById(id); // This returns Ground or null

        if (ground != null) {
            return ResponseEntity.ok(ground); 
        } else {
            return ResponseEntity.notFound().build(); 
        }
    }
}