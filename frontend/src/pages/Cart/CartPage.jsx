import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';
import { removeFromCart, calculateTotal } from '../utils/cartUtils'; // Import necessary utilities

const CartPage = () => {
    const [cart, setCart] = useState(() => {
        // Get the cart from localStorage if it exists
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save the cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    // Handler to remove an item from the cart
    const handleRemoveItem = (index) => {
        const updatedCart = removeFromCart(cart, index);
        setCart(updatedCart); // Update the cart state
    };

    // Calculate the total cost of the cart items
    const total = calculateTotal(cart).toFixed(2); // Safely handle the cart array and format the total

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <ul className="cart-items">
                    {cart.map((item, index) => (
                        <li key={index} className="cart-item">
                            <span>{item.name}</span>
                            <span>${item.price.toFixed(2)} (x{item.quantity})</span>
                            <button onClick={() => handleRemoveItem(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <div className="cart-summary">
                <p>Total: ${total}</p>
                <Link to="/checkout">
                    <button className="proceed-btn" disabled={cart.length === 0}>
                        Proceed to Checkout
                    </button>
                </Link>
                <Link to="/products">
                    <button className="continue-btn">Continue Shopping</button>
                </Link>
            </div>
        </div>
    );
};

export default CartPage;
