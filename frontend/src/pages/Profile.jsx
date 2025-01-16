import React, { useState, useEffect } from 'react';
import './Profile.css';
import AddAppointment from '../components/AddAppointment';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentAppointment, setCurrentAppointment] = useState(null);
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  const fetchCurrentAppointment = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch('http://localhost:3000/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.appointments && data.appointments.length > 0) {
          const sortedAppointments = data.appointments.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
          );
          setCurrentAppointment(sortedAppointments[0]);
        } else {
          setCurrentAppointment(null);
        }
      }
    } catch (err) {
      console.error('Error fetching appointment:', err);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please login first');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:3000/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const { user: profileData } = await response.json();
          setUser(profileData);
          setEditedUser(profileData);
          setError('');
        } else {
          const errorData = await response.json();
          setError(errorData.error || 'Failed to load profile');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Error loading profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
    fetchCurrentAppointment();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login again');
        return;
      }

      console.log('Submitting profile update:', editedUser);

      const response = await fetch('http://localhost:3000/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: editedUser.name,
          email: editedUser.email,
          phone: editedUser.phone || '',
          address: editedUser.address || '',
          dateofbirth: editedUser.dateofbirth || '',
          gender: editedUser.gender || '',
          role: "patient"
        })
      });

      const data = await response.json();
      console.log('Profile update response:', data);

      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        setIsEditing(false);
        setError('');
      } else {
        setError(data.error || data.details || 'Error updating profile');
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Error updating profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-content">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user && !loading) {
    return (
      <div className="profile-page">
        <div className="profile-content">
          <p>Please log in to view your profile</p>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    );
  }

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

          {error && <p className="error-message">{error}</p>}

          {isEditing ? (
            <form onSubmit={handleSubmit} className="edit-form">
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={editedUser.phone || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={editedUser.address || ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateofbirth"
                  value={editedUser.dateofbirth ? new Date(editedUser.dateofbirth).toISOString().split('T')[0] : ''}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender"
                  value={editedUser.gender || ''}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
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
                <p>{user.phone || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Address</label>
                <p>{user.address || 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Date of Birth</label>
                <p>{user.dateofbirth ? new Date(user.dateofbirth).toLocaleDateString() : 'Not provided'}</p>
              </div>
              <div className="info-group">
                <label>Gender</label>
                <p>{user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 'Not provided'}</p>
              </div>
            </div>
          )}
        </div>

        <div className="profile-section">
          <div className="section-header">
            <h2>Appointments</h2>
            <button 
              className="book-button"
              onClick={() => setShowAppointmentForm(true)}
            >
              Book New Appointment
            </button>
          </div>

          {currentAppointment ? (
            <div className="appointment-card">
              <h3>Current Appointment</h3>
              <div className="appointment-details">
                <div className="detail-item">
                  <label>Service:</label>
                  <p>{currentAppointment.services}</p>
                </div>
                <div className="detail-item">
                  <label>Date:</label>
                  <p>{new Date(currentAppointment.preferredDate).toLocaleDateString()}</p>
                </div>
                <div className="detail-item">
                  <label>Time:</label>
                  <p>{currentAppointment.preferredTime}</p>
                </div>
                <div className="detail-item">
                  <label>Status:</label>
                  <p className={`status ${currentAppointment.status}`}>
                    {currentAppointment.status}
                  </p>
                </div>
                {currentAppointment.practitioner && (
                  <div className="detail-item">
                    <label>Practitioner:</label>
                    <p>{currentAppointment.practitioner.name}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="no-appointment">No current appointments</p>
          )}

          {showAppointmentForm && (
            <div className="modal">
              <div className="modal-content">
                <button 
                  className="close-button"
                  onClick={() => setShowAppointmentForm(false)}
                  aria-label="Close modal"
                >
                  ✕
                </button>
                <h2 className="modal-title">Book Appointment</h2>
                <AddAppointment 
                  onSuccess={() => {
                    setShowAppointmentForm(false);
                    fetchCurrentAppointment();
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
