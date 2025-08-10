import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import '../Styles/playerHome.css'; // Assuming this CSS file contains navbar styles

// PlayerNavbar now accepts 'isLoggedIn' and 'handleLogout' props
const PlayerNavbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate(); // Keeping navigate if you need it for other non-Link navigations

  const onLogoutClick = () => {
    // Call the handleLogout function passed from App.js
    handleLogout();
  };

  return (
    <nav className="player-navbar">
      <div className="player-navbar-brand">Ground Booking App</div>
      <div className="player-navbar-links">
        {/* Conditionally render links based on login status */}
        {isLoggedIn ? (
          <>
            <Link to="/playerHome" className="player-nav-link">Home</Link>
            <Link to="/my-bookings" className="player-nav-link">My Bookings</Link>
            <Link to="/profile" className="player-nav-link">Profile</Link>
            <Link to="/" className="player-nav-link" onClick={onLogoutClick}>
              Logout
            </Link>
          </>
        ) : (
          <>
            {/* These links will only show if not logged in */}
            <Link to="/" className="player-nav-link">Login</Link>
            <Link to="/register" className="player-nav-link">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default PlayerNavbar;