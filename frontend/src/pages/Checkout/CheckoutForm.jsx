import React from 'react';
import './Checkout.css';

const CheckoutForm = ({ billingInfo, handleChange, paymentMethod, setPaymentMethod }) => {
    return (
        <>
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
                    <option value="card">Credit/Debit Card</option>
                    <option value="paypal">PayPal</option>
                    <option value="google-pay">Google Pay</option>
                    <option value="apple-pay">Apple Pay</option>
                </select>
            </div>
        </>
    );
};

export default CheckoutForm;
