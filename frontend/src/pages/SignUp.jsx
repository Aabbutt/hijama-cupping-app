import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation after sign-up
import axios from "axios"; // Assuming you're using axios for API requests
import { Link } from "react-router-dom"; // To create navigation links

const SignUp = () => {
  // State variables to store form input values
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  // Initialize useNavigate for redirection
  const navigate = useNavigate();

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === "name") setName(value);
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
    if (id === "phoneNumber") setPhoneNumber(value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Send POST request to your signup endpoint
      const response = await axios.post("http://localhost:3000/user/signup", {
        name,
        email,
        password,
        phoneNumber,
      });

      if (response.status === 201) {
        // If user created successfully, navigate to login page or another route
        navigate("/login"); // Redirect to login page after successful signup
      }
    } catch (err) {
      // Handle errors (e.g., if email already exists)
      setErrorMessage(
        err.response ? err.response.data.message : "Something went wrong!"
      );
    } finally {
      setIsLoading(false); // Stop the loading spinner when done
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Join Us</h1>
        <p>Create an account to access your personalized health dashboard</p>
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

          {/* Display error message if exists */}
          {errorMessage && <p className="error">{errorMessage}</p>}

          <form onSubmit={handleSubmit}>
            {/* Phone Number Field */}
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <div className="phone-input">
                <span className="country-code">+92</span>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  placeholder="301 2345678"
                  required
                />
              </div>
            </div>

            {/* Name Field */}
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                required
              />
            </div>

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Additional Options */}
          <div className="additional-options">
            <Link to="/login">Already have an account? Login</Link>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
