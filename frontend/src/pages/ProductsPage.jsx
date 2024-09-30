import React, { useState } from 'react';
import './Products.css'; // Import CSS
import products from './productsData'; // Import product data
import ProductModal from './ProductModal'; // Import modal
import Pagination from './Pagination'; // Import pagination

const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Define how many products to display per page

  // Filter products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Add product to cart
  const addToCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
      setCart(cart.map(item => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Open product details modal
  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  // Close product details modal
  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  // Paginate function
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="products-page">
      {/* Header with search and cart */}
      <header className="products-header">
        <img src="/images/logo.png" alt="Logo" className="logo" />
        <div className="header-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-btn">Search</button>
          </div>
          <div className="cart">
            <button className="cart-btn">
              My Cart ({cart.length}) - $
              {cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </button>
          </div>
        </div>
      </header>

      {/* Product categories */}
      <section className="product-categories">
        <h1 className="section-title">Product Categories</h1>
        <div className="product-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
                onClick={() => openProductDetails(product)}
              />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Product details modal */}
      {selectedProduct && (
        <ProductModal
          selectedProduct={selectedProduct}
          closeProductDetails={closeProductDetails}
          addToCart={addToCart}
        />
      )}

      {/* Pagination */}
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default ProductsPage;
