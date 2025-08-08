import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/playerHome.css';

const PlayerNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user ID from localStorage
    localStorage.removeItem("loggeduserid");
    // The <Link> component will handle the redirection, but we still need this function to clear the session data.
  };

  return (
    <nav className="player-navbar">
      <div className="player-navbar-brand">Ground Booking App</div>
      <div className="player-navbar-links">
        <Link to="/playerHome" className="player-nav-link">Home</Link>
        <Link to="/myBookings" className="player-nav-link">My Bookings</Link>
        <Link to="/profile" className="player-nav-link">Profile</Link>
        <Link to="/" className="player-nav-link" onClick={handleLogout}>
            Logout
        </Link>
      </div>
    </nav>
  );
};

export default PlayerNavbar;
