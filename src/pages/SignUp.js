import React from 'react';
import { Link } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Join Us</h1>
        <p>Create an account to access personalized health dashboard</p>
        <ul>
          <li>Track your health records</li>
          <li>Book appointments with ease</li>
          <li>Access health tips and resources</li>
        </ul>
      </div>
      <div className="login-right">
        <div className="login-container">
          <h2>Sign Up</h2>
          <p>Please enter your details to create an account</p>
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
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          <div className="additional-options">
            <Link to="/login">Login</Link>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
