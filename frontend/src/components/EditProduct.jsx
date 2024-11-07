import React, { useState, useEffect } from 'react';
import './EditProduct.css'; // Add styles as needed

const EditProduct = ({ product, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: null, // Add image as a file input
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        image: null, // No image file by default when loading the form
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'image') {
      setFormData((prev) => ({
        ...prev,
        image: files[0], // Save the file in the form state
      }));
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const updatedProductData = new FormData();
    updatedProductData.append('name', formData.name);
    updatedProductData.append('price', formData.price);

    if (formData.image) {
      updatedProductData.append('image', formData.image); // Attach the image file
    }

    onUpdate({ ...product, formData: updatedProductData });
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit} className="edit-product-form">
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
              accept="image/*"
              onChange={handleChange}
            />
            {errors.image && <span className="error-message">{errors.image}</span>}
          </div>
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
