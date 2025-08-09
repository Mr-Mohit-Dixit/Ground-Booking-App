package com.example.demo.services;

import com.example.demo.entities.Booking;
import com.example.demo.repositories.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUserId(Integer userId) {
        return bookingRepository.findByUser_uId(userId);
    }
    
    public List<Booking> getBookingsByGroundOwnerId(Integer ownerId) {
        return bookingRepository.findByGround_User_uId(ownerId);
    }
}
