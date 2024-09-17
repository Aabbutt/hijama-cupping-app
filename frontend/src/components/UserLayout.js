import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';  // Import the header component
import Footer from './Footer';  // Import the footer component
import './UserLayout.css';  // You can use this file to style the layout

const UserLayout = () => {
  return (
    <div className="user-layout">
      {/* Include Header on all user pages */}
      <Header />

      {/* Main content area where the child routes will be rendered */}
      <main className="main-content">
        <Outlet /> {/* Outlet will render the current route's component */}
      </main>

      {/* Include Footer on all user pages */}
      <Footer />
    </div>
  );
};

export default UserLayout;
