import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ClipLoader } from 'react-spinners'; // Assuming react-spinners is available

// This is the main App component that handles page routing
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  // A simple function to render the current page component based on state
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'bookings':
        return <BookingsPage />;
      case 'about':
        return <AboutPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-inter">
      <Navbar setCurrentPage={setCurrentPage} />
      <main className="container mx-auto p-4 sm:p-6 md:p-8">
        {renderPage()}
      </main>
    </div>
  );
};

// The Navbar component for navigation
const Navbar = ({ setCurrentPage }) => {
  return (
    <nav className="bg-white shadow-md rounded-b-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4 sm:mb-0">GroundGo</h1>
        <div className="flex space-x-2 sm:space-x-6 text-lg font-medium">
          <button 
            onClick={() => setCurrentPage('home')} 
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            Home
          </button>
          <button 
            onClick={() => setCurrentPage('bookings')} 
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            Bookings
          </button>
          <button 
            onClick={() => setCurrentPage('about')} 
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            About
          </button>
          <button 
            onClick={() => setCurrentPage('profile')} 
            className="text-gray-600 hover:text-indigo-600 transition-colors duration-200"
          >
            Profile
          </button>
        </div>
      </div>
    </nav>
  );
};

// The Home Page component that fetches and displays the grounds
const HomePage = () => {
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrounds = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080/api/grounds');
        setGrounds(response.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching grounds:", err);
        setError("Failed to load grounds. Please check the backend connection.");
      } finally {
        setLoading(false);
      }
    };
    fetchGrounds();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <ClipLoader color="#4338ca" size={50} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  if (grounds.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 font-semibold">
        No grounds found. Please add some grounds to your database.
      </div>
    );
  }

  return (
    <div className="py-8">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800">Available Grounds</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {grounds.map(ground => (
          <GroundCard key={ground.gId} ground={ground} />
        ))}
      </div>
    </div>
  );
};

// A component for a single ground card
const GroundCard = ({ ground }) => {
  const handleBookNow = () => {
    console.log(`Booking for ground: ${ground.gName}`);
    alert(`You've selected to book the ${ground.gName}. A booking form would appear here.`);
  };
  
  // Use a placeholder if gImages is null or empty
  const imageUrl = ground.gImages && ground.gImages.trim() !== "" 
    ? ground.gImages 
    : `https://placehold.co/400x300/e0e7ff/4338ca?text=${ground.gName}`;

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
      <img
        src={imageUrl}
        alt={ground.gName}
        className="w-full h-48 object-cover"
        onError={(e) => {
          // Fallback to a different placeholder on image load error
          e.target.onerror = null;
          e.target.src = `https://placehold.co/400x300/e0e7ff/4338ca?text=Image+Not+Found`;
        }}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{ground.gName}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{ground.gDescription}</p>
        <button 
          onClick={handleBookNow}
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

// Placeholder components for other pages
const BookingsPage = () => (
  <div className="text-center py-20">
    <h2 className="text-4xl font-bold text-gray-800">Your Bookings</h2>
    <p className="mt-4 text-gray-600">This is where your booking history will be displayed.</p>
  </div>
);

const AboutPage = () => (
  <div className="text-center py-20">
    <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
    <p className="mt-4 text-gray-600">Find out more about our ground booking service.</p>
  </div>
);

const ProfilePage = () => (
  <div className="text-center py-20">
    <h2 className="text-4xl font-bold text-gray-800">User Profile</h2>
    <p className="mt-4 text-gray-600">Manage your account settings and personal information here.</p>
  </div>
);

// This is the default export of the entire application.
export default App;
