import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // Ensure correct path

const CartButton = () => {
    const { cart, calculateTotal } = useContext(CartContext);

    const totalItems = cart.reduce((count, item) => count + item.quantity, 0);
    const totalPrice = calculateTotal().toFixed(2);

    return (
        <Link to="/cart">
            <button className="cart-btn">
                My Cart ({totalItems}) - Rs {totalPrice}
            </button>
        </Link>
    );
};

export default CartButton;
