import React, { useState, useEffect } from 'react'; // Removed useRef
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../Styles/PlayerProfile.css'; // Corrected CSS file import
import DefaultProfileImage from '../assets/default_profile.png'; // Make sure you have this image in src/assets
// Removed FaCamera import as it's no longer used
// import { FaCamera } from 'react-icons/fa'; 

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileImage, setProfileImage] = useState(DefaultProfileImage); // State for displaying profile image
  // Removed fileInputRef and its useRef
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

        // Set profile image from fetched data or use default
        // Assuming your User entity has a 'uImage' field for the profile picture URL
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

  // Removed handleImageChange and handleImageClick functions

  if (loading || error) {
    return (
      <>
        {/* Integrated Navbar */}
        <nav className="player-navbar">
          <div className="player-navbar-brand">Ground Booking App</div>
          <div className="player-navbar-links">
            <Link to="/playerHome" className="player-nav-link">Home</Link>
            <Link to="/myBookings" className="player-nav-link">My Bookings</Link>
            <Link to="/profile" className="player-nav-link">Profile</Link>
          </div>
        </nav>
        <div className="profile-container">
          {loading && <div className="loading-message">Loading profile...</div>}
          {error && <div className="error-message">{error}</div>}
        </div>
      </>
    );
  }

  return (
    <>
      {/* Integrated Navbar */}
      <nav className="player-navbar">
        <div className="player-navbar-brand">Ground Booking App</div>
        <div className="player-navbar-links">
          <Link to="/playerHome" className="player-nav-link">Home</Link>
          <Link to="/myBookings" className="player-nav-link">My Bookings</Link>
          <Link to="/profile" className="player-nav-link">Profile</Link>
        </div>
      </nav>

      <div className="profile-container">
        <h2>My Profile</h2>
        
        <div className="profile-image-section">
          {/* Removed onClick={handleImageClick} from profile-image-wrapper */}
          <div className="profile-image-wrapper"> 
            <img 
              src={profileImage} 
              alt="Profile" 
              className="profile-picture" 
              onError={(e) => { e.target.onerror = null; e.target.src = DefaultProfileImage; }}
            />
          </div>
          {/* Removed camera-icon-overlay and input type="file" */}
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
            {/* Assuming nested city object with cname */}
            <strong>City:</strong> <span>{userData.city ? userData.city.cname : 'N/A'}</span>
          </div>
          {/* Do NOT display passwords */}
        </div>
        {/* Added Edit Profile button */}
        <button className="edit-profile-button" onClick={() => navigate('/edit-profile')}>Edit Profile</button>
      </div>
    </>
  );
};

export default Profile;
