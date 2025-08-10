import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5091/api/admin/bookings");
        console.log("Bookings API Response:", res.data);
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p className="p-4">Loading bookings...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  // Calculate pagination indexes
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = bookings.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(bookings.length / recordsPerPage);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">All Bookings</h2>

      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Booking ID</th>
            <th className="border p-2">Ground Name</th>
            <th className="border p-2">Player Name</th>
            <th className="border p-2">Sport</th>
            <th className="border p-2">Booking Date</th>
            <th className="border p-2">Slot</th>
            <th className="border p-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.length > 0 ? (
            currentRecords.map((b) => (
              <tr key={b.bId}>
                <td className="border p-2">{b.bId}</td>
                <td className="border p-2">{b.groundName || b.gId}</td>
                <td className="border p-2">{b.userName}</td>
                <td className="border p-2">{b.sport}</td>
                <td className="border p-2">
                  {b.date ? new Date(b.date).toLocaleDateString() : "N/A"}
                </td>
                <td className="border p-2">
                  {b.timeFrom && b.timeTo
                    ? `${b.timeFrom} - ${b.timeTo}`
                    : "N/A"}
                </td>
                <td className="border p-2">{b.amount ?? "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border p-2 text-center" colSpan="7">
                No bookings found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-4 space-x-2">
        <button
          className="px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            className={`px-3 py-1 border rounded ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="px-3 py-1 border rounded bg-gray-200 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ViewBookings;
