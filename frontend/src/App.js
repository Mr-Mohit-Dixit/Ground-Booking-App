import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Removed useNavigate from import

// Components for navigation and forms
import Navbar from "./components/Navbar"; 
import LoginForm from "./components/LoginForm"; // Ensure this LoginForm handles its own navigation now
import RegisterForm from "./components/RegisterForm";

// Page components
import EditProfile from "./pages/EditProfile";
import AdminPage from "./pages/AdminPage";
import GroundOwnerPage from "./pages/GroundOwnerPage";
import PlayerPage from "./pages/PlayerPage";
import PlayerHome from "./pages/PlayerHome";
import PlayerProfile from "./pages/PlayerProfile";

// New components for booking functionality
import BookingForm from "./components/bookingform"; 
import MyBookings from "./pages/MyBookings";

const App = () => {
  // State to determine if the user is logged in
  // Initialize from localStorage to persist login status across refreshes
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("loggeduserid"));
  const [selectedForm, setSelectedForm] = useState(null);

  // Function to handle successful login (only updates state, no navigation here)
  const handleLoginSuccess = (userId) => {
    localStorage.setItem("loggeduserid", userId); // Store user ID
    setIsLoggedIn(true); // Update login state
    // Navigation will be handled by the LoginForm component internally
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("loggeduserid"); // Clear user ID
    setIsLoggedIn(false); // Update login state
    // For logout, the PlayerNavbar Link to="/" will handle the redirection.
  };

  // Use useEffect to check login status on initial load (if not already handled by useState init)
  useEffect(() => {
    const userId = localStorage.getItem("loggeduserid");
    if (userId) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <Router> {/* The Router component provides the context for nested components */}
      {/* Navbar will receive isLoggedIn and handleLogout props */}
      <Navbar onFormSelect={setSelectedForm} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      
      <Routes>
        {/* Root Path: Conditionally show login/register forms or PlayerHome */}
        <Route
          path="/"
          element={
            !isLoggedIn ? ( // If not logged in, show forms or initial message
              !selectedForm ? (
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "50px",
                    color: "#555",
                  }}
                >
                  <p>Please choose an option above to continue.</p>
                </div>
              ) : selectedForm === "login" ? (
                // LoginForm should now handle its own navigation after successful login
                <LoginForm onLoginSuccess={handleLoginSuccess} /> 
              ) : (
                <RegisterForm />
              )
            ) : (
              // If logged in, render PlayerHome directly at the root path
              // Note: This effectively makes '/' the logged-in home if you're already authenticated
              <PlayerHome isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> 
            )
          }
        />

        {/* Existing application routes */}
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/ground-owner" element={<GroundOwnerPage />} />
        <Route path="/player" element={<PlayerPage />} /> 
        <Route path="/edit-profile" element={<EditProfile />} />
        
        {/* PlayerHome also receives login state and logout handler */}
        <Route path="/playerHome" element={<PlayerHome isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        <Route path="/profile" element={<PlayerProfile />} />
        
        {/* Routes for Booking functionality */}
        <Route path="/book-ground/:groundId" element={<BookingForm />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        {/* Catch-all route for any undefined paths */}
        <Route path="*" element={<p style={{textAlign: "center", marginTop: "50px", color: "#e74c3c"}}>404: Page Not Found</p>} />
      </Routes>
    </Router>
  );
};

export default App;
