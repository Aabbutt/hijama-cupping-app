// src/components/settings/UserDeletionSettings.js

import React, { useState } from 'react';

const UserDeletionSettings = () => {
  const [settings, setSettings] = useState({
    gracePeriod: 30, // Number of days before permanent deletion
  });

  const handleChange = (e) => {
    setSettings({ ...settings, gracePeriod: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('User Deletion Settings Updated:', settings);
  };

  return (
    <div className="settings-section">
      <h2>User Deletion</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Grace Period (days)</label>
          <input type="number" value={settings.gracePeriod} onChange={handleChange} />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default UserDeletionSettings;
