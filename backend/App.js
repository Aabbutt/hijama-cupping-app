const express = require('express');
const cors = require('cors');
const recommendationRoute = require('./routes/recommendation'); // Ensure this path is correct
require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json()); // To parse JSON bodies in requests

// Use the recommendation route
app.use('/api', recommendationRoute);

// Start the server on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
