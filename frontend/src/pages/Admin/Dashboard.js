import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch requests from API
  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "http://localhost:5091/api/admin/requests"
      );
      setRequests(response.data);
    } catch (err) {
      setError("Failed to load requests.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Handle Approve/Reject action
  const handleAction = async (rqId, action) => {
    try {
      await axios.put(
        `http://localhost:5091/api/admin/requests/${rqId}/${action}`
      );
      // Refresh requests list after action
      fetchRequests();
    } catch (err) {
      alert("Action failed. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pending Ground Requests</h1>

      {loading && <p>Loading requests...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && requests.length === 0 && (
        <p>No pending requests.</p>
      )}

      {!loading && requests.length > 0 && (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Ground Name</th>
              <th className="border px-4 py-2">Sport</th>
              <th className="border px-4 py-2">Requested By</th>
              <th className="border px-4 py-2">Request Date & Time</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.rqId}>
                <td className="border px-4 py-2">{req.groundName}</td>
                <td className="border px-4 py-2">{req.sportName}</td>
                <td className="border px-4 py-2">{req.userName}</td>
                <td className="border px-4 py-2">
                  {new Date(req.requestDateTime).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{req.status}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                    onClick={() => handleAction(req.rqId, "approve")}
                  >
                    Approve
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    onClick={() => handleAction(req.rqId, "reject")}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
