import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import AdminPage from "./pages/AdminPage";
import GroundOwnerPage from "./pages/GroundOwnerPage";
import PlayerPage from "./pages/PlayerPage";

const App = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  return (
    <Router>
      <Navbar onFormSelect={setSelectedForm} />
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
      </Routes>
    </Router>
  );
};

export default App;
