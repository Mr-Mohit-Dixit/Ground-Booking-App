import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import "../components/AdminNavbar.css"; // same as Navbar.css style but for admin

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "View Users", path: "/admin/users" },
    { name: "View Grounds", path: "/admin/grounds" },
    { name: "View Bookings", path: "/admin/bookings" },
    { name: "Reports", path: "/admin/reports" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">Admin Panel</div>
      <div className="navbar-links" style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
            style={{ color: "white", textDecoration: "none", padding: "8px 12px", borderRadius: "6px" }}
          >
            {link.name}
          </NavLink>
        ))}

        <button
          onClick={handleLogout}
          className="logout-button"
          style={{
            background: "white",
            color: "#007bff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminNavbar;
