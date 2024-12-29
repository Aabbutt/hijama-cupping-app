import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProfileDropdown.css';

const ProfileDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Link to="/profile" className="dropdown-item">
            <i className="fas fa-user"></i>
            My Profile
          </Link>
          <Link to="/profile/settings" className="dropdown-item">
            <i className="fas fa-cog"></i>
            Settings
          </Link>
          <Link to="/profile/appointments" className="dropdown-item">
            <i className="fas fa-calendar"></i>
            My Appointments
          </Link>
          <div className="dropdown-divider"></div>
          <button className="dropdown-item logout">
            <i className="fas fa-sign-out-alt"></i>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown; 