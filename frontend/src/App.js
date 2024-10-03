import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
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
import ManageProducts from './admin/ManageProducts/ManageProducts'; // Admin Products Management
import ManageAppointments from './admin/ManageAppointments'; // Admin Appointments Management
import Personalization from './components/Personalization'; // AI Personalization Component
import SmartBooking from './components/SmartBooking'; // Smart Booking Component
import PrivateRoute from './components/PrivateRoute'; // Admin Route Protection
import AdminLogin from './admin/AdminLogin'; // Separate admin login page
import { AuthProvider } from './components/AuthContext';
import ManagePractitioners from './admin/ManagePractitioners';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import ManageDiscounts from './admin/ManageDiscounts';
import ManageNotifications from './admin/ManageNotifications';
import ManageSettings from './admin/ManageSettings'; // Import the new Settings Page
import ManageBilling from './admin/ManageBilling';
import ManageSubscriptions from './admin/ManageSubscriptions';
import ManageRoomScheduling from './admin/ManageRoomScheduling';
import BranchManagement from './admin/BranchManagement';
import ShortLoginModal from './components/ShortLoginModal'; // Import the short login modal for re-confirmation
import { FaRobot, FaCalendarAlt } from 'react-icons/fa'; // Floating action buttons
import './App.css'; // Global CSS Styles

