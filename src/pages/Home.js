import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate('/about');
  };

  return (
    <div className="home">
      <section className="welcome-section">
        <div className="welcome-text">
          <h1>WELCOME TO HIJAMA CLINIC</h1>
          <p>ISO Certified Hijama Alternative Clinic</p>
          <p>
            UG Healing Center is one of the best and hygienic Hijama Clinics in Karachi, Pakistan which provide quality health care services and Certified Training for Hijama Cupping Therapy.
          </p>
          <h2>MODERN MEDICAL FACILITIES</h2>
          <p>
            UG Healing Center was established by <strong>Mohammad Usman Ghani</strong> from an early age he was very aware of the energies surrounding us and had that special touch to heal and to understand that we are more than just physical humans... Usman Ghani had a keen thirst of knowledge, he unconsciously knew deep in his heart the mission he had to accomplish...
          </p>
          <button className="read-more" onClick={handleReadMoreClick}>READ MORE</button>
        </div>
        <div className="facebook-widget">
          <iframe 
            src="https://www.facebook.com/share/PWdGxF4JedgEqzes/?mibextid=qi2Omg"
            width="300"
            height="400"
            style={{border: "none", overflow: "hidden"}}
            scrolling="no"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            title="Facebook Page Profile"
          ></iframe>
        </div>
      </section>

      <section className="features">
        <div className="feature feature-square">
          <img src="/images/knowledge-base.png" alt="Knowledge Base" />
          <h3>Knowledge Base</h3>
          <p>The Backbone of our Clinic</p>
        </div>
        <div className="feature feature-square">
          <img src="/images/blog.png" alt="Blogs" />
          <h3>Blogs</h3>
          <p>Call us or fill in a form</p>
        </div>
        <div className="feature feature-square">
          <img src="/images/products.png" alt="Our Products" />
          <h3>Our Products</h3>
          <p>A list of all available</p>
        </div>
        <div className="feature feature-square">
          <img src="/images/branches.png" alt="Our Branches" />
          <h3>Our Branches</h3>
          <p>All our staff by department</p>
        </div>
      </section>

      <section className="information">
        <h2>Information on Hijama</h2>
        <div className="info-grid">
          <div className="info-item info-square">
            <img src="/images/hijama-in-islam.png" alt="Hijama in Islam" />
            <h3>Hijama in Islam</h3>
            <p>Wet Cupping (Hijama) is one of the remedies from the...</p>
          </div>
          <div className="info-item info-square">
            <img src="/images/modern-world.png" alt="Hijama & Modern World" />
            <h3>Hijama & Modern World</h3>
            <p>These days, people are looking to alternative therapies...</p>
          </div>
          <div className="info-item info-square">
            <img src="/images/benefits.png" alt="Benefits of Hijama" />
            <h3>Benefits of Hijama</h3>
            <p>The strengthening and stimulating effects of Hijama therapy...</p>
          </div>
          <div className="info-item info-square">
            <img src="/images/course.png" alt="Hijama Course" />
            <h3>Hijama Course</h3>
            <p>This course will be conducted based on a combination of...</p>
          </div>
        </div>
        <button className="view-all">View All</button>
      </section>

      <section className="testimonial">
        <h2>Testimonials</h2>
        <div className="testimonial-content">
          <video controls>
            <source src="/videos/testimonial.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="testimonial-text">
            <blockquote>Done with Hijama, Sunnah of our Badshah Hazrat Muhammad PBUH!!! MashaAllah feeling so relax, all Muslims should do this Sunnah. By Dr Usman Ghani</blockquote>
            <cite>Agha Shiraz Bin Saeed</cite>
          </div>
        </div>
      </section>

      <section className="appointment">
        <h2>Book an Appointment for Hijama</h2>
        <p>Call Now +92-332-1366246 and book your schedule for Hijama</p>
        <button className="therapist-near-you">Book an Appointment Here</button>
      </section>
    </div>
  );
};

export default Home;
