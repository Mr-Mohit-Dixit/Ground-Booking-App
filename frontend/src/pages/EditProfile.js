import React, { useState, useEffect } from "react";
import axios from "axios";
import "../Styles/Form.css";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";

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
    photo: ""
  });

  const [editableFields, setEditableFields] = useState({});
  const [cities, setCities] = useState([]);
  let userId = localStorage.getItem("loggeduserid");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${userId}`)
      .then((res) => {
        console.log("User Data:", res.data);
        setFormData(res.data);
      })
      .catch((err) => console.error("Error fetching user data:", err));

    axios.get("http://localhost:8080/api/cities/all")
      .then((res) => setCities(res.data))
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  const toggleEdit = (field) => {
    setEditableFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
        setFormData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Usr ID : "+userId);
      await axios.put(`http://localhost:8080/api/users/update/${userId}`, formData);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Update error:", err);
      alert("Update failed.");
    }
  };

  return (
    <div className="form-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>

        {/* Profile Picture Upload */}
        <div className="profile-pic-section">
          {formData.photo && <img src={formData.photo} alt="Profile" width="100" />}
          <label>Upload Profile Picture</label><br />
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </div>

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
            />
            <FaEdit className="edit-icon" onClick={() => toggleEdit(name)} /><br /><br />
          </div>
        ))}


        {/* City Dropdown */}
        {/* <div className="editable-input">
          <label>City</label><br />
          <select
            name="cId"
            value={formData.cId?.cid || ""}
            onChange={handleChange}
          >
            <option value="">-- Select City --</option>
            {cities.map((city) => (
              <option key={city.cid} value={city.cid}>
                {city.cname}
              </option>
            ))}
          </select>
          <FaEdit className="edit-icon" onClick={() => toggleEdit("cId")} /><br /><br />
        </div> */}

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
