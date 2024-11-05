const express = require("express");
const cors = require("cors");
const db = require("./config/db");
const app = express();

const userroutes = require("./routes/userroutes");
const treatmentroutes = require("./routes/treatmentroutes");
const inventoryroutes = require("./routes/inventoryroutes");
const invoiceroutes = require("./routes/invoiceroutes");
const reviewroutes = require("./routes/reviewroutes");
const scheduleroutes = require("./routes/scheduleroutes");
const sessionroutes = require("./routes/sessionroutes");
const appointmentroutes = require("./routes/appointmentroutes");

app.use(cors()); // Allow cross-origin requests from frontend
//middleware
app.use(express.json()); /// To parse JSON bodies in requests

//const recommendationRoute = require('./routes/recommendation'); // AI Personalization Route
//const smartBookingRoute = require('./routes/smartBooking'); // Smart Booking Route
//require('dotenv').config(); // Load environment variables



//app.use('/api', recommendationRoute);
//app.use('/api', smartBookingRoute); // Add Smart Booking Route

// Start the server on port 5000


app.use("/user", userroutes);
app.use("/treatment", treatmentroutes);
app.use("/session", sessionroutes);
app.use("/schedule", scheduleroutes);
app.use("/review", reviewroutes);
app.use("/invoice", invoiceroutes);
app.use("/inventory", inventoryroutes);
app.use("/appointment", appointmentroutes);

const PORT = process.env.PORT || 5000;

db();

// middleware
app.use("/HijammaCuping", (req, res) => {
  res.send("Hijama Cuping App");
});

//base route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

//start the server after database is connected
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
