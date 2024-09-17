// src/admin/Dashboard.js
import React, { useEffect, useState, useContext } from 'react';
import './Dashboard.css';
import { getUsersCount, getProductsCount, getAppointmentsCount } from '../services/adminService';
import { AdminContext } from './AdminContext';

const Dashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    products: 0,
    appointments: 0,
  });
  const { theme } = useContext(AdminContext);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await getUsersCount();
        const products = await getProductsCount();
        const appointments = await getAppointmentsCount();
        setStats({ users, products, appointments });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className={`dashboard ${theme}`}>
      <h2>Welcome to the Admin Dashboard</h2>
      <div className="dashboard-widgets">
        <div className="widget">
          <h3>Total Users</h3>
          <p>{stats.users}</p>
        </div>
        <div className="widget">
          <h3>Total Products</h3>
          <p>{stats.products}</p>
        </div>
        <div className="widget">
          <h3>Appointments Today</h3>
          <p>{stats.appointments}</p>
        </div>
      </div>
      {/* Additional dashboard content like charts and recent activities can go here */}
    </div>
  );
};

export default Dashboard;
