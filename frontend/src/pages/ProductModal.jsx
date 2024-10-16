import React from 'react';
import PropTypes from 'prop-types';

const ProductModal = ({ product, closeModal, addToCart }) => {
    return (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-content">
                <button className="close-button" onClick={closeModal} aria-label="Close Modal">&times;</button>
                <img src={product.image} alt={product.name} className="modal-image" />
                <div className="modal-info">
                    <h2 id="modal-title">{product.name}</h2>
                    <p>{product.description}</p>
                    <p className="modal-price">${product.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(product)} className="btn add-to-cart-btn">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

ProductModal.propTypes = {
    product: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired,
};

export default ProductModal;
