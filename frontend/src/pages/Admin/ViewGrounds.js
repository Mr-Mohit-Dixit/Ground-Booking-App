import React, { useEffect, useState } from "react";

const ViewGrounds = () => {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        const response = await fetch("http://localhost:5091/api/admin/grounds");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setGrounds(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrounds();
  }, []);

  if (loading) return <p className="p-4">Loading grounds...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Grounds List</h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Address</th>
              {/* <th className="border px-4 py-2">City</th> */}
              <th className="border px-4 py-2">Status</th>
              {/* <th className="border px-4 py-2">Ground Owner</th> */}
              {/* <th className="border px-4 py-2">Image</th> */}
            </tr>
          </thead>
          <tbody>
            {grounds.length > 0 ? (
              grounds.map((ground) => (
                <tr key={ground.gId}>
                  <td className="border px-4 py-2">{ground.gName}</td>
                  <td className="border px-4 py-2">{ground.gDescription}</td>
                  <td className="border px-4 py-2">{ground.address}</td>
                  {/* <td className="border px-4 py-2">{ground.cId}</td> */}
                  <td className="border px-4 py-2">{ground.status}</td>
                  {/* <td className="border px-4 py-2">{ground.groundOwnerName}</td> */}
                  {/* <td className="border px-4 py-2"> */}
                  {/* {ground.gImages ? (
                      <img
                        src={`http://localhost:5091/images/${ground.gImages}`}
                        alt={ground.gName}
                        className="w-24 h-16 object-cover"
                      />
                    ) : (
                      "No image"
                    )} */}
                  {/* </td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4">
                  No grounds found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewGrounds;
