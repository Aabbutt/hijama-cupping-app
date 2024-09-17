import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLayout from './components/UserLayout'; // New User Layout that handles Header and Footer
import Home from './pages/Home';
import About from './pages/About';
import KnowledgeBase from './pages/KnowledgeBase';
import Products from './pages/Products';
import Contact from './pages/Contact';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import TherapistNearYou from './pages/TherapistNearYou';
import Appointment from './pages/Appointment';
import JoinAsPractitioner from './pages/JoinAsPractitioner'; // Corrected syntax error
import AdminLayout from './admin/AdminLayout'; // Admin Layout (Header + Sidebar)
import Dashboard from './admin/Dashboard'; // Admin Dashboard Component
import ManageUsers from './admin/ManageUsers'; // Admin Users Management
import ManageProducts from './admin/ManageProducts'; // Admin Products Management
import ManageAppointments from './admin/ManageAppointments'; // Admin Appointments Management
import Personalization from './components/Personalization'; // AI Personalization Component
import SmartBooking from './components/SmartBooking'; // Smart Booking Component
import PrivateRoute from './components/PrivateRoute'; // Admin Route Protection
import AdminLogin from './admin/AdminLogin'; // Separate admin login page
import { FaRobot, FaCalendarAlt } from 'react-icons/fa'; // Floating action buttons
import './App.css'; // Global CSS Styles

function App() {
  const [showPersonalization, setShowPersonalization] = useState(false); // Toggle AI modal
  const [showSmartBooking, setShowSmartBooking] = useState(false); // Toggle Smart Booking modal

  // Toggle functions for modals
  const togglePersonalization = () => {
    setShowPersonalization(!showPersonalization);
  };

  const toggleSmartBooking = () => {
    setShowSmartBooking(!showSmartBooking);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* User Side Routes */}
          <Route path="/" element={<UserLayout />}> {/* UserLayout includes Header and Footer */}
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="knowledge-base/hijama-in-islam" element={<KnowledgeBase.HijamaInIslam />} />
            <Route path="knowledge-base/hijama-modern-world" element={<KnowledgeBase.HijamaModernWorld />} />
            <Route path="knowledge-base/hijama-history" element={<KnowledgeBase.HijamaHistory />} />
            <Route path="knowledge-base/benefits-of-hijama" element={<KnowledgeBase.BenefitsOfHijama />} />
            <Route path="knowledge-base/hijama-sunnah-dates" element={<KnowledgeBase.HijamaSunnahDates />} />
            <Route path="knowledge-base/sunnah-points" element={<KnowledgeBase.SunnahPoints />} />
            <Route path="knowledge-base/hijama-course" element={<KnowledgeBase.HijamaCourse />} />
            <Route path="products/hijama-cups" element={<Products.HijamaCups />} />
            <Route path="products/hijama-pumps" element={<Products.HijamaPumps />} />
            <Route path="products/hijama-kits" element={<Products.HijamaKits />} />
            <Route path="products/honey" element={<Products.Honey />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="therapist-near-you" element={<TherapistNearYou />} />
            <Route path="appointment" element={<Appointment />} />
            <Route path="join-as-practitioner" element={<JoinAsPractitioner />} /> {/* Corrected route */}
          </Route>

          {/* Admin Panel Routes (Protected by PrivateRoute) */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminLayout />
              </PrivateRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="manage-products" element={<ManageProducts />} />
            <Route path="manage-appointments" element={<ManageAppointments />} />
          </Route>

          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>

        {/* Floating AI-Powered Personalization Button */}
        <button className="ai-button" onClick={togglePersonalization} aria-label="AI-Powered Therapy">
          <FaRobot size={20} />
        </button>

        {/* Floating Smart Booking Button */}
        <button className="booking-button" onClick={toggleSmartBooking} aria-label="Smart Booking System">
          <FaCalendarAlt size={20} />
        </button>

        {/* Modals */}
        {showPersonalization && (
          <div className="modal" onClick={togglePersonalization}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={togglePersonalization}>&times;</span>
              <Personalization />
            </div>
          </div>
        )}

        {showSmartBooking && (
          <div className="modal" onClick={toggleSmartBooking}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={toggleSmartBooking}>&times;</span>
              <SmartBooking />
            </div>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
