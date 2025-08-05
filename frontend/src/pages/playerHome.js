import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Styles/playerHome.css';
import DefaultGroundImage from '../assets/default_ground.png';

const PlayerHome = () => {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/grounds/getAll');
        
        if (Array.isArray(response.data) && response.data.length > 0) {
          setGrounds(response.data);
        } else {
          setGrounds([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching grounds:", err);
        setError("Failed to fetch grounds. Please check your backend server.");
        setLoading(false);
      }
    };
    fetchGrounds();
  }, []);

  if (loading || error) {
    return (
      <>
        <nav className="player-navbar">
          <div className="player-navbar-brand">Ground Booking App</div>
          <div className="player-navbar-links">
            <Link to="/playerHome" className="player-nav-link">Home</Link>
            <Link to="/my-bookings" className="player-nav-link">My Bookings</Link>
            <Link to="/profile" className="player-nav-link">Profile</Link>
          </div>
        </nav>
        <div className="player-home-container">
          {loading && <div className="loading-message">Loading grounds...</div>}
          {error && <div className="error-message">{error}</div>}
        </div>
      </>
    );
  }

  return (
    <>
      <nav className="player-navbar">
        <div className="player-navbar-brand">Ground Booking App</div>
        <div className="player-navbar-links">
          <Link to="/playerHome" className="player-nav-link">Home</Link>
          <Link to="/my-bookings" className="player-nav-link">My Bookings</Link>
          <Link to="/profile" className="player-nav-link">Profile</Link>
        </div>
      </nav>
      
      <div className="player-home-container">
        <h2>Available Grounds</h2>
        <div className="grounds-list">
          {grounds.map((ground) => (
            <div key={ground.gid} className="ground-card">
              <img 
                src={ground.gImages ? ground.gImages : DefaultGroundImage} 
                alt={ground.gname} 
                className="ground-image" 
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src = DefaultGroundImage;
                }}
              />
              <div className="ground-details">
                <h3>{ground.gname}</h3>
                <p>{ground.gdescription}</p>
                <div className="ground-footer">
                  <button className="booking-button">Book Now</button>
                  <span className="ground-rate">₹{ground.sport.srate} per hour</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlayerHome;