const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const multer = require('multer');
const practitionerRoutes = require('./routes/practitioner');

// Import models (make sure the file names are correct based on your folder structure)
const Product = require('./models/product');
const Appointment = require('./models/appointment');
const Practitioner = require('./models/Practitioner');



// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/HijamaCuppingApp")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Error Connecting to MongoDB: " + err));

// Define routes (ensure these are also correctly linked)
// app.use("/user", require("./routes/userroutes"));
// app.use("/treatment", require("./routes/treatmentroutes"));
// app.use("/session", require("./routes/sessionroutes"));
// app.use("/schedule", require("./routes/scheduleroutes"));
// app.use("/review", require("./routes/reviewroutes"));
// app.use("/invoice", require("./routes/invoiceroutes"));
// app.use("/inventory", require("./routes/inventoryroutes"));
// app.use("/product", require("./routes/productroutes"));
// App.use("/appointments", require("./routes/appointmentroutes"));

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
app.use('/uploads', express.static('uploads')); // Serve uploaded files

mongoose.connect('mongodb://localhost:27017/yourDatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
app.use('/practitioners', practitionerRoutes);

// Test route for verifying app is running
app.use("/HijamaCuping", (req, res) => {
  res.send("Hijama Cupping App");
});

// POST: Add a new appointment
app.post('/appointments', async (req, res) => {
  try {
    const { name, email, phoneNumber, services, preferredDate, preferredTime, message } = req.body;

    const newAppointment = new Appointment({
      name,
      email,
      phoneNumber,
      services,
      preferredDate,
      preferredTime,
      message
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// GET: Get all appointments
app.get('/appointments', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get appointments' });
  }
});

// GET: Get a single appointment by ID
app.get('/appointments/:id', async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.status(200).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get appointment' });
  }
});

// PUT: Update an appointment by ID
app.put('/appointments/:id', async (req, res) => {
  try {
    const { name, email, phoneNumber, services, preferredDate, preferredTime, message } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { name, email, phoneNumber, services, preferredDate, preferredTime, message },
      { new: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// DELETE: Delete an appointment by ID
app.delete('/appointments/:id', async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndDelete(req.params.id);
    if (!deletedAppointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

// POST: Add a new product with image upload
app.post('/products', upload.single('image'), async (req, res) => {
  try {
      const { name, price, quantity } = req.body;
      const image = req.file ? req.file.path : null; // Get the uploaded image path

      const newProduct = new Product({
          name,
          image,
          price,
          quantity
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

// PUT: Update a product by ID with optional image upload
app.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    const image = req.file ? req.file.path : null; // Get the uploaded image path (if available)

    // Find and update the product by ID
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { 
        name, 
        price, 
        quantity,
        image: image || undefined,  // Update image only if it's provided
      },
      { new: true } // Return the updated product
    );

    // If product is not found, send an error response
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Return the updated product
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


// POST: Add a new practitioner with document upload
app.post('/practitioners', upload.single('uploadDocuments'), async (req, res) => {
  try {
    const { fullName, mobileNumber, emailAddress, dateOfBirth, education, agreeTerms } = req.body;
    const uploadDocuments = req.file ? req.file.path : null; // Get the uploaded document path

    const newPractitioner = new Practitioner({
      fullName,
      mobileNumber,
      emailAddress,
      dateOfBirth,
      education,
      agreeTerms: agreeTerms === 'true', // Convert to boolean
      uploadDocuments
    });

    const savedPractitioner = await newPractitioner.save();
    res.status(201).json(savedPractitioner);
  } catch (error) {
    console.error('Error creating practitioner:', error);
    res.status(500).json({ error: 'Failed to create practitioner' });
  }
});

// GET: Get all practitioners
app.get('/practitioners', async (req, res) => {
  try {
    const practitioners = await Practitioner.find();
    res.status(200).json(practitioners);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get practitioners' });
  }
});

// GET: Get a single practitioner by ID
app.get('/practitioners/:id', async (req, res) => {
  try {
    const practitioner = await Practitioner.findById(req.params.id);
    if (!practitioner) {
      return res.status(404).json({ error: 'Practitioner not found' });
    }
    res.status(200).json(practitioner);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get practitioner' });
  }
});

// PUT: Update a practitioner by ID with optional document upload
app.put('/practitioners/:id', upload.single('uploadDocuments'), async (req, res) => {
  try {
    const { fullName, mobileNumber, emailAddress, dateOfBirth, education, agreeTerms } = req.body;
    const uploadDocuments = req.file ? req.file.path : null; // Get the uploaded document path (if available)

    // Find and update the practitioner by ID
    const updatedPractitioner = await Practitioner.findByIdAndUpdate(
      req.params.id,
      {
        fullName,
        mobileNumber,
        emailAddress,
        dateOfBirth,
        education,
        agreeTerms: agreeTerms === 'true', // Convert to boolean
        uploadDocuments: uploadDocuments || undefined // Update document only if it's provided
      },
      { new: true } // Return the updated practitioner
    );

    // If practitioner is not found, send an error response
    if (!updatedPractitioner) {
      return res.status(404).json({ error: 'Practitioner not found' });
    }

    // Return the updated practitioner
    res.status(200).json(updatedPractitioner);
  } catch (error) {
    console.error('Error updating practitioner:', error);
    res.status(500).json({ error: 'Failed to update practitioner' });
  }
});

// DELETE: Delete a practitioner by ID
app.delete('/practitioners/:id', async (req, res) => {
  try {
    const deletedPractitioner = await Practitioner.findByIdAndDelete(req.params.id);
    if (!deletedPractitioner) {
      return res.status(404).json({ error: 'Practitioner not found' });
    }

    res.status(200).json({ message: 'Practitioner deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete practitioner' });
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
