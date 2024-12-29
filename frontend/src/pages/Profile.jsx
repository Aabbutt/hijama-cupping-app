import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    profilePicture: null,
    address: '123 Street, City',
    notifications: {
      email: true,
      sms: false,
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditedUser(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNotificationChange = (type) => {
    setEditedUser(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedUser(prev => ({
          ...prev,
          profilePicture: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(editedUser);
    setIsEditing(false);
    // Here you would typically make an API call to update the user profile
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-picture-container">
          <div className="profile-picture">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt={user.name} />
            ) : (
              <div className="profile-picture-placeholder">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
            {isEditing && (
              <label className="profile-picture-edit">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  style={{ display: 'none' }}
                />
                <i className="fas fa-camera"></i>
              </label>
            )}
          </div>
        </div>
        <h1>{user.name}</h1>
      </div>

      <div className="profile-content">
        <div className="profile-section">
          <div className="section-header">
            <h2>Personal Information</h2>
            <button 
              className="edit-button"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {isEditing ? (
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={editedUser.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={editedUser.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group notifications">
                <label>Notifications</label>
                <div className="checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={editedUser.notifications.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    Email Notifications
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={editedUser.notifications.sms}
                      onChange={() => handleNotificationChange('sms')}
                    />
                    SMS Notifications
                  </label>
                </div>
              </div>

              <button type="submit" className="save-button">
                Save Changes
              </button>
            </form>
          ) : (
            <div className="profile-info">
              <div className="info-group">
                <label>Email</label>
                <p>{user.email}</p>
              </div>
              <div className="info-group">
                <label>Phone</label>
                <p>{user.phone}</p>
              </div>
              <div className="info-group">
                <label>Address</label>
                <p>{user.address}</p>
              </div>
              <div className="info-group">
                <label>Notifications</label>
                <p>
                  {user.notifications.email && 'Email '}
                  {user.notifications.sms && 'SMS'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
