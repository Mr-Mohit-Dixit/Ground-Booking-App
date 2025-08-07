import React, { useState, useEffect } from "react";
import axios from "axios";
import OwnerNavbar from "../components/OwnerNavbar";
import "../Styles/AddGround.css";

const AddGround = () => {
  // State to hold form data, initialized with default values.
  const [formData, setFormData] = useState({
    gName: "",
    gDescription: "",
    address: "",
    cId: "", // City ID
    sId: "", // Sport ID
    gStatus: true, // Defaulting status to 'active'
    gImages: null, // Base64 string of the image
  });


  const [sports, setSports] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect hook to fetch initial data for cities and sports
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [citiesRes, sportsRes] = await Promise.all([
          axios.get("http://localhost:8080/api/cities/all"),
          axios.get("http://localhost:8080/api/sports/all"),
        ]);
        setCities(citiesRes.data);
        setSports(sportsRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching initial data:", err);
        setError("Failed to load cities or sports data.");
        setLoading(false);
      }
    };
    
    fetchInitialData();
  }, []);

  // Handler for all text and select inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handler for the image file input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Correctly extracts only the base64 string without the prefix
        setFormData(prev => ({ ...prev, gImages: reader.result.split(',')[1] }));
      };
      reader.readAsDataURL(file); // Reads the file and converts it to a Base64 string
    }
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const ownerId = localStorage.getItem("loggeduserid");
    if (!ownerId) {
      alert("You must be logged in as an owner to add a ground.");
      return;
    }
    
    // CONFIGURE THE PAYLOAD TO MATCH A BACKEND ENTITY WITH RELATIONSHIPS
    // Based on the City entity, the backend likely expects nested objects for relationships.
    // The payload is structured with 'user', 'city', and 'sports' objects.
    const groundData = {
      gName: formData.gName,
      gDescription: formData.gDescription,
      address: formData.address,
      gStatus: formData.gStatus,
      gImages: formData.gImages,
      // Pass uId as an object as per your entity structure
      user: { uId: parseInt(ownerId) },
      // Pass cId as an object as per your entity structure
      city: { cId: parseInt(formData.cId) },
      // Pass sId as a list of objects
      sports: [{ sId: parseInt(formData.sId) }]
    };

    console.log(groundData);

    try {
      const response = await axios.post("http://localhost:8080/api/grounds/add", groundData);
      console.log("Ground added successfully:", response.data);
      alert("Ground added successfully!");
      // Reset form fields after successful submission
      setFormData({
        gName: "",
        gDescription: "",
        address: "",
        cId: "",
        sId: "",
        gStatus: true,
        gImages: null,
      });
    } catch (err) {
      console.error("Error adding ground:", err);
      alert("Failed to add ground. Please try again.");
    }
  };
  
  if (loading) {
    return (
      <>
        <OwnerNavbar />
        <div className="add-ground-container">
          <div className="loading-message">Loading form data...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <OwnerNavbar />
        <div className="add-ground-container">
          <div className="error-message">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <OwnerNavbar />
      <div className="add-ground-container">
        <h2>Add New Ground</h2>
        <form onSubmit={handleSubmit} className="add-ground-form">
          <div className="form-group">
            <label htmlFor="gName">Ground Name</label>
            <input
              type="text"
              id="gName"
              name="gName"
              value={formData.gName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gDescription">Description</label>
            <textarea
              id="gDescription"
              name="gDescription"
              value={formData.gDescription}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cId">City</label>
            <select
              id="cId"
              name="cId"
              value={formData.cId}
              onChange={handleChange}
              required
            >
              <option value="">Select a City</option>
              {cities.map((city) => (
                <option key={city.cid} value={city.cid}>
                  {city.cname}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="sId">Sport</label>
            <select
              id="sId"
              name="sId"
              value={formData.sId}
              onChange={handleChange}
              required
            >
              <option value="">Select a Sport</option> 
              {sports.map((sport) => (
                <option key={sport.sid} value={sport.sid}>
                  {sport.sname}
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="gImages">Ground Image</label>
            <input
              type="file"
              id="gImages"
              name="gImages"
              onChange={handleImageChange}
              accept="image/*"
            />
          </div>
          
          <button type="submit" className="submit-btn">Send For Approval</button>
        </form>
      </div>
    </>
  );
};

export default AddGround;
