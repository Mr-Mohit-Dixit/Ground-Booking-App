import React from 'react';
import './Navbar.css';

const Navbar = ({ onFormSelect }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Ground Booking App</div>
      <div className="navbar-links">
        <button onClick={() => onFormSelect('login')}>Login</button>
        <button onClick={() => onFormSelect('register')}>Register</button>
      </div>
    </nav>
  );
};

export default Navbar;
