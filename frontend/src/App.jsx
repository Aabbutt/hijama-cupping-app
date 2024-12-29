import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Products from "./pages/Products";
import Appointment from "./pages/Appointment";
import JoinAsPractitioner from "./pages/JoinAsPractitioner";
import Settings from "./pages/Settings";
import PrivateRoute from "./components/PrivateRoute";
import "./App.css";

function MainContent({ children }) {
  const location = useLocation();
  
  // Define which routes need full width or specific padding
  const fullWidthRoutes = ['/', '/products'];
  const withPaddingRoutes = ['/profile/settings', '/about', '/contact'];
  
  const getMainContentClass = () => {
    if (fullWidthRoutes.includes(location.pathname)) {
      return 'main-content full-width';
    }
    if (withPaddingRoutes.includes(location.pathname)) {
      return 'main-content with-padding';
    }
    return 'main-content';
  };

  return (
    <main className={getMainContentClass()}>
      {children}
    </main>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <MainContent>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/products" element={<Products />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/join-as-practitioner" element={<JoinAsPractitioner />} />
            <Route
              path="/profile/settings"
              element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              }
            />
          </Routes>
        </MainContent>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 