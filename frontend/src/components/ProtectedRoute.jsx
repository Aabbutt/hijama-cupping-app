// src/components/ProtectedRoute.js

import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Use the custom hook from AuthContext
import ShortLoginModal from './ShortLoginModal'; // Import the short login modal

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Access authentication status
  const [showModal, setShowModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false); // To track if the admin reconfirmed

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSuccess = () => {
    setIsVerified(true);
    setShowModal(false);
  };

  // Show modal for settings page only
  if (!isVerified && !showModal) {
    setShowModal(true);
    return null; // Prevent rendering until verification
  }

  return isAuthenticated ? (
    <>
      {children}
      {showModal && <ShortLoginModal onClose={handleModalClose} onSuccess={handleSuccess} />}
    </>
  ) : (
    <Navigate to="/admin/login" />
  );
};

export default ProtectedRoute;
