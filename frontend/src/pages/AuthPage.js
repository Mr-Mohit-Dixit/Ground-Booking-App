import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  // Use a boolean state to toggle between login and register views
  const [isLoginView, setIsLoginView] = useState(true);

  // Function to toggle the view
  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <>
      {/* Conditionally render either the Login or Register form */}
      {isLoginView ? <LoginForm /> : <RegisterForm />}

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {isLoginView ? (
          <p>
            Don't have an account?{" "}
            <button
              onClick={toggleView}
              style={{
                background: "none",
                border: "none",
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
                padding: "0",
              }}
            >
              Register here
            </button>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <button
              onClick={toggleView}
              style={{
                background: "none",
                border: "none",
                color: "blue",
                textDecoration: "underline",
                cursor: "pointer",
                padding: "0",
              }}
            >
              Login here
            </button>
          </p>
        )}
      </div>
    </>
  );
};

export default AuthPage;
