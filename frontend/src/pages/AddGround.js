import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import OwnerNavbar from '../components/OwnerNavbar';
import '../Styles/OwnerHome.css';
import '../Styles/AddGround.css';
import { FaUpload } from 'react-icons/fa';
import GroundUpload from '../assets/GroundUpload.png';

const AddGround = () => {
    // State to hold form data, now as a flat object with IDs
    const [formData, setFormData] = useState({
        gName: '',
        gDescription: '',
        address: '',
        cId: null,
        uId: parseInt(localStorage.getItem("loggeduserid"), 10),
        sId: null,
        gStatus: 'Active',
        gImages: null,
    });

    // States for fetching data from controllers
    const [cities, setCities] = useState([]);
    const [sports, setSports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState({ text: '', type: '' });
    const fileInputRef = useRef(null);

    // useEffect hook to fetch cities and sports data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const citiesResponse = await axios.get("http://localhost:8080/api/cities/all");
                setCities(citiesResponse.data);

                const sportsResponse = await axios.get("http://localhost:8080/api/sports/all");
                setSports(sportsResponse.data);

                setLoading(false);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch cities or sports. Please check your backend.");
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handler for form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData(prev => {
            // For the dropdowns, handle the conversion to a number or null
            if (name === 'cId' || name === 'sId') {
                const newId = value === '' ? null : parseInt(value, 10);
                return { ...prev, [name]: newId };
            }
            // For other inputs, use the value directly
            return { ...prev, [name]: value };
        });
    };

    // Handler for image upload
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, gImages: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Trigger the hidden file input
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation to prevent submitting with null IDs
        if (!formData.gName || !formData.address || formData.sId === null || formData.cId === null) {
            setMessage({ text: "Please fill in all required fields and select a valid City and Sport.", type: 'error' });
            return;
        }

        console.log("Data being sent to the backend:", formData);

        try {
            // Sending the flattened formData object directly
            const response = await axios.post("http://localhost:8080/api/grounds/add", formData);
            console.log("Ground added successfully:", response.data);
            setMessage({ text: "Ground added successfully!", type: 'success' });
            
            // Reset the form after successful submission
            setFormData({
                gName: '',
                gDescription: '',
                address: '',
                cId: null,
                uId: parseInt(localStorage.getItem("loggeduserid"), 10),
                sId: null,
                gStatus: 'Active',
                gImages: null,
            });
        } catch (err) {
            console.error("Error adding ground:", err);
            setMessage({ text: "Failed to add ground. Please check the console for details.", type: 'error' });
        }
    };

    if (loading) {
        return <div className="owner-home-container add-ground-container loading-message">Loading form data...</div>;
    }

    if (error) {
        return <div className="owner-home-container add-ground-container error-message">{error}</div>;
    }

    return (
        <>
            <OwnerNavbar />
            <div className="owner-home-container add-ground-container">
                <div className="add-ground-card">
                    <h2 className="add-ground-header">Add a New Ground</h2>
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
                                    src={formData.gImages || GroundUpload}
                                    alt="Ground Preview"
                                    className="ground-image-preview"
                                    onError={(e) => { e.target.onerror = null; e.target.src = GroundUpload; }}
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
                                    value={formData.gName}
                                    onChange={handleChange}
                                    placeholder="e.g., Green Valley Turf"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Ground Description:</label>
                                <textarea
                                    name="gDescription"
                                    value={formData.gDescription}
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
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="e.g., 123 Sports Avenue, City"
                                    required
                                />
                            </div>

                            {/* Sport Dropdown */}
                            <div className="form-group">
                                <label>Sport:</label>
                                <select 
                                    name="sId"
                                    value={String(formData.sId || '')}
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">-- Select a Sport --</option>
                                    {sports.map(sport => (
                                        <option key={sport.sid} value={String(sport.sid)}>{sport.sname}</option>
                                    ))}
                                </select>
                            </div>

                            {/* City Dropdown */}
                            <div className="form-group">
                                <label>City:</label>
                                <select 
                                    name="cId"
                                    value={String(formData.cId || '')}
                                    onChange={handleChange} 
                                    required
                                >
                                    <option value="">-- Select a City --</option>
                                    {cities.map(city => (
                                        <option key={city.cid} value={String(city.cid)}>{city.cname}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-actions">
                            <button type="submit" className="add-ground-btn">Add Ground</button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default AddGround;
