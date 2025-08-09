import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import EditProfile from "./pages/EditProfile";
import AdminPage from "./pages/AdminPage";
import OwnerHome from "./pages/OwnerHome";
import PlayerPage from "./pages/PlayerPage";
import PlayerHome from "./pages/PlayerHome";
import MyBookings from "./pages/MyBookings";
import OwnerBookings from "./pages/OwnerBookings";
import OwnerProfile from "./pages/OwnerProfile";
import AddGround from "./pages/AddGround";

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
        <Route path="/ownerHome" element={<OwnerHome />} />
        <Route path="/player" element={<PlayerPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/playerHome" element={<PlayerHome />} />
        <Route path="/myBookings" element={<MyBookings />} />
        <Route path="/ownerProfile" element={<OwnerProfile />} /> {/* New route for Profile */}
        <Route path="/ownerBookings" element={<OwnerBookings />} /> {/* New route for Profile */}
        <Route path="/addGround" element={<AddGround />} /> {/* New route for Profile */}
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