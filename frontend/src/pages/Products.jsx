import React, { useState, useEffect, useContext } from "react";
import "./Products.css";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import CartButton from "./Cart/CartButton"; // Adjust the path as necessary
import { Helmet } from "react-helmet";
import { CartContext } from "./context/CartContext"; // Import CartContext
import axios from "axios"; // Import Axios for data fetching

const Products = () => {
  const { addToCart } = useContext(CartContext); // Use CartContext for cart management
  const [products, setProducts] = useState([]); // No hardcoded products, use dynamic data
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [visibleProducts, setVisibleProducts] = useState(8); // Number of products to show initially
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products"); // Adjust URL as needed
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Search and Filter Implementation
  useEffect(() => {
    let filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting by Latest (Assuming each product has a releaseDate field)
    filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  // Modal Open for Product Details
  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  // Modal Close
  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  // Explore More and Show Less button handling
  const handleExploreMore = () => {
    setVisibleProducts((prev) => prev + 8); // Show 8 more products
  };

  const handleShowLess = () => {
    setVisibleProducts((prev) => (prev - 8 > 8 ? prev - 8 : 8)); // Show 8 less products, but never go below 8
  };

  // Handle loading and error states
  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="products-page">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>HIJAMA Products | Your Store Name</title>
        <meta
          name="description"
          content="Browse our wide range of baby care products. High quality and affordable prices."
        />
        <meta
          name="keywords"
          content="baby care, infant products, baby formula, baby shampoo, baby wipes"
        />
      </Helmet>

      {/* Search and Cart Header */}
      <header className="products-header">
        <div className="header-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Search Products"
              className="search-input"
            />
          </div>

          {/* Cart Button */}
          <CartButton />
        </div>
      </header>

      {/* Product Categories */}
      <section className="product-categories">
        <h1 className="section-title">Hijama Products</h1>
        <div className="product-grid">
          {filteredProducts.slice(0, visibleProducts).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart} // Use addToCart from context
              openProductDetails={openProductDetails}
            />
          ))}
        </div>

        {/* Explore More and Show Less Buttons */}
        <div className="button-group">
          {visibleProducts < filteredProducts.length && (
            <button onClick={handleExploreMore} className="explore-more-btn">
              Explore More
            </button>
          )}
          {visibleProducts > 8 && (
            <button onClick={handleShowLess} className="show-less-btn">
              Show Less
            </button>
          )}
        </div>
      </section>

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          closeModal={closeProductDetails}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default Products;
