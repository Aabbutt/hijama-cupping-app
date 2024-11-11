import React, { useState } from 'react';
import './Login.css';

const Login = () => {
  const [inputValue, setInputValue] = useState(''); // This will store the input value (email or phone)
  const [password, setPassword] = useState('');

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation for email or phone number input
    const isPhone = /^[0-9]+$/.test(inputValue); // Check if input is a phone number (only numbers)
    const isEmail = /\S+@\S+\.\S+/.test(inputValue); // Check if input is a valid email format

    if (isPhone) {
      console.log({ phoneNumber: inputValue, password });
    } else if (isEmail) {
      console.log({ email: inputValue, password });
    } else {
      console.log('Please enter a valid email or phone number');
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="input-value">Email or Mobile Phone</label>
              <input
                type="text"
                id="input-value"
                placeholder="Enter your email or mobile phone"
                value={inputValue}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <div className="additional-options">
            <a href="/signup">Sign Up</a>
            <a href="/forgot-password">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
