package com.example.demo.services;

import com.example.demo.entities.Ground;
import com.example.demo.repositories.GroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional; // This import is important for findById

@Service
public class GroundService {

    @Autowired
    private GroundRepository groundRepository;

    public List<Ground> getAllGrounds() {
        return groundRepository.findAll();
    }

    /**
     * Retrieves a single Ground entity by its ID.
     * @param groundId The ID of the ground to retrieve.
     * @return The Ground object if found, otherwise null.
     */
    public Ground getById(Integer groundId) {
        // findById returns an Optional, so we use .orElse(null) to get the Ground object or null.
        return groundRepository.findById(groundId).orElse(null);
    }

    public List<Ground> getGroundsByCityId(Integer cityId) {
        return groundRepository.findByCity_cId(cityId);
    }

    public Ground saveGround(Ground ground) {
        return groundRepository.save(ground);
    }

    public void deleteGround(Integer id) {
        groundRepository.deleteById(id);
    }
}