import React from "react";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const links = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "View Users", path: "/admin/users" },
    { name: "View Grounds", path: "/admin/grounds" },
    {name:"View Bookings" ,path:"/admin/bookings"},
    { name: "Reports", path: "/admin/reports" },
  ];

  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen p-4">
      <ul>
        {links.map((link, index) => (
          <li key={index} className="mb-2">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${
                  isActive ? "bg-blue-900 font-bold" : "hover:bg-blue-600"
                }`
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default AdminSidebar;
