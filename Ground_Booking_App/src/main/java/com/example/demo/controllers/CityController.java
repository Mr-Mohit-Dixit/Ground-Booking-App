package com.example.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.City;
import com.example.demo.repositories.CityRepository;

@RestController
@RequestMapping("/api/cities")
public class CityController {
    private final CityRepository cityRepo;

    public CityController(CityRepository cityRepo) {
        this.cityRepo = cityRepo;
    }

    @GetMapping("/all")
    public List<City> getAllCities() {
        return cityRepo.findAll();
    }
}
