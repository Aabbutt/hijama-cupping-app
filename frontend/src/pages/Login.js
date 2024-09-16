import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Welcome Back</h1>
        <p>Access your personalized health dashboard</p>
        <ul>
          <li>Track your health records</li>
          <li>Book appointments with ease</li>
          <li>Access health tips and resources</li>
        </ul>
      </div>
      <div className="login-right">
        <div className="login-container">
          <h2>Login to Your Account</h2>
          <p>Please enter your details to continue</p>
          <form>
            <div className="form-group">
              <label htmlFor="phone-number">Phone Number</label>
              <div className="phone-input">
                <span className="country-code">+92</span>
                <input type="text" id="phone-number" placeholder="301 2345678" />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <button type="submit">Login</button>
          </form>
          <div className="additional-options">
            <Link to="/signup">Sign Up</Link>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
