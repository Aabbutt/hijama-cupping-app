import React, { useState, useEffect } from 'react';
import './Products.css'; // Import the CSS for professional styling
import ProductModal from './ProductModal'; // A separate modal component
import Pagination from './Pagination'; // For pagination functionality
import productsData from './productsData'; // Sample data for products

const ProductsPage = () => {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Number of products per page
  const [sortOption, setSortOption] = useState('latest');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  
  // Search Filter Implementation
  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    setFilteredProducts(filtered);
  }, [searchTerm, priceRange, products]);

  // Add to Cart Functionality
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Add to Wishlist
  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  };

  // Remove from Wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter(item => item.id !== productId));
  };

  // Modal Open for Product Details
  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  // Modal Close
  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  // Pagination Control
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sort Products
  const sortProducts = (option) => {
    let sortedProducts = [...filteredProducts];
    switch (option) {
      case 'low-to-high':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'high-to-low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'latest':
        sortedProducts.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        break;
      default:
        break;
    }
    setFilteredProducts(sortedProducts);
  };

  useEffect(() => {
    sortProducts(sortOption);
  }, [sortOption]);

  return (
    <div className="products-page">
      {/* Search and Cart Header */}
      <header className="products-header">
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
              My Cart ({cart.length}) - ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
            </button>
          </div>
        </div>
      </header>

      {/* Filter by Price */}
      <section className="filter-section">
        <label>Filter by Price:</label>
        <input
          type="range"
          min="0"
          max="5000"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
        />
        <span>Price: ${priceRange[0]} - ${priceRange[1]}</span>
      </section>

      {/* Sort By */}
      <div className="sort-section">
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
          <option value="latest">Sort by Latest</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Product Categories */}
      <section className="product-categories">
        <h1 className="section-title">Product Categories</h1>
        <div className="product-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.image} alt={product.name} className="product-image" onClick={() => openProductDetails(product)} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)} className="add-to-cart-btn">Add to Cart</button>
              <button onClick={() => addToWishlist(product)} className="add-to-wishlist-btn">Add to Wishlist</button>
            </div>
          ))}
        </div>
        <Pagination
          productsPerPage={productsPerPage}
          totalProducts={filteredProducts.length}
          paginate={paginate}
        />
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} closeModal={closeProductDetails} addToCart={addToCart} />
      )}
    </div>
  );
};

export default ProductsPage;
