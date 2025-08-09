// src/pages/OwnerBookings.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OwnerNavbar from '../components/OwnerNavbar';
import '../Styles/OwnerHome.css'; // Reusing some styles for container
import '../Styles/OwnerBooking.css'; // New styles for the table

const OwnerBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOwnerBookings = async () => {
            try {
                // Retrieve the owner ID from local storage
                const ownerId = localStorage.getItem("loggeduserid");
                if (!ownerId) {
                    setError("No owner ID found. Please log in.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`http://localhost:8080/api/bookings/owner/${ownerId}`);
                
                if (Array.isArray(response.data)) {
                    setBookings(response.data);
                } else {
                    setBookings([]);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching owner's bookings:", err);
                setError("Failed to fetch bookings. Please check your backend server.");
                setLoading(false);
            }
        };
        fetchOwnerBookings();
    }, []);

    // Helper function to format the date and time
    const formatDateTime = (dateString, timeString) => {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString();
        return `${formattedDate}, from ${timeString}`;
    };

    if (loading) {
        return (
            <>
                <OwnerNavbar />
                <div className="owner-home-container">
                    <div className="loading-message">Loading bookings...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <OwnerNavbar />
                <div className="owner-home-container">
                    <div className="error-message">{error}</div>
                </div>
            </>
        );
    }

    return (
        <>
            <OwnerNavbar />
            <div className="owner-home-container">
                <h2>Your Ground Bookings</h2>
                {bookings.length > 0 ? (
                    <div className="bookings-table-container">
                        <table className="bookings-table">
                            <thead>
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Ground Name</th>
                                    <th>Booked By</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.bId}>
                                        <td>{booking.bId}</td>
                                        <td>{booking.ground.gName}</td>
                                        <td>{booking.user.uname}</td>
                                        <td>{new Date(booking.bDateTime).toLocaleDateString()}</td>
                                        <td>{booking.timeFrom} to {booking.timeTo}</td>
                                        <td>₹{booking.bAmt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="no-grounds-message">
                        You don't have any bookings yet.
                    </div>
                )}
            </div>
        </>
    );
};

export default OwnerBookings;
