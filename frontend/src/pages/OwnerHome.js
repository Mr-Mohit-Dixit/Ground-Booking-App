import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OwnerNavbar from '../components/OwnerNavbar';
import '../Styles/OwnerHome.css';
import DefaultGroundImage from '../assets/default_ground.png';

const OwnerHome = () => {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const fetchOwnerGrounds = async () => {
      try {
        const ownerId = localStorage.getItem("loggeduserid");
        const response = await axios.get(`http://localhost:8080/api/grounds/owner/${ownerId}`);
        
        if (Array.isArray(response.data)) {
          setGrounds(response.data);
        } else {
          setGrounds([]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching owner's grounds:", err);
        setError("Failed to fetch grounds. Please check your backend server.");
        setLoading(false);
      }
    };
    fetchOwnerGrounds();
  }, []);

  const handleDeleteGround = async (groundId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this ground?");
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:8080/api/grounds/${groundId}`);
        setGrounds(grounds.filter(ground => ground.gid !== groundId));
        alert("Ground deleted successfully!");
      } catch (err) {
        console.error("Error deleting ground:", err);
        alert("Failed to delete ground.");
      }
    }
  };

  const toggleDropdown = (groundId) => {
    setActiveDropdown(activeDropdown === groundId ? null : groundId);
  };

  return (
    <>
      <OwnerNavbar />
      
      {loading ? (
        <div className="owner-home-container">
          <div className="loading-message">Loading grounds...</div>
        </div>
      ) : error ? (
        <div className="owner-home-container">
          <div className="error-message">{error}</div>
        </div>
      ) : (
        <div className="owner-home-container">
          <h2>Your Grounds</h2>
          <div className="grounds-list">
            {grounds.length > 0 ? (
              grounds.map((ground) => (
                <div key={ground.gid} className="ground-card owner-card">
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
                    <h3>{ground.gname +" - "+ ground.sport.sname}</h3>
                    <p id='groundDescription'>{ground.gdescription}</p>
                    <p id="groundAddress">{ground.address}</p>
                    <div className="ground-footer">
                      <span className="ground-rate">₹{ground.sport?.srate} /HR</span>
                      {/* Dropdown Container is now inside the ground-footer */}
                      <div className="dropdown">
                        <button className="dropbtn" onClick={() => toggleDropdown(ground.gid)}>
                          <div className="three-dots">
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                          </div>
                        </button>
                        <div className={`dropdown-content ${activeDropdown === ground.gid ? 'show-above' : ''}`}>
                          <Link to={`/editGround/${ground.gid}`} className="dropdown-item">
                            <span>Edit Ground</span>
                          </Link>
                          <button onClick={() => handleDeleteGround(ground.gid)} className="dropdown-item">
                            <span>Delete Ground</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-grounds-message">
                You have not added any grounds yet. <Link to="/addGround">Add your first ground!</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default OwnerHome;