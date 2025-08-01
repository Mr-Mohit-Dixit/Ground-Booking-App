import React, { useState } from 'react';
import axios from 'axios';
import '../Form.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    passwords: ''
  });

  const [loginMessage, setLoginMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', formData);

      if (response.status === 200) {
        setLoginMessage("Login successful! Welcome " + response.data.uname);
        console.log("User data:", response.data);
        // You can navigate or store user info in localStorage here
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setLoginMessage("Invalid username/email or password.");
      } else {
        setLoginMessage("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="usernameOrEmail"
          placeholder="Username or Email"
          value={formData.usernameOrEmail}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="passwords"
          placeholder="Password"
          value={formData.passwords}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        <p className="message">{loginMessage}</p>
      </form>
    </div>
  );
};

export default LoginForm;
