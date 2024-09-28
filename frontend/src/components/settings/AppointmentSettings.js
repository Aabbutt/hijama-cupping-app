// src/components/settings/AppointmentSettings.js

import React, { useState } from 'react';

const AppointmentSettings = () => {
  const [settings, setSettings] = useState({
    appointmentDuration: 30, // Appointment duration in minutes
    bufferTime: 10, // Buffer time between appointments in minutes
    maxDailyAppointments: 20, // Maximum number of appointments per day
    workingHours: {
      start: '09:00', // Start of the working day
      end: '17:00', // End of the working day
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWorkingHoursChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      workingHours: {
        ...prev.workingHours,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    console.log('Appointment Settings Saved:', settings);
  };

  return (
    <div className="settings-section">
      <h2>Appointment Settings</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Appointment Duration (minutes)</label>
          <input type="number" name="appointmentDuration" value={settings.appointmentDuration} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Buffer Time Between Appointments (minutes)</label>
          <input type="number" name="bufferTime" value={settings.bufferTime} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Max Daily Appointments</label>
          <input type="number" name="maxDailyAppointments" value={settings.maxDailyAppointments} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Working Hours</label>
          <div className="working-hours">
            <input type="time" name="start" value={settings.workingHours.start} onChange={handleWorkingHoursChange} />
            <span>to</span>
            <input type="time" name="end" value={settings.workingHours.end} onChange={handleWorkingHoursChange} />
          </div>
        </div>
        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
};

export default AppointmentSettings;
