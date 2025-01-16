import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './ProfileDropdown.css';
import Cookies from "js-cookie";

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    // Close dropdown
    setIsOpen(false);
    
    // Navigate to home page
    navigate('/');
    
    // Optional: Reload the page to reset all states
    window.location.reload();
  };

  return (
    <div className="profile-dropdown">
      <div className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
        <div className="profile-avatar">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt={user.name} />
          ) : (
            <div className="avatar-placeholder">
              {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
          )}
        </div>
        <span className="profile-name">{user.name}</span>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <Link to="/profile" className="dropdown-item" onClick={() => setIsOpen(false)}>
            <i className="fas fa-user"></i>
            My Profile
          </Link>
          
          <Link to="/profile/appointments" className="dropdown-item" onClick={() => setIsOpen(false)}>
            <i className="fas fa-calendar"></i>
            My Appointments
          </Link>
          <div className="dropdown-divider"></div>
          <button onClick={logout} className="dropdown-item logout">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; 