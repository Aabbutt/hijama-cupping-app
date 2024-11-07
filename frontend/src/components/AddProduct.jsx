import React, { useState } from 'react';
import './AddProduct.css'; // Add styling as needed
import axios from 'axios'; // Import axios for API requests

const AddProduct = ({ onAddProduct, products = [], onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null, // Changed to store the file object
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: e.target.files[0] })); // Store the file object
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product Name is required.';
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'A valid price is required.';
    }
    if (!formData.image) {
      newErrors.image = 'Product image is required.';
    }

    // Check for duplicate product name
    const isDuplicate = products.some(
      (product) => product.name.toLowerCase() === formData.name.toLowerCase()
    );
    if (isDuplicate) {
      newErrors.name = 'A product with this name already exists.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const newProduct = new FormData();
    newProduct.append('name', formData.name);
    newProduct.append('price', formData.price);
    newProduct.append('image', formData.image); // Append the image file

    try {
      // Make the API call to add the product with the form data
      const response = await axios.post('http://localhost:5000/products', newProduct, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important to set the content type for file uploads
        },
      });
      onAddProduct(response.data); // Call onAddProduct with the newly created product
      onClose(); // Close the modal after adding product
    } catch (error) {
      console.error('Failed to add product:', error);
      setErrors({ submit: 'Failed to add product. Please try again later.' });
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit} className="add-product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              placeholder="Enter price"
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="image">Product Image</label>
            <input
              type="file"
              id="image"
              name="image"
              onChange={handleChange}
              required
            />
            {errors.image && <span className="error-message">{errors.image}</span>}
          </div>

          {errors.submit && <div className="error-message">{errors.submit}</div>}
          
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
