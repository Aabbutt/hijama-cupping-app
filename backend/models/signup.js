const mongoose = require('mongoose');

// Define the user schema for signup
const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // Removes extra spaces from the name
    },
    email: {
        type: String,
        required: true,
        unique: true, // Email should be unique
        trim: true, // Removes extra spaces from the email
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'] // Email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6 // Minimum length for password
    },
    phoneNumber: {
        type: String,
        required: true,
        trim: true, // Removes extra spaces from phone number
        match: [/^\d{10,15}$/, 'Please use a valid phone number'] // Phone number validation (10-15 digits)
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt fields
});

// Create the Signup model
const Signup = mongoose.model('Signup', signupSchema);

// Export the model
module.exports = Signup;
