import React from 'react';
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
import './App.css';

function App() {
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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/therapist-near-you" element={<TherapistNearYou />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
