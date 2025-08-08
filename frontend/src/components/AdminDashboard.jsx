import React from "react";

const AdminDashboard = () => {
  // Later: Fetch and display real stats from API
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Total Bookings</h3>
          <p className="text-2xl font-bold">120</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Pending Grounds</h3>
          <p className="text-2xl font-bold">8</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-medium">Revenue</h3>
          <p className="text-2xl font-bold">₹50,000</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
