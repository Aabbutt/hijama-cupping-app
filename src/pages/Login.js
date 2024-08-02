import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Login</h1>
        <form>
          <div className="textbox">
            <input type="text" placeholder="Email" name="email" required />
            <span className="icon"><img src="/images/email-icon.png" alt="Email Icon" /></span>
          </div>
          <div className="textbox">
            <input type="password" placeholder="Password" name="password" required />
            <span className="icon"><img src="/images/lock-icon.png" alt="Lock Icon" /></span>
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        <div className="login-footer">
          <span><input type="checkbox" name="remember" /> Remember me</span>
          <span><a href="/register">New here? Sign in</a></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
