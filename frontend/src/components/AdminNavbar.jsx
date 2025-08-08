import React from "react";
import { useNavigate } from "react-router-dom";
import "../components/AdminNavbar.css"; // same as Navbar.css style but for admin

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">Admin Panel</div>
      <div className="navbar-links">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
