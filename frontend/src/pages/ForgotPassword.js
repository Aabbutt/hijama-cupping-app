import React from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Reset Password</h1>
        <p>Enter your phone number to reset your password</p>
        <ul>
          <li>Securely manage your account</li>
          <li>Regain access to your health dashboard</li>
          <li>Contact support if you need further assistance</li>
        </ul>
      </div>
      <div className="login-right">
        <div className="login-container">
          <h2>Forgot Password</h2>
          <p>Please enter your phone number to reset your password</p>
          <form>
            <div className="form-group">
              <label htmlFor="phone-number">Phone Number</label>
              <div className="phone-input">
                <span className="country-code">+92</span>
                <input type="text" id="phone-number" placeholder="301 2345678" />
              </div>
            </div>
            <button type="submit">Reset Password</button>
          </form>
          <div className="additional-options">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
