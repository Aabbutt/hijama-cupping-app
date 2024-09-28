// src/components/settings/NotificationSettings.js

import React, { useState } from 'react';

const NotificationSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true, // Enable email notifications
    smsNotifications: false, // Enable SMS notifications
    notificationEmail: 'admin@hijamaapp.com', // Default email for notifications
    smsProvider: 'Twilio', // Default SMS provider
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name) => {
    setSettings((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    console.log('Notification Settings Saved:', settings);
  };

  return (
    <div className="settings-section">
      <h2>Notification Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email Notifications</label>
          <input type="checkbox" checked={settings.emailNotifications} onChange={() => handleToggle('emailNotifications')} />
        </div>
        <div className="form-group">
          <label>SMS Notifications</label>
          <input type="checkbox" checked={settings.smsNotifications} onChange={() => handleToggle('smsNotifications')} />
        </div>
        <div className="form-group">
          <label>Notification Email</label>
          <input type="email" name="notificationEmail" value={settings.notificationEmail} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>SMS Provider</label>
          <select name="smsProvider" value={settings.smsProvider} onChange={handleChange}>
            <option value="Twilio">Twilio</option>
            <option value="Nexmo">Nexmo</option>
            <option value="Plivo">Plivo</option>
          </select>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default NotificationSettings;