function App() {
  const [showPersonalization, setShowPersonalization] = useState(false); // Toggle AI modal
  const [showSmartBooking, setShowSmartBooking] = useState(false); // Toggle Smart Booking modal
  const [showShortLogin, setShowShortLogin] = useState(false); // Toggle short login modal
  const [isVerified, setIsVerified] = useState(false); // Track if admin is re-verified
  const [users, setUsers] = useState([]); // Users state for admin
  const [appointments, setAppointments] = useState([]); // Appointments state for admin
  const [products, setProducts] = useState([]); // Products state for admin
  const [practitioners, setPractitioners] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [schedules, setSchedules] = useState([]);const [branches, setBranches] = useState([
    {
      id: 1,
      name: 'Main Branch',
      address: '123 Healing St, Wellness City',
      contact: '+1-234-567-8901',
      operatingHours: '9 AM - 6 PM',
      latitude: 37.7749,
      longitude: -122.4194,
      clientVisits: 150,
      revenue: 5000,
    },
    // Add more branch objects as needed
  ]);

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

  // Function to handle successful re-confirmation login
  const handleShortLoginSuccess = () => {
    setIsVerified(true);
    setShowShortLogin(false);
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
  useEffect(() => {
    const storedPractitioners = localStorage.getItem('adminPractitioners');
    if (storedPractitioners) {
      setPractitioners(JSON.parse(storedPractitioners));
    }
  }, []);

  // Save practitioners to localStorage whenever practitioners state changes
  useEffect(() => {
    localStorage.setItem('adminPractitioners', JSON.stringify(practitioners));
  }, [practitioners]);

  // Other useEffect hooks for users and appointments...

  // Handle adding, editing, and deleting practitioners
  const handleAddPractitioner = (newPractitioner) => {
    const practitionerId = practitioners.length > 0 ? Math.max(...practitioners.map(p => p.id)) + 1 : 1;
    setPractitioners([...practitioners, { id: practitionerId, ...newPractitioner }]);
  };

  const handleEditPractitioner = (updatedPractitioner) => {
    setPractitioners(practitioners.map(practitioner => (practitioner.id === updatedPractitioner.id ? updatedPractitioner : practitioner)));
  };

  const handleDeletePractitioner = (practitionerId) => {
    setPractitioners(practitioners.filter(practitioner => practitioner.id !== practitionerId));
  };
    //Discount
    const handleAddDiscount = (newDiscount) => {
      setDiscounts((prevDiscounts) => [...prevDiscounts, newDiscount]);
    };
  
    const handleEditDiscount = (updatedDiscount) => {
      setDiscounts((prevDiscounts) =>
        prevDiscounts.map((discount) =>
          discount.id === updatedDiscount.id ? updatedDiscount : discount
        )
      );
    };
  
    const handleDeleteDiscount = (id) => {
      setDiscounts((prevDiscounts) => prevDiscounts.filter((discount) => discount.id !== id));
    };
    //Notification 
    const handleAddNotification = (newNotification) => {
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    };
  
    const handleEditNotification = (updatedNotification) => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === updatedNotification.id ? updatedNotification : notification
        )
      );
    };
  
    const handleDeleteNotification = (id) => {
      setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== id));
    };
    //Invoice
    const handleAddInvoice = (newInvoice) => {
      setInvoices((prevInvoices) => [...prevInvoices, newInvoice]);
    };
  
    const handleEditInvoice = (updatedInvoice) => {
      setInvoices((prevInvoices) =>
        prevInvoices.map((invoice) =>
          invoice.id === updatedInvoice.id ? updatedInvoice : invoice
        )
      );
    };
  
    const handleDeleteInvoice = (id) => {
      setInvoices((prevInvoices) => prevInvoices.filter((invoice) => invoice.id !== id));
    };
    const handleAddSubscription = (newSubscription) => {
      setSubscriptions((prevSubscriptions) => [...prevSubscriptions, newSubscription]);
    };
  
    const handleEditSubscription = (updatedSubscription) => {
      setSubscriptions((prevSubscriptions) =>
        prevSubscriptions.map((subscription) =>
          subscription.id === updatedSubscription.id ? updatedSubscription : subscription
        )
      );
    };
  
    const handleDeleteSubscription = (id) => {
      setSubscriptions((prevSubscriptions) => prevSubscriptions.filter((subscription) => subscription.id !== id));
    };
    //Room
    const handleAddSchedule = (newSchedule) => {
      setSchedules((prevSchedules) => [...prevSchedules, newSchedule]);
    };
  
    const handleEditSchedule = (updatedSchedule) => {
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.id === updatedSchedule.id ? updatedSchedule : schedule
        )
      );
    };
  
    const handleDeleteSchedule = (id) => {
      setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== id));
    };
    const handleAddBranch = (newBranch) => {
      setBranches((prevBranches) => [...prevBranches, newBranch]);
    };
  
    const handleEditBranch = (updatedBranch) => {
      setBranches((prevBranches) =>
        prevBranches.map((branch) =>
          branch.id === updatedBranch.id ? updatedBranch : branch
        )
      );
    };
  
    const handleDeleteBranch = (id) => {
      setBranches((prevBranches) => prevBranches.filter((branch) => branch.id !== id));
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
            <Route path="products" element={<Products />} />
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

        {/* Short Login Modal for Manage Settings */}
        {showShortLogin && (
          <ShortLoginModal
            onClose={() => setShowShortLogin(false)}
            onSuccess={handleShortLoginSuccess}
          />
        )}
      </div>

      <AuthProvider>
        <AdminProvider>
          <Routes>
            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={<PrivateRoute><AdminLayout /></PrivateRoute>}
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="support" element={<Support />} />
            </Route>
          </Routes>
                <Routes>
      <Route path="/admin/manage-settings" element={<ManageSettings />} />
        {/* Manage Users Route */}
        <Route
          path="manage-users"
          element={<ManageUsers users={users} onAddUser={handleAddUser} onEdit={handleEdit} onDelete={handleDelete} />}
        />
        {/* Manage Products Routes */}
        <Route
          path="manage-products"
          element={
            <ManageProducts
              products={products}
              onAddProduct={handleAddProduct}
              onEditProduct={handleEditProduct}
              onDeleteProduct={handleDeleteProduct}
            />
          }
        />
        <Route
          path="manage-products/add"
          element={<AddProduct onAddProduct={handleAddProduct} products={products} />}
        />
        <Route
          path="manage-products/edit/:id"
          element={<EditProduct onUpdate={handleEditProduct} products={products} />}
        />
        {/* Manage Appointments Route */}
        <Route
          path="manage-appointments"
          element={
            <ManageAppointments
              appointments={appointments}
              onAddAppointment={handleAddAppointment}
              onEditAppointment={handleEditAppointment}
              onDeleteAppointment={handleDeleteAppointment}
            />
          }
        />
        <Route path="manage-practitioners" element={<ManagePractitioners practitioners={practitioners} onAddPractitioner={handleAddPractitioner} onEditPractitioner={handleEditPractitioner} onDeletePractitioner={handleDeletePractitioner} />} />
        <Route path="/manage-discounts" element={<ManageDiscounts discounts={discounts} onAddDiscount={handleAddDiscount} onEditDiscount={handleEditDiscount} onDeleteDiscount={handleDeleteDiscount}/>}/>
        <Route path="/manage-notifications" element={
          <ManageNotifications
            notifications={notifications}
            onAddNotification={handleAddNotification}
            onEditNotification={handleEditNotification}
            onDeleteNotification={handleDeleteNotification}
          />}/>
          <Route path="/manage-billing" element={
          <ManageBilling
            invoices={invoices}
            onAddInvoice={handleAddInvoice}
            onEditInvoice={handleEditInvoice}
            onDeleteInvoice={handleDeleteInvoice}
          />}/>
          <Route path="/manage-subscriptions" element={
          <ManageSubscriptions
            subscriptions={subscriptions}
            onAddSubscription={handleAddSubscription}
            onEditSubscription={handleEditSubscription}
            onDeleteSubscription={handleDeleteSubscription}
          />}/>
          <Route path="/manage-room-scheduling" element={
          <ManageRoomScheduling
            schedules={schedules}
            onAddSchedule={handleAddSchedule}
            onEditSchedule={handleEditSchedule}
            onDeleteSchedule={handleDeleteSchedule}
          />}/>
          <Route path="/admin/manage-branches" element={
          <BranchManagement
            branch={branches[0]} // Pass the first branch or modify as needed
            onAddBranch={handleAddBranch}
            onEditBranch={handleEditBranch}
            onDeleteBranch={handleDeleteBranch}
          />}/>
      </Routes>
        </AdminProvider>
      </AuthProvider>
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
