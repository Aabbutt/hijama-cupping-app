import React, { useState, useEffect } from 'react';
import { useCurrentUser } from '../hooks/use-current-user';
import Cookies from 'js-cookie';
import './Settings.css';

const Settings = () => {
  const { data: user } = useCurrentUser();
  const [activeTab, setActiveTab] = useState('notifications');
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:5000/settings', {
        headers: {
          Authorization: `Bearer ${Cookies.get('session')}`,
        },
      });
      const data = await response.json();
      setSettings(data.settings);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching settings:', error);
      setLoading(false);
    }
  };

  const updateSettings = async (type, values) => {
    try {
      const response = await fetch(`http://localhost:5000/settings/${type}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('session')}`,
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      setSettings(data.settings);
    } catch (error) {
      console.error('Error updating settings:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      
      <div className="settings-tabs">
        <button 
          className={`tab ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
        </button>
        <button 
          className={`tab ${activeTab === 'preferences' ? 'active' : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          Preferences
        </button>
        <button 
          className={`tab ${activeTab === 'privacy' ? 'active' : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          Privacy
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'notifications' && (
          <div className="notifications-settings">
            <h2>Notification Settings</h2>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings?.notifications?.email}
                  onChange={(e) => updateSettings('notifications', { 
                    ...settings.notifications,
                    email: e.target.checked 
                  })}
                />
                Email Notifications
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings?.notifications?.sms}
                  onChange={(e) => updateSettings('notifications', { 
                    ...settings.notifications,
                    sms: e.target.checked 
                  })}
                />
                SMS Notifications
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings?.notifications?.appointmentReminders}
                  onChange={(e) => updateSettings('notifications', { 
                    ...settings.notifications,
                    appointmentReminders: e.target.checked 
                  })}
                />
                Appointment Reminders
              </label>
            </div>
          </div>
        )}

        {activeTab === 'preferences' && (
          <div className="preferences-settings">
            <h2>Preferences</h2>
            <div className="setting-item">
              <label>Language</label>
              <select
                value={settings?.preferences?.language}
                onChange={(e) => updateSettings('preferences', { 
                  ...settings.preferences,
                  language: e.target.value 
                })}
              >
                <option value="en">English</option>
                <option value="ur">Urdu</option>
              </select>
            </div>
            <div className="setting-item">
              <label>Theme</label>
              <select
                value={settings?.preferences?.theme}
                onChange={(e) => updateSettings('preferences', { 
                  ...settings.preferences,
                  theme: e.target.value 
                })}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === 'privacy' && (
          <div className="privacy-settings">
            <h2>Privacy Settings</h2>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings?.privacy?.showProfile}
                  onChange={(e) => updateSettings('privacy', { 
                    ...settings.privacy,
                    showProfile: e.target.checked 
                  })}
                />
                Show Profile to Others
              </label>
            </div>
            <div className="setting-item">
              <label>
                <input
                  type="checkbox"
                  checked={settings?.privacy?.showContactInfo}
                  onChange={(e) => updateSettings('privacy', { 
                    ...settings.privacy,
                    showContactInfo: e.target.checked 
                  })}
                />
                Show Contact Information
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings; 