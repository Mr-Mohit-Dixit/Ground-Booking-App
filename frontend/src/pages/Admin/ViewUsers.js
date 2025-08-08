import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/adminAPI";

const ViewUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  console.log("users", users);
  useEffect(() => {
    getAllUsers()
      .then((data) => setUsers(data))
      .catch(() => setError("Failed to load users."));
  }, []);

  return (
    <div className="p-4">
      <h2>All Users</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", marginTop: "10px" }}
      >
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.uId}</td>
                <td>{u.uName}</td>
                <td>{u.email}</td>
                <td>
                  {u.rId === 1
                    ? "Admin"
                    : u.rId === 2
                    ? "Ground Owner"
                    : u.rId === 3
                    ? "Player"
                    : "Unknown"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ViewUsers;
