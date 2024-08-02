import React from 'react';
import './Testimonials.css';

const Testimonials = () => {
  return (
    <div className="testimonials-page">
      <h1>What Our Patients Say</h1>
      <div className="testimonials-list">
        <div className="testimonial-item">
          <p>"Neque porro quisquam est qui dolorem ipsum..."</p>
          <h3>Joshua Jones</h3>
        </div>
        <div className="testimonial-item">
          <p>"Neque porro quisquam est qui dolorem ipsum..."</p>
          <h3>Paula Mora</h3>
        </div>
        <div className="testimonial-item">
          <p>"Neque porro quisquam est qui dolorem ipsum..."</p>
          <h3>Rhonda</h3>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
