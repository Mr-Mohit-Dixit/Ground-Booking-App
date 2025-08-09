package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Ground;

@Repository
public interface GroundRepository extends JpaRepository<Ground, Integer> {
	
	List<Ground> findByUser_uId(Integer ownerId);

}