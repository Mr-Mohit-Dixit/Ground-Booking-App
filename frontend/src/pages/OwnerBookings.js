import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OwnerNavbar from '../components/OwnerNavbar';
import '../Styles/OwnerHome.css'; // Reusing some base styles for consistency

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOwnerBookings = async () => {
      try {
        const ownerId = localStorage.getItem("loggeduserid");
        if (!ownerId) {
          throw new Error("Owner ID not found in local storage.");
        }
        
        const response = await axios.get(`http://localhost:8080/api/bookings/owner/${ownerId}`);
        
        // The API response should return a list of bookings
        // Each booking object will contain nested User and Ground objects
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else {
          setBookings([]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching owner's bookings:", err);
        setError("Failed to fetch bookings. Please check your backend server and the API endpoint.");
        setLoading(false);
      }
    };
    
    fetchOwnerBookings();
  }, []);

  if (loading) {
    return (
      <>
        <OwnerNavbar />
        <div className="owner-home-container">
          <div className="loading-message">Loading bookings...</div>
        </div>
      </>
    );
  }
  
  if (error) {
    return (
      <>
        <OwnerNavbar />
        <div className="owner-home-container">
          <div className="error-message">{error}</div>
        </div>
      </>
    );
  }

  // Helper function to format the booking date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString();
  };

  return (
    <>
      <OwnerNavbar />
      <div className="owner-home-container">
        <h2>Bookings Dashboard</h2>
        
        {bookings.length > 0 ? (
          <div className="overflow-x-auto bg-white rounded-lg shadow-md p-4">
            <table className="min-w-full leading-normal table-auto">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Booking ID</th>
                  <th className="py-3 px-6 text-left">Ground Name</th>
                  <th className="py-3 px-6 text-left">Player Name</th>
                  <th className="py-3 px-6 text-left">Booking Date</th>
                  <th className="py-3 px-6 text-left">Time Slot</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {bookings.map((booking) => (
                  <tr key={booking.bid} className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      {booking.bid}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {booking.ground.gname}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {booking.user.uname}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {formatDate(booking.bdatetime)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {booking.timeFrom.substring(0, 5)} - {booking.timeTo.substring(0, 5)}
                    </td>
                    <td className="py-3 px-6 text-left">
                      ₹ {booking.bamt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-grounds-message">
            You have no bookings for your grounds yet.
          </div>
        )}
      </div>
    </>
  );
};

export default OwnerBookings;
