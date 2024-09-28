import React, { useState } from 'react';

const PaymentSettings = () => {
  const [settings, setSettings] = useState({
    currency: 'PKR', // Default currency
    paymentGateway: 'Stripe', // Default payment gateway
    enablePaymentProcessing: true, // Enable or disable payment processing
    transactionFee: 2.5, // Transaction fee percentage
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = () => {
    setSettings((prev) => ({ ...prev, enablePaymentProcessing: !prev.enablePaymentProcessing }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    console.log('Payment Settings Saved:', settings);
  };

  return (
    <div className="settings-section">
      <h2>Payment Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Currency</label>
          <select name="currency" value={settings.currency} onChange={handleChange}>
            <option value="PKR">Pakistani Rupee (PKR)</option>
            <option value="USD">US Dollar (USD)</option>
            <option value="EUR">Euro (EUR)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Payment Gateway</label>
          <select name="paymentGateway" value={settings.paymentGateway} onChange={handleChange}>
            <option value="Stripe">Stripe</option>
            <option value="PayPal">PayPal</option>
            <option value="Square">Square</option>
          </select>
        </div>
        <div className="form-group">
          <label>Transaction Fee (%)</label>
          <input type="number" name="transactionFee" value={settings.transactionFee} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Enable Payment Processing</label>
          <input type="checkbox" checked={settings.enablePaymentProcessing} onChange={handleToggle} />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default PaymentSettings;
