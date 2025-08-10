package com.example.demo.controllers;

import com.example.demo.entities.City;
import com.example.demo.entities.Ground; // Import Ground entity
import com.example.demo.services.CityService;
import com.example.demo.services.GroundService; // Import GroundService
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
@RestController
@RequestMapping("/api/cities")
public class CityController {

    @Autowired
    private CityService cityService;

    @Autowired
    private GroundService groundService; // Inject GroundService to get grounds

    @GetMapping("/all")
    public List<City> getAllCities() {
        return cityService.getAllCities();
    }

    /**
     * @param cityId The ID of the city.
     * @return A list of Ground objects belonging to the specified city.
     */
    @GetMapping("/{cityId}/grounds")
    public List<Ground> getGroundsByCityId(@PathVariable Integer cityId) {
        return groundService.getGroundsByCityId(cityId);
    }
}