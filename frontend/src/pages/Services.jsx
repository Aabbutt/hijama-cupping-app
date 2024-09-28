import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <div className="services-page">
      <h1>Our Services</h1>
      <div className="services-list">
        <div className="service-item">
          <img src="/images/service1.png" alt="Service 1" />
          <h3>Service 1</h3>
          <p>Description of Service 1</p>
        </div>
        <div className="service-item">
          <img src="/images/service2.png" alt="Service 2" />
          <h3>Service 2</h3>
          <p>Description of Service 2</p>
        </div>
        <div className="service-item">
          <img src="/images/service3.png" alt="Service 3" />
          <h3>Service 3</h3>
          <p>Description of Service 3</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
