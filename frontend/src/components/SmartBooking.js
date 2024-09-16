import React, { useState } from 'react';
import axios from 'axios'; // To make API requests to your backend

const SmartBooking = () => {
  const [userPreferences, setUserPreferences] = useState(''); // User preferences or history
  const [suggestedSlots, setSuggestedSlots] = useState([]); // Suggested booking slots
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error state

  // Handle input change
  const handleInputChange = (e) => {
    setUserPreferences(e.target.value);
  };

  // Function to get suggested booking slots
  const getSuggestedSlots = async () => {
    if (!userPreferences.trim()) {
      alert('Please enter your preferences or booking history.');
      return;
    }

    setLoading(true);
    setError('');
    setSuggestedSlots([]);

    try {
      // Make POST request to backend with user preferences
      const response = await axios.post('/api/getSuggestedSlots', { userPreferences });
      setSuggestedSlots(response.data.suggestedSlots);
    } catch (err) {
      console.error('Error fetching suggested slots:', err);
      setError('Sorry, something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Smart Booking System</h2>
      <textarea
        value={userPreferences}
        onChange={handleInputChange}
        placeholder="Enter your preferences or booking history..."
        rows="5"
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          resize: 'vertical',
        }}
      />
      <button
        onClick={getSuggestedSlots}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
        }}
        disabled={loading} // Disable button while loading
      >
        {loading ? 'Loading...' : 'Get Suggested Slots'}
      </button>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          {/* You can add a spinner here */}
          <p>Loading...</p>
        </div>
      )}
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
      {suggestedSlots.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h3>Suggested Booking Slots:</h3>
          <ul>
            {suggestedSlots.map((slot, index) => (
              <li key={index}>{slot}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SmartBooking;
