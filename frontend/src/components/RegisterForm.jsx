import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../Styles/Form.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    uName: "",
    username: "",
    email: "",
    passwords: "",
    aadhar: "",
    uPhoneNo: "",
    uAddress: "",
    rId: "",
    cId: "",
  });

  const [roles, setRoles] = useState([]);
  const [cities, setCities] = useState([]);
  const [message, setMessage] = useState(""); // State for displaying messages
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    axios.get("http://localhost:8080/api/roles/all")
      .then((res) => setRoles(res.data))
      .catch((err) => console.error("Error fetching roles:", err));

    axios.get("http://localhost:8080/api/cities/all")
      .then((res) => setCities(res.data))
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const payload = {
      uName: formData.uName,
      username: formData.username,
      email: formData.email,
      passwords: formData.passwords,
      aadhar: formData.aadhar,
      uPhoneNo: formData.uPhoneNo,
      uAddress: formData.uAddress,
      rId: parseInt(formData.rId),
      cId: parseInt(formData.cId),
    };

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", payload);
      setMessage("Registration successful! Redirecting to login page...");
      console.log(res.data);
      // Redirect to the home page after a short delay to show the message
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response && err.response.data) {
        setMessage(`Registration failed: ${err.response.data}`);
      } else {
        setMessage("Registration failed. Please check your inputs or try again later.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" name="uName" placeholder="Full Name" value={formData.uName} onChange={handleChange} required />
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="passwords" placeholder="Password" value={formData.passwords} onChange={handleChange} required />
        <input type="text" name="aadhar" placeholder="Aadhar Number" value={formData.aadhar} onChange={handleChange} required />
        <input type="text" name="uPhoneNo" placeholder="Phone Number" value={formData.uPhoneNo} onChange={handleChange} required />
        <input type="text" name="uAddress" placeholder="Address" value={formData.uAddress} onChange={handleChange} required />

        <select name="rId" value={formData.rId} onChange={handleChange} required>
          <option value="">-- Select Role --</option>
          {roles.map((role) => (
            <option key={role.rid} value={role.rid}>{role.rname}</option>
          ))}
        </select>

        <select name="cId" value={formData.cId} onChange={handleChange} required>
          <option value="">-- Select City --</option>
          {cities.map((city) => (
            <option key={city.cid} value={city.cid}>{city.cname}</option>
          ))}
        </select>

        <button type="submit">Register</button>
      </form>
      {/* Display message based on registration attempt */}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default RegisterForm;
