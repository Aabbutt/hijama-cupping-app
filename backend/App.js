const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const multer = require('multer');

// Import models (make sure the file names are correct based on your folder structure)
const Patient = require('./models/patientmodel');
const Treatment = require('./models/treatmentmodel');
const Session = require('./models/sessionmodel');
const Appointment = require('./models/appointmentmodel');
const Review = require('./models/reviewmodel');
const Schedule = require('./models/schedulemodel');
const User = require('./models/usermodel');
const Inventory = require('./models/inventorymodel');
const Invoice = require('./models/invoicemodel');
const Product = require('./models/product');

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/HijamaCuppingApp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error Connecting to MongoDB: " + err));

// Define routes (ensure these are also correctly linked)
app.use("/user", require("./routes/userroutes"));
app.use("/treatment", require("./routes/treatmentroutes"));
app.use("/session", require("./routes/sessionroutes"));
app.use("/schedule", require("./routes/scheduleroutes"));
app.use("/review", require("./routes/reviewroutes"));
app.use("/invoice", require("./routes/invoiceroutes"));
app.use("/inventory", require("./routes/inventoryroutes"));
app.use("/appointment", require("./routes/appointmentroutes"));

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Set unique file names
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only image files are allowed (jpg, jpeg, png)'), false);
  }
  cb(null, true);
};

// Initialize multer with storage and file filter
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Test route for verifying app is running
app.use("/HijamaCuping", (req, res) => {
  res.send("Hijama Cupping App");
});

// POST: Add a new product with image upload
app.post('/products', upload.single('image'), async (req, res) => {
  try {
      const { name, price } = req.body;
      const image = req.file ? req.file.path : null; // Get the uploaded image path

      // Create a new product with name, price, and image path
      const newProduct = new Product({
          name,
          image,
          price
      });

      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
  } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).json({ error: 'Failed to create product' });
  }
});


// GET: Get all products
app.get('/products', async (req, res) => {
  try {
      const products = await Product.find();
      res.status(200).json(products);
  } catch (error) {
      res.status(500).json({ error: 'Failed to get products' });
  }
});

// GET: Get a single product by ID
app.get('/products/:id', async (req, res) => {
  try {
      const product = await Product.findById(req.params.id);
      if (!product) {
          return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
  } catch (error) {
      res.status(500).json({ error: 'Failed to get product' });
  }
});

// PUT: Update a product by ID
// PUT: Update a product by ID with optional image upload
app.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
      const { name, price } = req.body;
      const image = req.file ? req.file.path : null; // Get the uploaded image path

      // Find the product by ID
      const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          { 
              name, 
              price, 
              image: image || undefined  // Update image only if it's provided
          },
          { new: true } // Return the updated product
      );

      if (!updatedProduct) {
          return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json(updatedProduct);
  } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Failed to update product' });
  }
});

// DELETE: Delete a product by ID
app.delete('/products/:id', async (req, res) => {
  try {
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
      if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Failed to delete product' });
  }
});


app.post('/sessions', async (req, res) => {
  try {
      const { patientid, treatmentid, appointmentid, sessiondate, postsession } = req.body;
      console.log(req.body);

      // Check if the patient and treatment exist
      const patientExists = await Patient.findById(patientid);
      const treatmentExists = await Treatment.findById(treatmentid);

      console.log("Patient Exists: ", patientExists);
      console.log("Treatment Exists: ", treatmentExists);

      if (!patientExists || !treatmentExists) {
          return res.status(400).json({ error: 'Invalid patient or treatment ID' });
      }

      // Proceed to create the session
      const newSession = new Session({
          patientid,
          treatmentid,
          appointmentid,
          sessiondate,
          postsession
      });

      const savedSession = await newSession.save();
      res.status(201).json(savedSession);
  } catch (error) {
      console.error('Error creating session:', error);
      res.status(500).json({ error: 'Failed to create session' });
  }
});

app.use('/uploads', express.static('uploads'));


// Base route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Get the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
