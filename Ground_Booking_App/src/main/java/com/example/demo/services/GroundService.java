package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Ground;
import com.example.demo.repositories.GroundRepository;

import java.util.List;
import java.util.Optional;

@Service
public class GroundService {

    private final GroundRepository groundRepository;

    @Autowired
    public GroundService(GroundRepository groundRepository) {
        this.groundRepository = groundRepository;
    }

    public List<Ground> getAllGrounds() {
        return groundRepository.findAll();
    }

    public Optional<Ground> getGroundById(Integer id) {
        return groundRepository.findById(id);
    }
}