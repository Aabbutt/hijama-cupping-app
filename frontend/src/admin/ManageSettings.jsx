import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import './ManageSettings.css'; // Import CSS styles

const ManageSettings = () => {
  const [activeSection, setActiveSection] = useState('appointments'); // Track active section with default value
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  // Function to handle section clicks
  const handleSectionClick = (section) => {
    setActiveSection(section);
    
    // Navigate to respective routes
    if (section === 'appointments') {
      navigate('/manage-appointments'); // Navigate to appointments management page
    } else if (section === 'users') {
      navigate('/manage-users'); // Navigate to user management page
    } else if (section === 'products') {
      navigate('/manage-products'); // Navigate to product management page
    } else if (section === 'practitioners') {
      navigate('/manage-practitioners'); // Navigate to practitioner management page
    }
      else if (section === 'discounts') {
      navigate('/manage-discounts'); // Navigate to practitioner management page
    }
      else if (section === 'notifications') {
      navigate('/manage-notifications'); 
    }
  };

  // Sections to display
  const sections = [
    { id: 'appointments', title: 'Manage Appointments', icon: '📅', description: 'Manage all appointments for Hijama Therapy.' },
    { id: 'practitioners', title: 'Manage Practitioners', icon: '👨‍⚕️', description: 'Manage practitioner availability and performance.' },
    { id: 'products', title: 'Product Management', icon: '🛒', description: 'Manage Hijama therapy products and inventory.' },
    { id: 'users', title: 'User Management', icon: '👥', description: 'Manage user roles, permissions, and profiles.' },
    { id: 'discounts', title: 'Discounts & Offers', icon: '💸', description: 'Create and manage discounts and special offers.' },
    { id: 'notifications', title: 'Notification Settings', icon: '🔔', description: 'Set up automatic notifications for appointments.' },
    { id: 'rooms', title: 'Room Scheduling', icon: '📍', description: 'Manage therapy room availability and scheduling.' },
    { id: 'subscriptions', title: 'Subscriptions', icon: '💼', description: 'Handle subscription-based services and packages.' },
    { id: 'billing', title: 'Billing & Invoicing', icon: '💳', description: 'Manage payments, invoices, and billing history.' },
  ];

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1 className="settings-title">Admin Settings Management Dashboard</h1>
      </header>

      {/* Settings Grid Display */}
      <div className="settings-grid">
        {sections.map((section) => (
          <div 
            key={section.id} 
            className={`settings-card ${activeSection === section.id ? 'active' : ''}`} 
            onClick={() => handleSectionClick(section.id)}
          >
            <div className="settings-icon">{section.icon}</div>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </div>
        ))}
      </div>

      {/* Dynamic Content Section for non-navigation items */}
      <div className="settings-content">
        {activeSection === 'practitioners' && (
          <div className="settings-panel">
            <h2 className="panel-title">Practitioner Management</h2>
            <p className="panel-description">
              Control practitioner availability, certifications, and performance analytics.
            </p>
            <button className="btn-action" onClick={() => navigate('/manage-practitioners')}>
              Manage Practitioners
            </button>
            <button className="btn-action" onClick={() => navigate('/manage-discounts')}>
            Discounts & Offers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageSettings;
