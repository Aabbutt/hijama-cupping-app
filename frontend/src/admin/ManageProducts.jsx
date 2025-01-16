import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProduct from './AddProduct';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products when component mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Function to fetch products
  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/products', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  // Function to handle adding a new product
  const handleAddProduct = async (newProduct) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/products', newProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setProducts([...products, response.data]);
      setShowAddModal(false);
      // Fetch products again to ensure we have the latest data
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  // Function to handle product deletion
  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="manage-products-container">
      <h2>Manage Products</h2>
      <button onClick={() => setShowAddModal(true)}>Add New Product</button>

      {showAddModal && (
        <AddProduct 
          onAddProduct={handleAddProduct}
          onClose={() => setShowAddModal(false)}
        />
      )}
      
      {/* Display products in a table */}
      <div className="products-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>Rs. {product.price}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => handleDeleteProduct(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProducts; 