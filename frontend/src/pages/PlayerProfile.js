import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/PlayerProfile.css'; // Corrected CSS file import
import DefaultProfileImage from '../assets/default_profile.png';
import PlayerNavbar from '../components/PlayerNavbar'; // Import the PlayerNavbar component

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(DefaultProfileImage);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError(null);
      const loggedInUserId = localStorage.getItem("loggeduserid");

      if (!loggedInUserId) {
        setError("User not logged in. Please log in to view your profile.");
        setLoading(false);
        // Optionally redirect to login page
        // navigate('/login'); 
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8080/api/users/${loggedInUserId}`);
        const fetchedUser = response.data;
        setUserData(fetchedUser);

        if (fetchedUser.uImage) {
          setProfileImage(fetchedUser.uImage);
        } else {
          setProfileImage(DefaultProfileImage);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to fetch profile data. Please ensure the backend is running and the API endpoint is correct.");
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // Empty dependency array means this runs once on component mount

  if (loading || error) {
    return (
      <>
        <PlayerNavbar /> {/* Used the new Navbar component */}
        <div className="profile-container">
          {loading && <div className="loading-message">Loading profile...</div>}
          {error && <div className="error-message">{error}</div>}
        </div>
      </>
    );
  }

  return (
    <>
      <PlayerNavbar /> {/* Used the new Navbar component */}
      <div className="profile-container">
        <h2>My Profile</h2>
        
        <div className="profile-image-section">
          <div className="profile-image-wrapper"> 
            <img 
              src={profileImage} 
              alt="Profile" 
              className="profile-picture" 
              onError={(e) => { e.target.onerror = null; e.target.src = DefaultProfileImage; }}
            />
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-item">
            <strong>Name:</strong> <span>{userData.uname}</span>
          </div>
          <div className="detail-item">
            <strong>Username:</strong> <span>{userData.username}</span>
          </div>
          <div className="detail-item">
            <strong>Email:</strong> <span>{userData.email}</span>
          </div>
          <div className="detail-item">
            <strong>Phone No:</strong> <span>{userData.uphoneNo}</span>
          </div>
          <div className="detail-item">
            <strong>Aadhar:</strong> <span>{userData.aadhar}</span>
          </div>
          <div className="detail-item">
            <strong>Address:</strong> <span>{userData.uaddress}</span>
          </div>
          <div className="detail-item">
            <strong>City:</strong> <span>{userData.city ? userData.city.cname : 'N/A'}</span>
          </div>
        </div>
        <button className="edit-profile-button" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
      </div>
    </>
  );
};

export default Profile;
