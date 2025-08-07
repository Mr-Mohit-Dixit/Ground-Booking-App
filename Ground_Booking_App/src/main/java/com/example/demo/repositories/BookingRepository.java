package com.example.demo.repositories;

import com.example.demo.entities.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Integer> {
    // Corrected method name to find bookings by user ID
    List<Booking> findByUser_uId(Integer uId);

//    List<Booking> findByGround_uId(Integer uId);
}