import React, { useState, useEffect, useContext } from 'react';
import './Products.css'; 
import ProductCard from './ProductCard';
import ProductModal from './ProductModal';
import Pagination from './Pagination';
import productsData from './productsData';
import CartButton from './Cart/CartButton'; // Adjust the path as necessary
import { Helmet } from 'react-helmet';
import { CartContext } from './context/CartContext'; // Import CartContext

const Products = () => {
    const { addToCart, cart } = useContext(CartContext); // Use CartContext for cart management
    const [products] = useState(productsData);
    const [searchTerm, setSearchTerm] = useState('');
    const [wishlist, setWishlist] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8; // Number of products per page
    const [sortOption, setSortOption] = useState('latest');
    const [priceRange, setPriceRange] = useState([0, 5000]);

    // Search and Filter Implementation
    useEffect(() => {
        let filtered = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            product.price >= priceRange[0] &&
            product.price <= priceRange[1]
        );

        // Sorting
        switch (sortOption) {
            case 'low-to-high':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'high-to-low':
                filtered.sort((a, b) => b.price - a.price);
                break;
            case 'latest':
                filtered.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
                break;
            default:
                break;
        }

        setFilteredProducts(filtered);
        setCurrentPage(1); // Reset to first page on filter/sort
    }, [searchTerm, priceRange, sortOption, products]);

    // Add to Wishlist
    const addToWishlist = (product) => {
        if (!wishlist.find(item => item.id === product.id)) {
            setWishlist([...wishlist, product]);
        }
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

    return (
        <div className="products-page">
            {/* SEO Meta Tags */}
            <Helmet>
                <title>Baby Care Products | Your Store Name</title>
                <meta name="description" content="Browse our wide range of baby care products. High quality and affordable prices." />
                <meta name="keywords" content="baby care, infant products, baby formula, baby shampoo, baby wipes" />
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

            {/* Filter by Price */}
            <section className="filter-section">
                <label htmlFor="price-range">Filter by Price:</label>
                <input
                    type="range"
                    id="price-range"
                    min="0"
                    max="5000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value, 10)])}
                    aria-valuemin="0"
                    aria-valuemax="5000"
                    aria-valuenow={priceRange[1]}
                />
                <span>Price: ${priceRange[0]} - ${priceRange[1]}</span>
            </section>

            {/* Sort By */}
            <div className="sort-section">
                <label htmlFor="sort-select">Sort By:</label>
                <select
                    id="sort-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    aria-label="Sort Products"
                >
                    <option value="latest">Sort by Latest</option>
                    <option value="low-to-high">Price: Low to High</option>
                    <option value="high-to-low">Price: High to Low</option>
                </select>
            </div>

            {/* Product Categories */}
            <section className="product-categories">
                <h1 className="section-title">Baby Care Products</h1>
                <div className="product-grid">
                    {currentProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            addToCart={addToCart} // Use addToCart from context
                            addToWishlist={addToWishlist}
                            openProductDetails={openProductDetails}
                        />
                    ))}
                </div>
                <Pagination
                    productsPerPage={productsPerPage}
                    totalProducts={filteredProducts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                />
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
