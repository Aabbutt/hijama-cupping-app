// src/components/settings/GeneralSettings.js

import React, { useState } from 'react';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    instanceID: 'HJAM1234XYZ', // Example ID
    appName: 'Hijama Cupping App',
    appDescription: 'Manage Hijama services, appointments, and users efficiently.',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('General Settings Saved:', settings);
  };

  return (
    <div className="settings-section">
      <h2>General Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Instance ID</label>
          <input type="text" value={settings.instanceID} readOnly />
        </div>
        <div className="form-group">
          <label>App Name</label>
          <input type="text" name="appName" value={settings.appName} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>App Description</label>
          <textarea name="appDescription" value={settings.appDescription} onChange={handleChange}></textarea>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default GeneralSettings;
