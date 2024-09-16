const express = require('express');
const axios = require('axios');
const router = express.Router();

// POST route to get a personalized recommendation from GPT
router.post('/getRecommendation', async (req, res) => {
  const { userInput } = req.body;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-4',
      prompt: `User's input: ${userInput}. Based on this, recommend the most suitable Hijama therapy (wet or dry cupping) and frequency.`,
      max_tokens: 150,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`, // Use environment variable
        'Content-Type': 'application/json',
      }
    });

    const recommendation = response.data.choices[0].text.trim();
    res.json({ recommendation });
  } catch (error) {
    console.error('Error with GPT API:', error);
    res.status(500).json({ error: 'Something went wrong with the GPT API.' });
  }
});

module.exports = router;
