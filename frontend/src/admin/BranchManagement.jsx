import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import './ManageSettings.css'; // Reuse or create a similar CSS file for styling

const BranchManagement = ({ branch }) => {
  const navigate = useNavigate(); // useNavigate hook for programmatic navigation

  // Function to handle section clicks
  const handleSectionClick = (section) => {
    // Navigate to respective routes based on section
    switch (section) {
      case 'branchInfo':
        navigate('/branch-info'); // Navigate to branch information page
        break;
      case 'reviews':
        navigate('/branch-reviews'); // Navigate to branch reviews page
        break;
      case 'staff':
        navigate('/branch-staff'); // Navigate to branch staff management page
        break;
      case 'services':
        navigate('/branch-services'); // Navigate to branch services management page
        break;
      case 'performanceMetrics':
        navigate('/branch-performance-metrics'); // Navigate to performance metrics page
        break;
      case 'communicationHub':
        navigate('/branch-communication-hub'); // Navigate to communication hub page
        break;
      case 'appointmentManagement':
        navigate('/branch-appointments'); // Navigate to appointment management page
        break;
      case 'promotionalOffers':
        navigate('/branch-promotional-offers'); // Navigate to promotional offers page
        break;
      default:
        break;
    }
  };

  // Sections to display in the dashboard
  const sections = [
    { id: 'branchInfo', title: 'Branch Information', icon: '🏢', description: 'View and edit branch details.' },
    { id: 'reviews', title: 'Reviews & Ratings', icon: '⭐', description: 'Manage customer reviews and ratings.' },
    { id: 'staff', title: 'Staff Management', icon: '👥', description: 'Add or remove staff members.' },
    { id: 'services', title: 'Services Offered', icon: '🛠️', description: 'Manage branch-specific services.' },
    { id: 'performanceMetrics', title: 'Performance Metrics', icon: '📊', description: 'View branch performance data.' },
    { id: 'communicationHub', title: 'Communication Hub', icon: '💬', description: 'Manage internal communications.' },
    { id: 'appointmentManagement', title: 'Appointment Management', icon: '📅', description: 'Manage client appointments.' },
    { id: 'promotionalOffers', title: 'Promotional Offers', icon: '🎉', description: 'Create and manage promotions.' },
  ];

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1 className="settings-title">Branch Management Dashboard</h1>
      </header>

      {/* Settings Grid Display */}
      <div className="settings-grid">
        {sections.map((section) => (
          <div 
            key={section.id} 
            className="settings-card" 
            onClick={() => handleSectionClick(section.id)}
          >
            <div className="settings-icon">{section.icon}</div>
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </div>
        ))}
      </div>

      {/* Dynamic Content Section (Optional) */}
      {/* 
        If you prefer to display content within the same page without navigation,
        you can implement conditional rendering here based on the active section.
        However, in this structure, navigation to different routes is used.
      */}
    </div>
  );
};

export default BranchManagement;
