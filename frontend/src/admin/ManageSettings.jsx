import React from 'react';
import './ManageSettings.css'; // Import CSS styles

const ManageSettings = () => {
  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1>Settings Management</h1>
        <div className="settings-actions">
          <button className="btn-theme-editor">Code Editor</button>
          <button className="btn-theme-settings">Theme Settings</button>
        </div>
      </header>

      <div className="settings-grid">
        {/* User Management */}
        <div className="settings-card">
          <img
            src="/images/user-management.png"
            alt="User Management"
            className="settings-card-image"
          />
          <h3>User Management</h3>
          <p>Manage roles, permissions, and accounts for Hijama practitioners and clients.</p>
          <button className="btn-action">Manage Users</button>
        </div>

        {/* Appointment Settings */}
        <div className="settings-card">
          <img
            src="/images/appointment-settings.png"
            alt="Appointment Settings"
            className="settings-card-image"
          />
          <h3>Appointment Settings</h3>
          <p>Configure booking times, reminders, and cancellation policies for Hijama appointments.</p>
          <button className="btn-action">Manage Appointments</button>
        </div>

        {/* Product Management */}
        <div className="settings-card">
          <img
            src="/images/product-management.png"
            alt="Product Management"
            className="settings-card-image"
          />
          <h3>Product Management</h3>
          <p>Manage Hijama cups, pumps, kits, and other products available in your clinic.</p>
          <button className="btn-action">Manage Products</button>
        </div>

        {/* Notification Settings */}
        <div className="settings-card">
          <img
            src="/images/notification-settings.png"
            alt="Notification Settings"
            className="settings-card-image"
          />
          <h3>Notification Settings</h3>
          <p>Set up notifications for booking confirmations, reminders, and promotional offers.</p>
          <button className="btn-action">Edit Notifications</button>
        </div>

        {/* General Settings */}
        <div className="settings-card">
          <img
            src="/images/general-settings.png"
            alt="General Settings"
            className="settings-card-image"
          />
          <h3>General Settings</h3>
          <p>Adjust general settings like privacy policies, terms of service, and contact information.</p>
          <button className="btn-action">Edit General Settings</button>
        </div>
      </div>
    </div>
  );
};

export default ManageSettings;
