// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ViewBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await axios.get(
//           "https://localhost:5091/api/admin/bookings"
//         );
//         setBookings(res.data);
//       } catch (err) {
//         setError("Failed to fetch bookings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   if (loading) return <p>Loading bookings...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">All Bookings</h2>
//       <table className="min-w-full border border-gray-300">
//         <thead className="bg-gray-100">
//           <tr>
//             <th className="border p-2">Booking ID</th>
//             <th className="border p-2">Ground</th>
//             <th className="border p-2">Player</th>
//             <th className="border p-2">Booking Date</th>
//             <th className="border p-2">Slot</th>
//             <th className="border p-2">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {bookings.length > 0 ? (
//             bookings.map((b) => (
//               <tr key={b.bookingId}>
//                 <td className="border p-2">{b.bId}</td>
//                 <td className="border p-2">{b.gId}</td>
//                 {/* <td className="border p-2">{b.playerName}</td> */}
//                 <td className="border p-2">
//                   {new Date(b.bDateTime).toLocaleDateString()}
//                 </td>
//                 <td className="border p-2">
//                   {b.timeFrom}-{b.timeTo}
//                 </td>
//                 <td className="border p-2">{b.bAmt}</td>
//                 <td className="border p-2">
//                   {b.status ? (
//                     <span className="text-green-600 font-semibold">
//                       Confirmed
//                     </span>
//                   ) : (
//                     <span className="text-red-600 font-semibold">Pending</span>
//                   )}
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td className="border p-2 text-center" colSpan="6">
//                 No bookings found
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ViewBookings;

import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

            {/* <th className="border p-2">Status</th> */}
          </tr>
        </thead>
        <tbody>
          {bookings.length > 0 ? (
            bookings.map((b) => (
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
                {/* <td className="border p-2">
                  {b.status?.toString().toLowerCase() === "true" ||
                  b.status === "Confirmed" ? (
                    <span className="text-green-600 font-semibold">
                      Confirmed
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">Pending</span>
                  )}
                </td> */}
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
    </div>
  );
};

export default ViewBookings;
