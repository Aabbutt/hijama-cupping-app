import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLayout.css';
const AdminLayout = () => {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate('/admin-info'); // Ensure this route is defined
  };

  // FAQ state and toggle function
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  const faqItems = [
    {
      question: 'How to Manage Appointments?',
      answer: 'You can manage appointments by going to the Appointments section in the admin panel where you can view, edit, or cancel appointments.',
    },
    {
      question: 'How to Add New Therapists?',
      answer: 'Navigate to the Therapists section and click on "Add Therapist" to fill out the necessary information.',
    },
    // Add more FAQs as needed
  ];

  const reviews = [
    {
      name: "Admin User",
      reviewText: "The dashboard is very intuitive and easy to use!",
      profileImage: "admin-user.png" // Update with the correct image path
    },
    // Additional reviews can be added here
  ];

  // Debugging output
  useEffect(() => {
    console.log("AdminLayout rendered");
  }, []);

  return (
    <div className="admin-layout">
      <section className="welcome-section">
        <div className="welcome-text">
          <h1>ADMIN DASHBOARD</h1>
          <p>Manage Your Hijama Clinic Effectively</p>
          <p>Welcome to the Admin Dashboard where you can oversee all operations, manage appointments, and enhance patient care.</p>
          <h2>KEY ADMINISTRATIVE FUNCTIONS</h2>
          <p>Efficiently manage your clinic with our streamlined admin interface. From appointment scheduling to staff management, all in one place.</p>
          <button className="read-more" onClick={handleReadMoreClick}>READ MORE</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="feature feature-square">
          <img src="/images/manage-appointments.png" alt="Manage Appointments" />
          <h3>Manage Appointments</h3>
          <p>View and modify appointments easily.</p>
        </div>
        <div className="feature feature-square">
          <img src="/images/therapists.png" alt="Manage Therapists" />
          <h3>Manage Therapists</h3>
          <p>Update therapist details and schedules.</p>
        </div>
        <div className="feature feature-square">
          <img src="/images/reports.png" alt="Reports" />
          <h3>View Reports</h3>
          <p>Access detailed reports on clinic performance.</p>
        </div>
        <div className="feature feature-square">
          <img src="/images/settings.png" alt="Settings" />
          <h3>Settings</h3>
          <p>Customize your clinic settings.</p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div className={`faq ${activeIndex === index ? 'active' : ''}`} key={index}>
              <h3 className="faq-title" onClick={() => toggleFaq(index)}>
                {item.question}
              </h3>
              <p className="faq-text">{activeIndex === index ? item.answer : null}</p> {/* Show answer only if active */}
            </div>
          ))}
        </div>
      </section>

      {/* Review Section */}
      <section className="review-section">
        <h2 className="review-title">User Feedback</h2>
        <p className="review-description">We value feedback from our admin users to improve our services.</p>
        <div className="review-content">
          {reviews.map((review, index) => (
            <div className="review-text" key={index}>
              <blockquote>
                <p>{review.reviewText}</p>
              </blockquote>
              <p className="review-author">{review.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminLayout;
