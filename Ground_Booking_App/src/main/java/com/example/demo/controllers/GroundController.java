package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
    public ResponseEntity<Ground> getGroundById(@PathVariable Long id) {
        Optional<Ground> ground = groundService.getGroundById(id);
        return ground.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
}