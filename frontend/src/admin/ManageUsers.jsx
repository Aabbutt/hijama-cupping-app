// src/admin/ManageUsers.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUsers.css';

const ManageUsers = () => {
  const [patients, setPatients] = useState([]);
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
    fetchPractitioners();
  }, []);

  const fetchPatients = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/patients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
      setError('Failed to fetch patients');
    }
  };

  const fetchPractitioners = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/api/practitioners/verified', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPractitioners(response.data);
    } catch (error) {
      console.error('Error fetching practitioners:', error);
      setError('Failed to fetch practitioners');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="manage-users-container">
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Patients</h3>
          <div className="stat-number">{patients.length}</div>
        </div>
        <div className="stat-card">
          <h3>Verified Practitioners</h3>
          <div className="stat-number">{practitioners.length}</div>
        </div>
      </div>

      <div className="users-section">
        <h2>Patients List</h2>
        <div className="users-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.status}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="practitioners-section">
        <h2>Practitioners List</h2>
        <div className="practitioners-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialty</th>
                <th>Experience</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {practitioners.map((practitioner) => (
                <tr key={practitioner._id}>
                  <td>{practitioner.name}</td>
                  <td>{practitioner.specialty}</td>
                  <td>{practitioner.experience} years</td>
                  <td>{practitioner.status}</td>
                  <td>
                    <button className="edit-btn">Edit</button>
                    <button className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
