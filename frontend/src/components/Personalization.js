import React, { useState } from 'react';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner'; // Importing a spinner

const Personalization = () => {
  const [userInput, setUserInput] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const getRecommendation = async () => {
    if (!userInput.trim()) {
      alert('Please enter your preferences or health information.');
      return;
    }

    setLoading(true);
    setError('');
    setRecommendation('');

    try {
      const response = await axios.post('/api/getRecommendation', { userInput });
      setRecommendation(response.data.recommendation);
    } catch (err) {
      console.error('Error fetching recommendation:', err);
      setError('Sorry, something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Personalized Therapy Recommendations</h2>
      <textarea
        value={userInput}
        onChange={handleInputChange}
        placeholder="Enter your preferences or health information..."
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
        onClick={getRecommendation}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width: '100%',
        }}
        disabled={loading}
      >
        {loading ? 'Loading...' : 'Get Recommendation'}
      </button>
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <TailSpin color="#4CAF50" height={50} width={50} />
        </div>
      )}
      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
      {recommendation && (
        <div style={{ marginTop: '20px' }}>
          <h3>Your Recommended Therapy:</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default Personalization;
