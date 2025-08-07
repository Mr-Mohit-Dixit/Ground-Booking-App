// src/components/PlayerNavbar.js

import React from 'react';
import { Link } from 'react-router-dom';

const PlayerNavbar = () => {
  return (
    <nav className="player-navbar">
      <div className="player-navbar-brand">Ground Booking App</div>
      <div className="player-navbar-links">
        <Link to="/playerHome" className="player-nav-link">Home</Link>
        <Link to="/myBookings" className="player-nav-link">My Bookings</Link>
        <Link to="/profile" className="player-nav-link">Profile</Link>
      </div>
    </nav>
  );
};

export default PlayerNavbar;