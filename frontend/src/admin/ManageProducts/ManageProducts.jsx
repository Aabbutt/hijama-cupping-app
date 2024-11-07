// src/admin/ManageProducts.js

import React, { useState, useEffect } from 'react';
import AddProduct from '../../components/AddProduct'; // Import AddProduct Component
import EditProduct from '../../components/EditProduct'; // Import EditProduct Component
import './ManageProducts.css'; // Ensure your CSS file exists
import { DeleteIcon, EditIcon } from 'lucide-react';
import axios from 'axios'; // Import Axios for making API requests

const ManageProducts = ({ onAddProduct }) => {
  const [products, setProducts] = useState([]); // State to hold the products data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Holds the product being edited
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, productId: null });

  // Fetch products data from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products'); // Adjust the URL based on your backend URL
        setProducts(response.data); // Set the fetched products
        setLoading(false); // Update loading state
      } catch (error) {
        console.error('Failed to fetch products:', error);
        setError('Failed to fetch products');
        setLoading(false); // Update loading state
      }
    };

    fetchProducts(); // Call the fetch function when the component mounts
  }, []); // Empty dependency array means this runs once on component mount

  // Handle adding a new product
  const toggleAddProduct = () => {
    setShowAddProduct(!showAddProduct);
    setShowEditProduct(false); // Close edit modal if open
  };

  const handleAddProductInternal = (newProduct) => {
    onAddProduct(newProduct);
    setSuccessMessage('Product added successfully!');
    setShowAddProduct(false);
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
  };

  // Handle edit product action
  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setShowEditProduct(true);
  };

  const handleUpdateProduct = async (updatedProduct) => {
    try {
      const response = await axios.put(`http://localhost:5000/products/${updatedProduct._id}`, updatedProduct);
      setSuccessMessage('Product updated successfully!');
      setShowEditProduct(false);
      setCurrentProduct(null);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === updatedProduct._id ? response.data : product
        )
      );
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to update product:', error);
      setError('Failed to update product');
    }
  };

  // Handle delete product action
  const handleDelete = (productId) => {
    setDeleteConfirm({ show: true, productId });
  };

  const confirmDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/products/${deleteConfirm.productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== deleteConfirm.productId));
      setDeleteConfirm({ show: false, productId: null });
      setSuccessMessage('Product deleted successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Failed to delete product:', error);
      setError('Failed to delete product');
    }
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, productId: null });
  };

  // Render loading or error states
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="manage-products-container">
      <h1>Manage Products</h1>
      <button className="add-product-button" onClick={toggleAddProduct}>
        {showAddProduct ? 'Close Add Product' : 'Add New Product'}
      </button>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {showAddProduct && <AddProduct onAddProduct={handleAddProductInternal} products={products} onClose={() => setShowAddProduct(false)} />}
      {showEditProduct && currentProduct && (
        <EditProduct 
          product={currentProduct} 
          onUpdate={handleUpdateProduct} 
          onClose={() => setShowEditProduct(false)} 
        />
      )}
      <div className="products-list">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td><img src={product.image} alt={product.name} style={{ width: '50px' }} /></td>
                  <td>Rs {product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <div>
                      <EditIcon size={24} onClick={() => handleEditClick(product)} color='blue'/>
                      <DeleteIcon size={24} onClick={() => handleDelete(product._id)} color='red'/>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No products available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="modal" onClick={cancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={cancelDelete}>
              &times;
            </span>
            <p>Are you sure you want to delete this product?</p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="cancel-button" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProducts;
