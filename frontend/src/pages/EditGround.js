import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import OwnerNavbar from '../components/OwnerNavbar';
import '../Styles/OwnerHome.css';
import '../Styles/AddGround.css'; // You can reuse the styles from AddGround
import { FaUpload } from 'react-icons/fa';
import DefaultGroundImage from '../assets/default_ground.png';

const EditGround = () => {
    const { groundId } = useParams(); // Get the groundId from the URL
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // State to hold the ground data, initially null until fetched
    const [ground, setGround] = useState(null);
    const [cities, setCities] = useState([]);
    const [sports, setSports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch the specific ground details using the groundId from the URL
                const groundResponse = await axios.get(`http://localhost:8080/api/grounds/getById/${groundId}`);
                const fetchedGround = groundResponse.data;
                setGround(fetchedGround);
                
                // Set the initial image preview. This assumes your backend serves images from http://localhost:8080/images
                setImagePreview(fetchedGround.gImages ? `http://localhost:8080/images/${fetchedGround.gImages}` : DefaultGroundImage);

                // Fetch cities and sports lists for the dropdowns
                const citiesResponse = await axios.get("http://localhost:8080/api/cities/all");
                setCities(citiesResponse.data);

                const sportsResponse = await axios.get("http://localhost:8080/api/sports/all");
                setSports(sportsResponse.data);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch ground details or form data.");
                setLoading(false);
            }
        };

        fetchData();
    }, [groundId]); // Depend on groundId to refetch if it changes

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // Handle changes for nested objects like city and sport
        if (name === 'cid') {
            setGround(prev => ({ ...prev, city: { cid: parseInt(value, 10) } }));
        } else if (name === 'sid') {
            setGround(prev => ({ ...prev, sport: { sid: parseInt(value, 10) } }));
        } else {
            // Handle changes for top-level fields
            setGround(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Update the image preview
                setImagePreview(reader.result);
                // Store the Base64 string in state for upload
                setGround(prev => ({ ...prev, gImages: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!ground.gName || !ground.address || !ground.city || !ground.sport) {
            setMessage({ text: "Please fill in all required fields.", type: 'error' });
            return;
        }

        try {
            // Send a PUT request to update the ground
            const response = await axios.put(`http://localhost:8080/api/grounds/update/${groundId}`, ground);
            
            console.log("Ground updated successfully:", response.data);
            alert("Ground updated successfully!");
            navigate("/ownerHome"); // Navigate back to the dashboard
            
        } catch (err) {
            console.error("Error updating ground:", err);
            setMessage({ text: "Failed to update ground. Please check the console.", type: 'error' });
        }
    };

    if (loading) {
        return <div className="owner-home-container loading-message">Loading ground data for editing...</div>;
    }

    if (error || !ground) {
        return <div className="owner-home-container error-message">{error || "Ground not found."}</div>;
    }

    return (
        <>
            <OwnerNavbar />
            <div className="owner-home-container add-ground-container">
                <div className="add-ground-card">
                    <h2 className="add-ground-header">Edit Ground: {ground.gName}</h2>
                    {message.text && (
                        <div className={`message-box ${message.type}`}>
                            {message.text}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="add-ground-form">
                        
                        {/* Ground Image Upload Section */}
                        <div className="image-upload-section" onClick={handleImageClick}>
                            <div className="image-preview-wrapper">
                                <img
                                    src={imagePreview}
                                    alt="Ground Preview"
                                    className="ground-image-preview"
                                    onError={(e) => { e.target.onerror = null; e.target.src = DefaultGroundImage; }}
                                />
                                <div className="upload-icon-overlay">
                                    <FaUpload />
                                </div>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                style={{ display: 'none' }}
                                accept="image/*"
                            />
                        </div>

                        {/* Form Fields */}
                        <div className="form-fields">
                            <div className="form-group">
                                <label>Ground Name:</label>
                                <input
                                    type="text"
                                    name="gName"
                                    value={ground.gName || ''}
                                    onChange={handleChange}
                                    placeholder="e.g., Green Valley Turf"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Ground Description:</label>
                                <textarea
                                    name="gDescription"
                                    value={ground.gDescription || ''}
                                    onChange={handleChange}
                                    placeholder="Enter a brief description of the ground and its facilities."
                                    rows="4"
                                />
                            </div>

                            <div className="form-group">
                                <label>Ground Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={ground.address || ''}
                                    onChange={handleChange}
                                    placeholder="e.g., 123 Sports Avenue, City"
                                    required
                                />
                            </div>

                            {/* Sport Dropdown */}
                            <div className="form-group">
                                <label>Sport:</label>
                                <select 
                                    name="sid"
                                    value={ground.sport?.sid || ''}
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">-- Select a Sport --</option>
                                    {sports.map(sport => (
                                        <option key={sport.sid} value={sport.sid}>{sport.sname}</option>
                                    ))}
                                </select>
                            </div>

                            {/* City Dropdown */}
                            <div className="form-group">
                                <label>City:</label>
                                <select 
                                    name="cid"
                                    value={ground.city?.cid || ''}
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">-- Select a City --</option>
                                    {cities.map(city => (
                                        <option key={city.cid} value={city.cid}>{city.cname}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-actions">
                            <button type="submit" className="add-ground-btn">Update Ground</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditGround;