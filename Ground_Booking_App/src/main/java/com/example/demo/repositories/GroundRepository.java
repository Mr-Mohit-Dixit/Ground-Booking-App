package com.example.demo.repositories;

import com.example.demo.entities.Ground;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroundRepository extends JpaRepository<Ground, Integer> {

    /**
     
     * @param cityId The ID of the city.
     * @return A list of Ground entities.
     */
    List<Ground> findByCity_cId(Integer cityId);
}