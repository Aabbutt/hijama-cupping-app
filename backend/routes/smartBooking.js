const express = require('express');
const axios = require('axios');
const router = express.Router();

// Load environment variables
require('dotenv').config();

// POST route to get suggested booking slots
router.post('/getSuggestedSlots', async (req, res) => {
  const { userPreferences } = req.body;

  try {
    // Send userPreferences to Python ML service
    const pythonResponse = await axios.post('http://localhost:5001/predictSlots', { userPreferences });

    const suggestedSlots = pythonResponse.data.suggestedSlots;

    res.json({ suggestedSlots });
  } catch (error) {
    console.error('Error with Smart Booking API:', error);
    res.status(500).json({ error: 'Something went wrong with the Smart Booking API.' });
  }
});

module.exports = router;
