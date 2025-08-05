import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/myBookings.css'; // Ensure this CSS file exists and contains styles for navbar and table

const MyBookings = () => { // Corrected component name to start with uppercase 'M'
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyBookings = async () => {
      setLoading(true);
      setError(null);
      const loggedInUserId = localStorage.getItem("loggeduserid"); // Get user ID from localStorage

      if (!loggedInUserId) {
        setError("User not logged in. Please log in to view your bookings.");
        setLoading(false);
        // Optional: Redirect to login page if user is not logged in
        // navigate('/login'); 
        return;
      }

      try {
        // Make API call to your backend endpoint for user-specific bookings
        const response = await axios.get(`http://localhost:8080/api/bookings/user/${loggedInUserId}`);
        
        if (Array.isArray(response.data) && response.data.length > 0) {
          setBookings(response.data);
        } else {
          setBookings([]); // Set to empty array if no bookings or invalid data
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings. Please ensure the backend is running and the API endpoint is correct.");
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []); // Empty dependency array means this runs once on component mount

  // Render loading or error state with the integrated navbar
  if (loading || error) {
    return (
      <>
        {/* Integrated Navbar for My Bookings Page */}
        <nav className="player-navbar">
          <div className="player-navbar-brand">Ground Booking App</div>
          <div className="player-navbar-links">
            <Link to="/playerHome" className="player-nav-link">Home</Link>
            {/* Corrected Link path to match App.js route */}
            <Link to="/myBookings" className="player-nav-link">My Bookings</Link> 
            <Link to="/profile" className="player-nav-link">Profile</Link>
          </div>
        </nav>
        {/* Corrected class name to match CSS */}
        <div className="myBookings-container"> 
          {loading && <div className="loading-message">Loading your bookings...</div>}
          {error && <div className="error-message">{error}</div>}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Integrated Navbar for My Bookings Page */}
      <nav className="player-navbar">
        <div className="player-navbar-brand">Ground Booking App</div>
        <div className="player-navbar-links">
          <Link to="/playerHome" className="player-nav-link">Home</Link>
          {/* Corrected Link path to match App.js route */}
          <Link to="/myBookings" className="player-nav-link">My Bookings</Link> 
          <Link to="/profile" className="player-nav-link">Profile</Link>
        </div>
      </nav>

      {/* Corrected class name to match CSS */}
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
                  {/* Add more headers if your Booking entity has other relevant fields */}
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.bid}> {/* Use bId as the unique key */}
                    <td>{booking.ground.gname}</td> {/* Accessing ground name from nested object */}
                    <td>{new Date(booking.bdateTime).toLocaleDateString()}</td> {/* Format date */}
                    <td>{booking.timeFrom}</td>
                    <td>{booking.timeTo}</td>
                    <td>₹   {booking.bamt}</td>
                    {/* Add more cells as per your Booking entity's fields */}
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
