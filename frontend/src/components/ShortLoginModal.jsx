// src/components/ShortLoginModal.js

import React, { useState } from 'react';
import './ShortLoginModal.css'; // Include your styles for the modal

const ShortLoginModal = ({ onClose, onSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle admin re-confirmation login
  const handleLogin = (e) => {
    e.preventDefault();

    // Simple validation for demonstration (replace with actual backend validation)
    if (username === 'admin' && password === 'admin123') {
      onSuccess(); // Call onSuccess if credentials are valid
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Admin Re-confirmation</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Confirm</button>
        </form>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default ShortLoginModal;
