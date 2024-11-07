const mongoose = require('mongoose');

// Define the product schema
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true // removes extra spaces from the name
    },
    image: {
        type: String,
        required: true // assuming image will be a URL or image path
    },
    price: {
        type: Number,
        required: true,
        min: 0 // price should be a non-negative number
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, {
    timestamps: true // automatically adds createdAt and updatedAt fields
});

// Create the Product model
const Product = mongoose.model('Product', productSchema);

// Export the model
module.exports = Product;
