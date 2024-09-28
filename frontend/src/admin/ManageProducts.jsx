// src/admin/ManageProducts.js

import React, { useState } from 'react';
import AddProduct from '../components/AddProduct'; // Import AddProduct Component
import EditProduct from '../components/EditProduct'; // Import EditProduct Component
import './ManageProducts.css'; // Ensure your CSS file exists

const ManageProducts = ({ products, onAddProduct, onEditProduct, onDeleteProduct }) => {
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showEditProduct, setShowEditProduct] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // Holds the product being edited
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, productId: null });

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

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setShowEditProduct(true);
  };

  const handleUpdateProduct = (updatedProduct) => {
    onEditProduct(updatedProduct);
    setSuccessMessage('Product updated successfully!');
    setShowEditProduct(false);
    setCurrentProduct(null);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = (productId) => {
    setDeleteConfirm({ show: true, productId });
  };

  const confirmDelete = () => {
    onDeleteProduct(deleteConfirm.productId);
    setDeleteConfirm({ show: false, productId: null });
    setSuccessMessage('Product deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, productId: null });
  };

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
              <th>Category</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>Rs {product.price}</td>
                  <td>{product.discount ? `-${product.discount}%` : 'No Discount'}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(product)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(product.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No products available.</td>
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
