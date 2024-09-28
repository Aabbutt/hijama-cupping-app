// src/components/settings/AccountRestrictions.js

import React, { useState } from 'react';

const AccountRestrictions = () => {
  const [settings, setSettings] = useState({
    allowNewAccounts: true,
    allowPasswordReset: true,
  });

  const toggleSetting = (name) => {
    setSettings((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Account Restrictions Updated:', settings);
  };

  return (
    <div className="settings-section">
      <h2>Account Restrictions</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Allow Creating New Accounts</label>
          <input type="checkbox" checked={settings.allowNewAccounts} onChange={() => toggleSetting('allowNewAccounts')} />
        </div>
        <div className="form-group">
          <label>Allow Resetting Password</label>
          <input type="checkbox" checked={settings.allowPasswordReset} onChange={() => toggleSetting('allowPasswordReset')} />
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default AccountRestrictions;
