import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import EditProfile from "./pages/EditProfile";
import AdminPage from "./pages/AdminPage";
import GroundOwnerPage from "./pages/GroundOwnerPage";
import PlayerPage from "./pages/PlayerPage";
import PlayerHome from "./pages/PlayerHome";
import MyBookings from "./pages/MyBookings";
import PlayerProfile from "./pages/PlayerProfile"; // Import the new Profile component

const App = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const MainContent = () => {
    return (
      <Routes>
        <Route
          path="/"
          element={
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
              <LoginForm />
            ) : (
              <RegisterForm />
            )
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/ground-owner" element={<GroundOwnerPage />} />
        <Route path="/player" element={<PlayerPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/playerHome" element={<PlayerHome />} />
        <Route path="/myBookings" element={<MyBookings />} />
        <Route path="/profile" element={<PlayerProfile />} /> {/* New route for Profile */}
      </Routes>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<><Navbar onFormSelect={setSelectedForm} /><MainContent /></>} />
        <Route path="*" element={<MainContent />} />
      </Routes>
    </Router>
  );
};

export default App;