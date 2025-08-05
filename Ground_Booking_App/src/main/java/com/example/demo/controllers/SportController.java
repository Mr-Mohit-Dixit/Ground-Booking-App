package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entities.Sport;
import com.example.demo.services.SportService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sports")
public class SportController {

    @Autowired
    private SportService sportService;

    @GetMapping("/all")
    public List<Sport> getAllSports() {
        return sportService.getAllSports();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Sport> getSportById(@PathVariable int id) {
        Optional<Sport> sport = sportService.getSportById(id);
        return sport.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
}
