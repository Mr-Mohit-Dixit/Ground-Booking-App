import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/OwnerNavbar.css';

const OwnerNavbar = () => {
  return (
    <nav className="owner-navbar">
      <div className="owner-navbar-brand">Ground Booking App</div>
      <div className="owner-navbar-links">
        <Link to="/ownerHome" className="owner-nav-link">Dashboard</Link>
        <Link to="/ownerBookings" className="owner-nav-link">Bookings</Link>
        <Link to="/addGround" className="owner-nav-link">Add Ground</Link>
        <Link to="/ownerProfile" className="owner-nav-link">Profile</Link>
      </div>
    </nav>
  );
};

export default OwnerNavbar;