import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Styles/playerHome.css';
import DefaultGroundImage from '../assets/default_ground.png';
import PlayerNavbar from '../components/PlayerNavbar';

const PlayerHome = ({ isLoggedIn, handleLogout }) => {
    const [grounds, setGrounds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sports, setSports] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedSport, setSelectedSport] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCityId, setSelectedCityId] = useState(''); 

    useEffect(() => {
        const fetchInitialCities = async () => {
            try {
                const citiesResponse = await axios.get('http://localhost:8080/api/cities/all');
                if (Array.isArray(citiesResponse.data) && citiesResponse.data.length > 0) {
                    setCities(citiesResponse.data);
                } else {
                    setCities([]);
                }
            } catch (err) {
                console.error("Error fetching cities:", err);
                setError("Failed to load cities. Please check your backend server and the /api/cities/all endpoint.");
            }
        };

        const fetchGroundsBasedOnFilter = async () => {
            setLoading(true);
            setError(null);
            try {
                let groundsResponse;
                if (selectedCityId === '') {
                    groundsResponse = await axios.get('http://localhost:8080/api/grounds/getAll');
                } else {
                    const cityIdAsInt = parseInt(selectedCityId, 10);
                    if (isNaN(cityIdAsInt)) {
                        setError("Invalid city selection. Please choose a valid city.");
                        setLoading(false);
                        return;
                    }
                    groundsResponse = await axios.get(`http://localhost:8080/api/cities/${cityIdAsInt}/grounds`);
                }
                
                const groundsData = groundsResponse.data;
                if (Array.isArray(groundsData) && groundsData.length > 0) {
                    setGrounds(groundsData);
                    const uniqueSports = [...new Set(groundsData.map(ground => ground.sport?.sname).filter(Boolean))]; 
                    setSports(uniqueSports);
                } else {
                    setGrounds([]);
                    setSports([]);
                }
            } catch (err) {
                console.error("Error fetching grounds by filter:", err);
                const errorMessage = err.response && err.response.status === 400 
                                     ? "Bad request. Ensure city ID is valid and backend API is correct." 
                                     : "Failed to load grounds. Please ensure the backend is running and API endpoints are correct.";
                setError(errorMessage);
            } finally {
                setLoading(false);
            }
        };

        fetchInitialCities();
        fetchGroundsBasedOnFilter();

    }, [selectedCityId]);

    const clientFilteredGrounds = grounds.filter(ground => {
        const matchesSport = selectedSport === '' || (ground.sport && ground.sport.sname === selectedSport);
        const matchesSearch = searchQuery === '' || ground.gName.toLowerCase().includes(searchQuery.toLowerCase());
        
        return matchesSport && matchesSearch;
    });

    if (loading || error) {
        return (
            <>
                <PlayerNavbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
                <div className="player-home-container">
                    {loading && <div className="loading-message">Loading grounds...</div>}
                    {error && <div className="error-message">{error}</div>}
                </div>
            </>
        );
    }

    return (
        <>
            <PlayerNavbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <div className="player-home-container">
                <h2>Available Grounds</h2>

                {/* Styled Filter and Search Section */}
                <div className="filter-panel">
                    <div className="filter-group">
                        <label htmlFor="search-input" className="filter-label">Search Ground</label>
                        <input
                            id="search-input"
                            type="text"
                            placeholder="e.g., Kicks & Licks Ground"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="filter-input"
                        />
                    </div>
                    
                    <div className="filter-group">
                        <label htmlFor="sport-select" className="filter-label">Sport Type</label>
                        <select
                            id="sport-select"
                            value={selectedSport}
                            onChange={(e) => setSelectedSport(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">All Sports</option>
                            {/* Key prop is correctly set using the sport name, which is unique */}
                            {sports.map((sport) => ( 
                                <option key={sport} value={sport}>{sport}</option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="city-select" className="filter-label">City</label>
                        <select
                            id="city-select"
                            value={selectedCityId}
                            onChange={(e) => setSelectedCityId(e.target.value)}
                            className="filter-select"
                        >
                            {/* Key prop for the static 'All Cities' option is unique */}
                            <option key="all-cities-option" value="">All Cities</option> 
                            {cities.map((city) => (
                                <option key={city.cid} value={city.cid}>{city.cname}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Grounds List */}
                <div className="grounds-list">
                    {clientFilteredGrounds.length > 0 ? (
                        clientFilteredGrounds.map((ground) => (
                            <div key={ground.gId} className="ground-card">
                                <img 
                                    src={ground.gImages ? `/images/${ground.gImages}`: DefaultGroundImage} 
                                    alt={ground.gName} 
                                    className="ground-image" 
                                    onError={(e) => { 
                                        e.target.onerror = null; 
                                        e.target.src = DefaultGroundImage;
                                    }}
                                />
                                <div className="ground-details">
                                    <h3>{ground.gName + " - " + (ground.sport ? ground.sport.sname : 'N/A')}</h3>
                                    <p>{ground.gDescription}</p>
                                    <div className="ground-footer">
                                        <Link to={`/book-ground/${ground.gId}`}>
                                            <button className="booking-button">Book Now</button>
                                        </Link>
                                        <span className="ground-rate">
                                            ₹ {ground.sport?.srate || 'N/A'} per hour
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-grounds-message">
                            No grounds found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PlayerHome;
