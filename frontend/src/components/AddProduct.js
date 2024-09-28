// src/components/AddProduct.js

import React, { useState } from 'react';
import './AddProduct.css'; // Add styling as needed

const AddProduct = ({ onAddProduct, products = [], onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    discount: '',
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Wet Cupping Cups',
    'Vacuum Pumps',
    'Cupping Therapy Kits',
    'Dry Cupping Cups',
    'Wood Massager Tools',
    'PVC Massager Tools',
    'Acupuncture Needles',
    'Personal Care Developers',
    'Special Hijama Products',
    'Regular Hijama Products',
    'Leech Therapy',
    'Trimmers',
    'Hijama Books',
    'Acupuncture Books',
    'Herbal Products',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product Name is required.';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required.';
    }
    if (!formData.price || isNaN(formData.price) || formData.price <= 0) {
      newErrors.price = 'A valid price is required.';
    }

    // Check for duplicate product name within the same category
    const isDuplicate = products.some(
      (product) =>
        product.name.toLowerCase() === formData.name.toLowerCase() &&
        product.category === formData.category
    );
    if (isDuplicate) {
      newErrors.name = 'A product with this name already exists in the selected category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const newProduct = {
      id: Date.now(),
      ...formData,
    };
    onAddProduct(newProduct);
    onClose(); // Close the form modal after adding product
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
            <label htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
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
            <label htmlFor="discount">Discount (%)</label>
            <input
              type="number"
              id="discount"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              placeholder="Enter discount percentage"
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
