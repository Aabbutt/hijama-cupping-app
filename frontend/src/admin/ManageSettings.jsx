// src/admin/ManageSettings.js

import React, { useState } from 'react';
import './ManageSettings.css'; // Assuming CSS is styled as per your reference for professionalism
import GeneralSettings from '../components/settings/GeneralSettings';
import AccountRestrictions from '../components/settings/AccountRestrictions';
import AppointmentSettings from '../components/settings/AppointmentSettings';
import UserDeletionSettings from '../components/settings/UserDeletionSettings';
import PaymentSettings from '../components/settings/PaymentSettings';
import NotificationSettings from '../components/settings/NotificationSettings';

const ManageSettings = () => {
  const [activeTab, setActiveTab] = useState('general'); // Default active tab

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'general':
        return <GeneralSettings />;
      case 'account-restrictions':
        return <AccountRestrictions />;
      case 'appointment':
        return <AppointmentSettings />;
      case 'user-deletion':
        return <UserDeletionSettings />;
      case 'payment':
        return <PaymentSettings />;
      case 'notifications':
        return <NotificationSettings />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <div className="settings-container">
      <h1>Admin Settings</h1>
      <div className="settings-sidebar">
        <ul>
          <li className={activeTab === 'general' ? 'active' : ''} onClick={() => setActiveTab('general')}>
            General Settings
          </li>
          <li className={activeTab === 'account-restrictions' ? 'active' : ''} onClick={() => setActiveTab('account-restrictions')}>
            Account Restrictions
          </li>
          <li className={activeTab === 'appointment' ? 'active' : ''} onClick={() => setActiveTab('appointment')}>
            Appointment Settings
          </li>
          <li className={activeTab === 'user-deletion' ? 'active' : ''} onClick={() => setActiveTab('user-deletion')}>
            User Deletion
          </li>
          <li className={activeTab === 'payment' ? 'active' : ''} onClick={() => setActiveTab('payment')}>
            Payment Settings
          </li>
          <li className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>
            Notification Settings
          </li>
        </ul>
      </div>
      <div className="settings-content">{renderActiveTab()}</div>
    </div>
  );
};

export default ManageSettings;
