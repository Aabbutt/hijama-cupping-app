import React, { useState } from 'react';
import CartButton from '../Cart/CartButton';
import Notification from '../Notification/Notification';
import './ProductPage.css';
import { addToCart } from '../../utils/cartUtils';

const ProductPage = () => {
    const [cart, setCart] = useState([]);
    const [notification, setNotification] = useState(null);

    const product = {
        id: 1,
        name: 'Sample Product',
        description: 'This is a great product!',
        price: 49.99,
        quantity: 1
    };

    const handleAddToCart = () => {
        setCart(prevCart => addToCart(prevCart, product));
        setNotification(`${product.name} added to cart!`);
        setTimeout(() => setNotification(null), 3000);
    };

    return (
        <div className="product-page">
            {notification && <Notification message={notification} />}
            <div className="product-details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p className="price">Rs{product.price.toFixed(2)}</p>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <CartButton cart={cart} />
        </div>
    );
};

export default ProductPage;
