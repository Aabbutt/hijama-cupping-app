import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <section className="intro">
        <div className="intro-text">
          <h1>Expert Hijama Treatment</h1>
          <p>We follow a holistic approach to healthcare</p>
          <p>Cupping (Hijama in Arabic) is an ancient, holistic method for the treatment of a variety of diseases</p>
          <button className="book-appointment">Book Appointment</button>
        </div>
        <img src="/images/treatment.jpg" alt="Hijama Treatment" />
      </section>

      <section className="services">
        <h2>Services</h2>
        <p>Hijama is a type of wet cupping that is frequently practiced in many Muslim countries...</p>
        <div className="service-items">
          <div className="service-item">
            <img src="/images/dry-cupping.jpg" alt="Dry Cupping" />
            <button>Book Appointment</button>
          </div>
          <div className="service-item">
            <img src="/images/running-cupping.jpg" alt="Running Cupping" />
            <button>Book Appointment</button>
          </div>
          <div className="service-item">
            <img src="/images/bleeding-cupping.jpg" alt="Bleeding Cupping" />
            <button>Book Appointment</button>
          </div>
        </div>
      </section>

      <section className="video">
        <h2>Watch the video to see a practical example of how cupping is performed</h2>
        <img src="/images/blood-cupping.jpg" alt="Blood Cupping Video" />
      </section>

      <section className="about">
        <h2>About Us</h2>
        <p>A dedicated service with the core mission to help...</p>
        <button>Book an Appointment</button>
        <button>About Us</button>
        <img src="/images/about-us.jpg" alt="About Us" />
      </section>

      <section className="testimonials">
        <h2>Our Patients Say</h2>
        <div className="testimonial-items">
          <div className="testimonial-item">
            <p>Neque porro quisquam est qui dolorem ipsum...</p>
            <h3>Joshua Jones</h3>
          </div>
          <div className="testimonial-item">
            <p>Neque porro quisquam est qui dolorem ipsum...</p>
            <h3>Paula Mora</h3>
          </div>
          <div className="testimonial-item">
            <p>Neque porro quisquam est qui dolorem ipsum...</p>
            <h3>Rhonda</h3>
          </div>
        </div>
      </section>

      <section className="contact">
        <h2>Get in touch with your first booking</h2>
        <input type="text" placeholder="Enter your name" />
        <input type="email" placeholder="Enter your email" />
        <button>Submit</button>
      </section>
    </div>
  );
};

export default Home;
