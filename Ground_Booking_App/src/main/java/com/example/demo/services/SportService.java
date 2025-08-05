package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Sport;
import com.example.demo.repositories.SportRepository;

import java.util.List;
import java.util.Optional;

@Service
public class SportService {

    @Autowired
    private SportRepository sportRepository;

    public List<Sport> getAllSports() {
        return sportRepository.findAll();
    }

    public Optional<Sport> getSportById(int id) {
        return sportRepository.findById(id);
    }
}
