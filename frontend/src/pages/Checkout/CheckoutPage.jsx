import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';
import { calculateTotal } from '../utils/cartUtils';

const CheckoutPage = ({ cart, setCart }) => { // Destructure cart and setCart from props
    const [localCart, setLocalCart] = useState(() => {
        // Get the cart from localStorage if it exists
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : cart; // Fallback to cart prop if no localStorage
    });

    const [billingInfo, setBillingInfo] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: ''
    });
    const [paymentMethod, setPaymentMethod] = useState('');
    const navigate = useNavigate();

    // Save the cart to localStorage whenever localCart changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(localCart));
    }, [localCart]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBillingInfo(prevInfo => ({ ...prevInfo, [name]: value }));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        // Order submission logic (could include validation, API calls, etc.)
        const orderDetails = {
            orderNumber: Math.floor(Math.random() * 1000000),
            deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
            cart: localCart,
            billingInfo,
            paymentMethod
        };
        
        setCart([]); // Clear the cart after placing the order
        setLocalCart([]); // Update the local cart state
        localStorage.removeItem('cart'); // Clear cart from localStorage

        navigate('/order-confirmation', { state: { orderDetails } });
    };

    const total = calculateTotal(localCart).toFixed(2); // Use localCart for calculations

    return (
        <div className="checkout-page">
            <h2>Checkout</h2>
            <form onSubmit={handlePlaceOrder}>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={billingInfo.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        name="address"
                        value={billingInfo.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>City</label>
                    <input
                        type="text"
                        name="city"
                        value={billingInfo.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Postal Code</label>
                    <input
                        type="text"
                        name="postalCode"
                        value={billingInfo.postalCode}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Country</label>
                    <input
                        type="text"
                        name="country"
                        value={billingInfo.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Payment Method</label>
                    <select
                        value={paymentMethod}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="">Select Payment Method</option>
                        <option value="card">Cash on Delivery</option>
                        
                    </select>
                </div>
                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <ul>
                        {localCart.map((item, index) => (
                            <li key={index}>
                                {item.name} x {item.quantity} - Rs {item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p>Total: Rs {total}</p>
                </div>
                <button type="submit" className="place-order-btn">Place Order</button>
            </form>
        </div>
    );
};

export default CheckoutPage;
