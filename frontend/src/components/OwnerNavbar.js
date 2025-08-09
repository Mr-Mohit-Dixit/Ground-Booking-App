// src/components/OwnerNavbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/OwnerNavbar.css'; // Create a new CSS file for navbar styles

const OwnerNavbar = () => {
  return (
    <nav className="owner-navbar">
      <div className="owner-navbar-brand">Ground Booking App</div>
      <div className="owner-navbar-links">
        <Link to="/ownerHome" className="owner-nav-link">Dashboard</Link>
        <Link to="/ownerBookings" className="owner-nav-link">Bookings</Link>
        <Link to="/addGround" className="owner-nav-link">Add Ground</Link>
        <Link to="/ownerProfile" className="owner-nav-link">Profile</Link>
        <Link to="/" className="owner-nav-link">Log Out</Link>
      </div>
    </nav>
  );
};

export default OwnerNavbar;