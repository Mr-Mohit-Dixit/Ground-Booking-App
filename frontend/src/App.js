import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const [selectedForm, setSelectedForm] = useState(null); // null | 'login' | 'register'

  return (
    <div>
      <Navbar onFormSelect={setSelectedForm} />
      {selectedForm === 'login' && <LoginForm />}
      {selectedForm === 'register' && <RegisterForm />}
      {!selectedForm && (
        <div style={{ textAlign: 'center', marginTop: '50px', color: '#555' }}>
          {/* Optional: message or just blank */}
          <p>Please choose an option above to continue.</p>
        </div>
      )}
    </div>
  );
};

export default App;
