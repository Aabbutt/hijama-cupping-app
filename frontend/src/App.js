import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserLayout from './components/UserLayout'; // User Layout that handles Header and Footer
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
import AdminLayout from './admin/AdminLayout'; // Admin Layout (Header + Sidebar)
import AdminDashboard from './admin/AdminDashboard';
import Support from './admin/Support';
import { AdminProvider } from './components/AdminContext';
import ManageUsers from './admin/ManageUsers'; // Admin Users Management
import ManageProducts from './admin/ManageProducts'; // Admin Products Management
import ManageAppointments from './admin/ManageAppointments'; // Admin Appointments Management
import Personalization from './components/Personalization'; // AI Personalization Component
import SmartBooking from './components/SmartBooking'; // Smart Booking Component
import PrivateRoute from './components/PrivateRoute'; // Admin Route Protection
import AdminLogin from './admin/AdminLogin'; // Separate admin login page
import { AuthProvider } from './components/AuthContext';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import ManageSettings from './admin/ManageSettings'; // Import the new Settings Page
import { FaRobot, FaCalendarAlt } from 'react-icons/fa'; // Floating action buttons
import './App.css'; // Global CSS Styles

function App() {
  const [showPersonalization, setShowPersonalization] = useState(false); // Toggle AI modal
  const [showSmartBooking, setShowSmartBooking] = useState(false); // Toggle Smart Booking modal
  const [users, setUsers] = useState([]); // Users state for admin
  const [appointments, setAppointments] = useState([]); // Appointments state for admin
  const [products, setProducts] = useState([]); // Products state for admin

  // Load users from localStorage on initial render
  useEffect(() => {
    const storedUsers = localStorage.getItem('adminUsers');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Save users to localStorage whenever users state changes
  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(users));
  }, [users]);

  // Load appointments from localStorage on initial render
  useEffect(() => {
    const storedAppointments = localStorage.getItem('adminAppointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  // Save appointments to localStorage whenever appointments state changes
  useEffect(() => {
    localStorage.setItem('adminAppointments', JSON.stringify(appointments));
  }, [appointments]);

  // Load products from localStorage on initial render
  useEffect(() => {
    const storedProducts = localStorage.getItem('adminProducts');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Save products to localStorage whenever products state changes
  useEffect(() => {
    localStorage.setItem('adminProducts', JSON.stringify(products));
  }, [products]);

  // Toggle functions for modals
  const togglePersonalization = () => {
    setShowPersonalization(!showPersonalization);
  };

  const toggleSmartBooking = () => {
    setShowSmartBooking(!showSmartBooking);
  };

  // User management handlers
  const handleAddUser = (newUser) => {
    const userId = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1; // Unique ID assignment
    setUsers([...users, { id: userId, ...newUser }]); // Add new user
  };

  const handleEdit = (updatedUser) => {
    setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Appointment management handlers
  const handleAddAppointment = (newAppointment) => {
    const appointmentId = appointments.length > 0 ? Math.max(...appointments.map(app => app.id)) + 1 : 1;
    setAppointments([...appointments, { id: appointmentId, ...newAppointment }]);
  };

  const handleEditAppointment = (updatedAppointment) => {
    setAppointments(appointments.map(app => (app.id === updatedAppointment.id ? updatedAppointment : app)));
  };

  const handleDeleteAppointment = (appointmentId) => {
    setAppointments(appointments.filter(app => app.id !== appointmentId));
  };

  // Product management handlers
  const handleAddProduct = (newProduct) => {
    const productId = products.length > 0 ? Math.max(...products.map(prod => prod.id)) + 1 : 1;
    setProducts([...products, { id: productId, ...newProduct }]);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(products.map(prod => (prod.id === updatedProduct.id ? updatedProduct : prod)));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter(prod => prod.id !== productId));
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* User Side Routes */}
          <Route path="/" element={<UserLayout />}>
            {/* UserLayout includes Header and Footer */}
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
            <Route path="join-as-practitioner" element={<JoinAsPractitioner />} />
          </Route>
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
              <span className="close-button" onClick={togglePersonalization}>
                &times;
              </span>
              <Personalization />
            </div>
          </div>
        )}

        {showSmartBooking && (
          <div className="modal" onClick={toggleSmartBooking}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <span className="close-button" onClick={toggleSmartBooking}>
                &times;
              </span>
              <SmartBooking />
            </div>
          </div>
        )}
      </div>

      <AuthProvider>
        <AdminProvider>
          <Routes>
            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route path="/admin" element={<PrivateRoute><AdminLayout /></PrivateRoute>}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="support" element={<Support />} /> 
      <Route path="manage-settings" element={<ManageSettings />} />

            </Route>
          </Routes>
        </AdminProvider>
      </AuthProvider>
      <Routes>
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
       <Routes>
{/* Manage Users Route */}
<Route path="manage-users" element={<ManageUsers users={users} onAddUser={handleAddUser} onEdit={handleEdit} onDelete={handleDelete} />} />
       </Routes>
       <Routes>
      { /* Manage Products Routes */}
<Route path="manage-products" element={<ManageProducts products={products} onAddProduct={handleAddProduct} onEditProduct={handleEditProduct} onDeleteProduct={handleDeleteProduct} />} />
<Route path="manage-products/add" element={<AddProduct onAddProduct={handleAddProduct} products={products} />} />
<Route path="manage-products/edit/:id" element={<EditProduct onUpdate={handleEditProduct} products={products} />} />
       </Routes>
       <Routes>
{/* Manage Appointments Route */}
<Route path="manage-appointments" element={<ManageAppointments appointments={appointments} onAddAppointment={handleAddAppointment} onEditAppointment={handleEditAppointment} onDeleteAppointment={handleDeleteAppointment} />} />
       </Routes>
    </Router>
  );
}

export default App;
