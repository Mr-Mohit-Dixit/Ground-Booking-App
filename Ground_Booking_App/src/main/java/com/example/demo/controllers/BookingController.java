//package com.example.demo.controllers;
//
//import com.example.demo.entities.Booking;
//import com.example.demo.services.BookingService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:3000")
//@RequestMapping("/api/bookings")
//public class BookingController {
//
//    @Autowired
//    private BookingService bookingService;
//
//    @PostMapping("/addBooking")
//    public Booking addBooking(@RequestBody Booking booking) {
//        return bookingService.saveBooking(booking);
//    }
//
//    @GetMapping("/getAll")
//    public List<Booking> getAllBookings() {
//        return bookingService.getAllBookings();
//    }
//
//    @GetMapping("/user/{userId}")
//    public List<Booking> getBookingsByUserId(@PathVariable Integer userId) {
//        return bookingService.getBookingsByUserId(userId);
//    }
//}


package com.example.demo.controllers;

import com.example.demo.entities.Booking;
import com.example.demo.entities.User;
import com.example.demo.entities.Ground;
import com.example.demo.services.BookingService;
import com.example.demo.repositories.UserRepository;
import com.example.demo.repositories.GroundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private GroundRepository groundRepository;

    // POST: Create booking
    @PostMapping("/allbooking")
    public Booking createBooking(@RequestBody Booking booking) {
//        if (booking.getUser() != null && booking.getUser().getUId() != null) {
//            User user = userRepository.findById(booking.getUser().getUId())
//                    .orElseThrow(() -> new RuntimeException("User not found"));
//            booking.setUser(user);
//        }
//
//        if (booking.getGround() != null && booking.getGround().getgId() != null) {
//            Ground ground = groundRepository.findById(booking.getGround().getgId())
//                    .orElseThrow(() -> new RuntimeException("Ground not found"));
//            booking.setGround(ground);
//        }
    	
    	
    	if (booking.getUser() != null && booking.getUser().getUId() > 0) {
    	    User user = userRepository.findById(booking.getUser().getUId())
    	            .orElseThrow(() -> new RuntimeException("User not found"));
    	    booking.setUser(user);
    	}

    	if (booking.getGround() != null && booking.getGround().getgId() > 0) {
    	    Ground ground = groundRepository.findById(booking.getGround().getgId())
    	            .orElseThrow(() -> new RuntimeException("Ground not found"));
    	    booking.setGround(ground);
    	}


        return bookingService.saveBooking(booking);
    }

    // GET: All bookings
    @GetMapping("/all")
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    // GET: Bookings by User ID
    @GetMapping("/user/{userId}")
    public List<Booking> getBookingsByUserId(@PathVariable Integer userId) {
        return bookingService.getBookingsByUserId(userId);
    }
}

