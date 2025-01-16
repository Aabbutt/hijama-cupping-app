import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ManagePatients.css';

const ManagePatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    const adminToken = localStorage.getItem('adminToken');

    if (!isAdmin || !adminToken) {
      navigate('/admin/login');
      return;
    }

    fetchPatients();
  }, [navigate]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const adminToken = localStorage.getItem('adminToken');
      
      const response = await axios.get('http://localhost:3000/user', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.data) {
        throw new Error('No data received from server');
      }

      const patientUsers = Array.isArray(response.data) 
        ? response.data.filter(user => user.role === 'patient')
        : [];
      
      setPatients(patientUsers);
    } catch (error) {
      console.error('Error details:', error.response || error);
      if (error.response?.status === 401) {
        navigate('/admin/login');
      } else {
        setError(error.response?.data?.message || 'Error fetching patients');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePatient = async (patientId) => {
    try {
      const adminToken = localStorage.getItem('adminToken');
      
      if (!adminToken) {
        setError('Please login as admin');
        navigate('/admin/login');
        return;
      }

      await axios.delete(`http://localhost:3000/user/${patientId}`, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json'
        }
      });
      setPatients(patients.filter(patient => patient._id !== patientId));
    } catch (error) {
      console.error('Delete error:', error.response || error);
      if (error.response?.status === 401) {
        setError('Session expired. Please login again.');
        navigate('/admin/login');
      } else {
        setError(error.response?.data?.message || 'Error deleting patient');
      }
    }
  };

  const filteredPatients = patients.filter(patient => 
    patient.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="manage-patients-container">
      <h2>Manage Patients</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {loading ? (
        <p>Loading patients...</p>
      ) : patients.length === 0 ? (
        <p>No patients found</p>
      ) : (
        <div className="patients-list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Registration Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient._id}>
                  <td>{patient.name}</td>
                  <td>{patient.email}</td>
                  <td>{patient.phone || 'N/A'}</td>
                  <td>{patient.gender || 'N/A'}</td>
                  <td>{patient.dateofbirth ? new Date(patient.dateofbirth).toLocaleDateString() : 'N/A'}</td>
                  <td>{patient.createdAt ? new Date(patient.createdAt).toLocaleDateString() : 'N/A'}</td>
                  <td>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeletePatient(patient._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManagePatients; 