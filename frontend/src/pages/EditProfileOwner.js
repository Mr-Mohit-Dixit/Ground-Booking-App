import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../Styles/EditProfile.css";
import { FaEdit } from "react-icons/fa";
import DefaultProfileImage from '../assets/default_profile.png';
import OwnerNavbar from "../components/OwnerNavbar"; // Import the PlayerNavbar component

const EditProfile = () => {
 const [formData, setFormData] = useState({
  uName: "",
  username: "",
  email: "",
  passwords: "",
  aadhar: "",
  uPhoneNo: "",
  uAddress: "",
  rId: { rName: "" },
  cId: { cid: "", cname: "" },
  uImage: ""
 });

 const [editableFields, setEditableFields] = useState({});
 const [cities, setCities] = useState([]);
 let userId = localStorage.getItem("loggeduserid");
 const fileInputRef = useRef(null);
 const inputRefs = useRef({}); // Ref to store references to input elements
 
 useEffect(() => {
  axios.get(`http://localhost:8080/api/users/${userId}`)
   .then((res) => {
    console.log("User Data:", res.data);
    const fetchedData = res.data;
    setFormData(prev => ({
     ...prev,
     ...fetchedData,
     uImage: fetchedData.uImage || DefaultProfileImage,
     cId: fetchedData.city || { cid: "", cname: "" },
     rId: fetchedData.role || { rName: "" }
    }));
   })
   .catch((err) => console.error("Error fetching user data:", err));

  axios.get("http://localhost:8080/api/cities/all")
   .then((res) => setCities(res.data))
   .catch((err) => console.error("Error fetching cities:", err));
 }, [userId]);

 const toggleEdit = (field) => {
  setEditableFields(prev => {
   const newState = { ...prev, [field]: !prev[field] };
   // If the field is becoming editable, focus on it
   if (newState[field]) {
    // Use a timeout to ensure the input is rendered and ready for focus
    setTimeout(() => {
     if (inputRefs.current[field]) {
      inputRefs.current[field].focus();
     }
    }, 0); 
   }
   return newState;
  });
 };

 const handleChange = (e) => {
  const { name, value } = e.target;

  if (name === "cId") {
   const selectedCity = cities.find(city => city.cid.toString() === value);
   setFormData(prev => ({ ...prev, cId: selectedCity }));
  } else {
   setFormData(prev => ({ ...prev, [name]: value }));
  }
 };

 const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
   const reader = new FileReader();
   reader.onloadend = () => {
    setFormData(prev => ({ ...prev, uImage: reader.result }));
   };
   reader.readAsDataURL(file);
  }
 };

 const handleImageClick = () => {
  fileInputRef.current.click();
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
   console.log("User ID : " + userId);
   await axios.put(`http://localhost:8080/api/users/update/${userId}`, formData);
   alert("Profile updated successfully!");
  } catch (err) {
   console.error("Update error:", err);
   alert("Update failed.");
  }
 };

 return (
  <>
   <OwnerNavbar /> {/* Place the navbar here */}
   <div className="form-container">
    <h2>Edit Profile</h2>
    <form onSubmit={handleSubmit}>

     {/* Profile Picture Upload Section */}
     <div className="profile-edit-pic-section">
      <div className="profile-pic-wrapper" onClick={handleImageClick}>
       <img 
        src={formData.uImage} 
        alt="Profile" 
        className="profile-picture-edit" 
        onError={(e) => { e.target.onerror = null; e.target.src = DefaultProfileImage; }}
       />
       <div className="edit-photo-icon-overlay" onClick={handleImageClick}>
       <FaEdit />
      </div>
      </div>
     
      <input 
       type="file" 
       ref={fileInputRef} 
       onChange={handlePhotoChange} 
       style={{ display: 'none' }} 
       accept="image/*" 
      />
     </div>
     <br/><br/>

     {/* Input Fields with Labels and Spacing */}
     {[
      { label: "Full Name", name: "uname" },
      { label: "Username", name: "username" },
      { label: "Email", name: "email" },
      { label: "Password", name: "passwords", type: "password" },
      { label: "Aadhar Number", name: "aadhar" },
      { label: "Phone Number", name: "uphoneNo" },
      { label: "Address", name: "uaddress" }
     ].map(({ label, name, type = "text" }) => (
      <div key={name} className="editable-input">
       <label>{label}</label><br />
       <input
        type={type}
        name={name}
        value={formData[name] || ""}
        onChange={handleChange}
        readOnly={!editableFields[name]}
        placeholder={label}
        ref={el => inputRefs.current[name] = el} // Assign ref to input
       />
       <FaEdit className="edit-icon" onClick={() => toggleEdit(name)} /><br /><br />
      </div>
     ))}

     {/* City Dropdown */}
     <div className="editable-input">
      <label>City</label><br />
      <select
       name="cId"
       value={formData.cId?.cid || ""}
       onChange={handleChange}
       disabled={!editableFields.cId} // Changed from readOnly to disabled
       ref={el => inputRefs.current.cId = el} // Assign ref to select
      >
       <option value="">-- Select City --</option>
       {cities.map((city) => (
        <option key={city.cid} value={city.cid}>
         {city.cname}
        </option>
       ))}
      </select>
      <FaEdit className="edit-icon" onClick={() => toggleEdit("cId")} /><br /><br />
     </div>

     <button type="submit">Save Changes</button>
    </form>
   </div>
  </>
 );
};

export default EditProfile;