import React, { useState } from "react";
import "./AddProduct.css"; // Add styling as needed
import axios from "axios"; // Import axios for API requests

const AddProduct = ({ onAddProduct, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    // ... other fields
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddProduct(formData); // Call the passed function
      onClose(); // Close the modal after successful addition
    } catch (error) {
      console.error('Failed to add product:', error);
      // Handle error (show error message to user)
    }
  };

  return (
    <div className="add-product-modal">
      <form onSubmit={handleSubmit}>
        {/* Your form fields */}
        <button type="submit">Add Product</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default AddProduct;
