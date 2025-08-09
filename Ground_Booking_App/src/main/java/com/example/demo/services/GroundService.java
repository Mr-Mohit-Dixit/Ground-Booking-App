package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Ground;
import com.example.demo.repositories.CityRepository;
import com.example.demo.repositories.GroundRepository;
import com.example.demo.repositories.SportRepository;
import com.example.demo.repositories.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class GroundService {

	private final GroundRepository groundRepository;
    private final CityRepository cityRepository; // Inject new repositories
    private final UserRepository userRepository;
    private final SportRepository sportRepository;

    @Autowired
    public GroundService(GroundRepository groundRepository, CityRepository cityRepository, UserRepository userRepository,                         SportRepository sportRepository) 
    {
        this.groundRepository = groundRepository;
        this.cityRepository = cityRepository;
        this.userRepository = userRepository;
        this.sportRepository = sportRepository;
    }

    public List<Ground> getAllGrounds() {
        return groundRepository.findAll();
    }

    public Optional<Ground> getGroundById(Integer id) {
        return groundRepository.findById(id);
    }
    
 // New method to fetch a list of grounds by the owner's user ID
    public List<Ground> getGroundsByOwnerId(Integer ownerId) {
        return groundRepository.findByUser_uId(ownerId);
    }

    // New method to delete a ground by its ID
    public void deleteGround(Integer id) {
        groundRepository.deleteById(id);
    }
    
    // Updated addGround method
    public Ground addGround(Ground ground) {
        // Fetch and set the managed City, User, and Sport entities
        ground.setCity(cityRepository.findById(ground.getCity().getCId())
                            .orElseThrow(() -> new IllegalArgumentException("Invalid city ID")));
        ground.setUser(userRepository.findById(ground.getUser().getUId())
                            .orElseThrow(() -> new IllegalArgumentException("Invalid user ID")));
        ground.setSport(sportRepository.findById(ground.getSport().getSId())
                            .orElseThrow(() -> new IllegalArgumentException("Invalid sport ID")));
                            
        return groundRepository.save(ground);
    }
    
}