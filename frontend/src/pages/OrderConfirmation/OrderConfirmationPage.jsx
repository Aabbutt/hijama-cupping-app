import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './OrderConfirmation.css';

const OrderConfirmation = () => {
    const location = useLocation();
    const { orderDetails } = location.state || {};

    if (!orderDetails) {
        return (
            <div className="order-confirmation-page">
                <h2>No Order Details Found</h2>
                <Link to="/products">
                    <button className="continue-shopping-btn">Continue Shopping</button>
                </Link>
            </div>
        );
    }

    return (
        <div className="order-confirmation-page">
            <h2>Thank You for Your Order!</h2>
            <p>Order Number: {orderDetails.orderNumber}</p>
            <p>Estimated Delivery Date: {orderDetails.deliveryDate}</p>
            <h3>Order Summary:</h3>
            <ul>
                {orderDetails.cart.map((item, index) => (
                    <li key={index}>
                        {item.name} x {item.quantity} - ${item.price.toFixed(2)}
                    </li>
                ))}
            </ul>
            <Link to="/products">
                <button className="continue-shopping-btn">Continue Shopping</button>
            </Link>
        </div>
    );
};

export default OrderConfirmation;
