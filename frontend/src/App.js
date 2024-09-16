import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
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
import JoinAsPractitioner from './pages/JoinAsPractitioner';
import Personalization from './components/Personalization'; // AI Personalization Component
import SmartBooking from './components/SmartBooking'; // Smart Booking Component
import { FaRobot, FaCalendarAlt } from 'react-icons/fa'; // Icons for buttons
import './App.css'; // Import CSS for styling buttons and modals

function App() {
  const [showPersonalization, setShowPersonalization] = useState(false); // Toggle AI modal
  const [showSmartBooking, setShowSmartBooking] = useState(false); // Toggle Smart Booking modal

  // Toggle functions
  const togglePersonalization = () => {
    setShowPersonalization(!showPersonalization);
  };

  const toggleSmartBooking = () => {
    setShowSmartBooking(!showSmartBooking);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/knowledge-base/hijama-in-islam" element={<KnowledgeBase.HijamaInIslam />} />
          <Route path="/knowledge-base/hijama-modern-world" element={<KnowledgeBase.HijamaModernWorld />} />
          <Route path="/knowledge-base/hijama-history" element={<KnowledgeBase.HijamaHistory />} />
          <Route path="/knowledge-base/benefits-of-hijama" element={<KnowledgeBase.BenefitsOfHijama />} />
          <Route path="/knowledge-base/hijama-sunnah-dates" element={<KnowledgeBase.HijamaSunnahDates />} />
          <Route path="/knowledge-base/sunnah-points" element={<KnowledgeBase.SunnahPoints />} />
          <Route path="/knowledge-base/hijama-course" element={<KnowledgeBase.HijamaCourse />} />
          <Route path="/products/hijama-cups" element={<Products.HijamaCups />} />
          <Route path="/products/hijama-pumps" element={<Products.HijamaPumps />} />
          <Route path="/products/hijama-kits" element={<Products.HijamaKits />} />
          <Route path="/products/honey" element={<Products.Honey />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join-as-practitioner" element={<JoinAsPractitioner />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/therapist-near-you" element={<TherapistNearYou />} />
          <Route path="/appointment" element={<Appointment />} />
        </Routes>
        <Footer />

        {/* Floating AI-Powered Personalization Button */}
        <button className="ai-button" onClick={togglePersonalization} aria-label="AI-Powered Therapy">
          <FaRobot size={20} />
        </button>

        {/* Floating Smart Booking Button */}
        <button className="booking-button" onClick={toggleSmartBooking} aria-label="Smart Booking System">
          <FaCalendarAlt size={20} />
        </button>

        {/* Modal for AI-Powered Personalization */}
        {showPersonalization && (
          <div className="modal" onClick={togglePersonalization}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={togglePersonalization}>&times;</span>
              <Personalization />
            </div>
          </div>
        )}

        {/* Modal for Smart Booking System */}
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
