// src/components/ManagePractitioners.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ManagePractitioners = () => {
  const [practitioners, setPractitioners] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPractitioners = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/practitioners');
        setPractitioners(data);
      } catch (error) {
        setError('Error: Unable to fetch practitioners');
      }
    };

    fetchPractitioners();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this practitioner?')) {
      try {
        await axios.delete(`http://localhost:5000/practitioners/${id}`);
        setPractitioners(practitioners.filter(practitioner => practitioner._id !== id));
      } catch (error) {
        setError('Error: Unable to delete practitioner');
      }
    }
  };

  return (
    <div>
      <h2>Manage Practitioners</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {practitioners.map((practitioner) => (
            <tr key={practitioner._id}>
              <td>{practitioner.fullName}</td>
              <td>{practitioner.emailAddress}</td>
              <td>{practitioner.mobileNumber}</td>
              <td>
                <Link to={`/edit-practitioner/${practitioner._id}`}>Edit</Link>
                <button onClick={() => handleDelete(practitioner._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePractitioners;
