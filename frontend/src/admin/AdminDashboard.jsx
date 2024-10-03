import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ShortLoginModal from '../components/ShortLoginModal'; // Import ShortLoginModal
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [showShortLogin, setShowShortLogin] = useState(false); // State to control the ShortLoginModal visibility
  const [isVerified, setIsVerified] = useState(false); // Track if the user is verified
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Handle click event for "Settings"
  const handleSettingsClick = () => {
    if (!isVerified) {
      // If not verified, show the modal
      setShowShortLogin(true);
    } else {
      // If already verified, navigate directly to settings
      navigate('/admin/manage-settings');
    }
  };

  // Handle successful re-verification (ShortLoginModal success)
  const handleShortLoginSuccess = () => {
    setIsVerified(true); // Mark user as verified
    setShowShortLogin(false); // Close the modal
    navigate('/admin/manage-settings'); // Navigate to the settings page after successful verification
  };

  return (
    <div className="admin-dashboard">
      <section className="welcome-section">
        <div className="welcome-text">
          <h1>Welcome, Admin</h1>
          <p>Manage Your Clinic's Data and Users Efficiently</p>
          <h2>Admin Dashboard Overview</h2>
          <p>Here you can monitor activities and maintain the overall functionality of the clinic.</p>
          <Link to="/admin/manage-branches" className="btn-manage-branches"> Manage Branches </Link>

        </div>
      </section>

      <section className="admin-features">
        {/* Client Health Insights - Update to New Path */}
        <Link to="/client-health-insights" className="feature feature-square">
          <img src="/images/client-health-insights.png" alt="Client Health Insights" />
          <h3>Client Health Insights</h3>
          <p>Monitor and manage client health profiles, treatment history, and post-therapy feedback.</p>
        </Link>

        {/* Therapy Kit Inventory - Update to New Path */}
        <Link to="/therapy-kit-inventory" className="feature feature-square">
          <img src="/images/therapy-kit-inventory.png" alt="Therapy Kit Inventory" />
          <h3>Therapy Kit Inventory</h3>
          <p>Oversee Hijama therapy kits, cupping tools, and inventory management.</p>
        </Link>

        {/* Holistic Treatment Tracker - Update to New Path */}
        <Link to="/holistic-treatment-tracker" className="feature feature-square">
          <img src="/images/holistic-treatment-tracker.png" alt="Holistic Treatment Tracker" />
          <h3>Holistic Treatment Tracker</h3>
          <p>Track and manage the progress of ongoing treatments and client preferences.</p>
        </Link>

        {/* Updated Settings Button */}
        <button onClick={handleSettingsClick} className="feature feature-square">
          <img src="/images/settings.png" alt="Settings" />
          <h3>Settings</h3>
          <p>Adjust system settings and preferences</p>
        </button>
      </section>

      <section className="admin-info">
        <h2>Administrative Tools</h2>
        <div className="info-grid">
          <div className="info-item info-square">
            <img src="/images/user-reports.png" alt="User Reports" />
            <h3>User Reports</h3>
            <p>Generate detailed user activity reports</p>
          </div>
          <div className="info-item info-square">
            <img src="/images/system-logs.png" alt="System Logs" />
            <h3>System Logs</h3>
            <p>Review system activity and error logs</p>
          </div>
        </div>
        <button className="view-all">View All Tools</button>
      </section>

      <div className="admin-support">
        <h2>Admin Support</h2>
        <p>If you encounter issues, contact technical support at +92-332-XXXXXXX.</p>
        <Link to="/admin-support" className="admin-support">Contact Support</Link>
      </div>

      {/* Short Login Modal for Settings Access */}
      {showShortLogin && (
        <ShortLoginModal
          onClose={() => setShowShortLogin(false)}
          onSuccess={handleShortLoginSuccess} // Trigger success handler
        />
      )}
    </div>
  );
};

export default AdminDashboard;
