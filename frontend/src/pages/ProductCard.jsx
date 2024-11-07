import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product, addToCart, addToWishlist, openProductDetails }) => (
    <div className="product-card" tabIndex="0" aria-labelledby={`product-title-${product.id}`}>
        <img
            src={product.image}
            alt={product.name}
            className="product-image"
            onClick={() => openProductDetails(product)}
            loading="lazy" // Image optimization
        />
        <div className="product-info">
            <h3 id={`product-title-${product.id}`}>{product.name}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <div className="product-actions">
                <button onClick={() => addToCart(product)} className="btn add-to-cart-btn">
                    Add to Cart
                </button>
            </div>
        </div>
    </div>
);

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    addToCart: PropTypes.func.isRequired,
    addToWishlist: PropTypes.func.isRequired,
    openProductDetails: PropTypes.func.isRequired,
};

export default ProductCard;

