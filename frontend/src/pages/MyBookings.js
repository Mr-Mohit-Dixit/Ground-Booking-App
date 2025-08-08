import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Styles/myBookings.css'; // Ensure this CSS file exists and contains styles for navbar and table
import PlayerNavbar from '../components/PlayerNavbar'; // Import the new Navbar component

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMyBookings = async () => {
            setLoading(true);
            setError(null);
            const loggedInUserId = localStorage.getItem("loggeduserid");

            if (!loggedInUserId) {
                setError("User not logged in. Please log in to view your bookings.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/bookings/user/${loggedInUserId}`);
                
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setBookings(response.data);
                } else {
                    setBookings([]);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching bookings:", err);
                setError("Failed to fetch bookings. Please ensure the backend is running and the API endpoint is correct.");
                setLoading(false);
            }
        };

        fetchMyBookings();
    }, []);

    if (loading || error) {
        return (
            <>
                <PlayerNavbar />
                <div className="myBookings-container"> 
                    {loading && <div className="loading-message">Loading your bookings...</div>}
                    {error && <div className="error-message">{error}</div>}
                </div>
            </>
        );
    }

    return (
        <>
            <PlayerNavbar />
            <div className="myBookings-container"> 
                <h2>My Bookings</h2>
                {bookings.length === 0 ? (
                    <p className="no-bookings-message">You have no bookings yet.</p>
                ) : (
                    <div className="bookings-table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Ground Name</th>
                                    <th>Date</th>
                                    <th>Time From</th>
                                    <th>Time To</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bookings.map((booking) => (
                                    <tr key={booking.bId}>
                                        <td>{booking.ground.gName}</td>
                                        <td>{new Date(booking.bDateTime).toLocaleDateString()}</td>
                                        <td>{booking.timeFrom}</td>
                                        <td>{booking.timeTo}</td>
                                        <td>₹ {booking.bAmt}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyBookings;
