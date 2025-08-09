package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Ground;
import com.example.demo.services.GroundService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/grounds")
public class GroundController {

    private final GroundService groundService;

    @Autowired
    public GroundController(GroundService groundService) {
        this.groundService = groundService;
    }

    @GetMapping("getAll")
    public List<Ground> getAllGrounds() {
        return groundService.getAllGrounds();
    }

    @GetMapping("getById/{id}")
    public ResponseEntity<Ground> getGroundById(@PathVariable Integer id) {
        Optional<Ground> ground = groundService.getGroundById(id);
        return ground.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/owner/{ownerId}")
    public List<Ground> getGroundsByOwnerId(@PathVariable Integer ownerId) {
        return groundService.getGroundsByOwnerId(ownerId);
    }
    
    // New method to delete a ground, used by OwnerHome.js
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteGround(@PathVariable Integer id) {
        if (groundService.getGroundById(id).isPresent()) {
            groundService.deleteGround(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/add")
    public ResponseEntity<Ground> addGround(@RequestBody Ground ground) {
        Ground savedGround = groundService.addGround(ground);
        return ResponseEntity.ok(savedGround);
    }
}