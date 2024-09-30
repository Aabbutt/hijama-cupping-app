import React from 'react';
import './Products.css'; // Use shared CSS

const ProductModal = ({ selectedProduct, closeProductDetails, addToCart }) => {
  return (
    <div className="product-modal">
      <div className="modal-content">
        <span className="close-modal" onClick={closeProductDetails}>&times;</span>
        <img
          src={selectedProduct.image}
          alt={selectedProduct.name}
          className="modal-image"
        />
        <h2>{selectedProduct.name}</h2>
        <p>{selectedProduct.description}</p>
        <p><strong>Price:</strong> ${selectedProduct.price.toFixed(2)}</p>
        <p><strong>Stock:</strong> {selectedProduct.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
        {selectedProduct.stock > 0 ? (
          <button
            onClick={() => addToCart(selectedProduct)}
            className="add-to-cart-btn"
          >
            Add to Cart
          </button>
        ) : (
          <p className="out-of-stock">Out of Stock</p>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
