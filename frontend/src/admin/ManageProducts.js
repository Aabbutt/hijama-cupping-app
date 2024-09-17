import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/productService'; // Assuming you have a service to fetch products
import './ManageProducts.css'; // Custom styles for product management

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    fetchProducts();
  }, []);

  return (
    <div className="manage-products">
      <h2>Manage Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.price}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;
