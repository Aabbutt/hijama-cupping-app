import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Home.css";
import hijama_pic from "../components/images/hijama-pic.webp";
import knowledge_base from "../components/images/knowledge-base.jpg";
import ourproduct from "../components/images/ourproduct.jpg";
import ourbranch from "../components/images/ourbranch.webp";
import hijamainislam from "../components/images/hijamainislam.jpg";
import reviewimage from "../components/images/reviewimage.png";
import abc from "../components/videos/abc.mp4";

const Home = () => {
  const navigate = useNavigate();

  const handleReadMoreClick = () => {
    navigate("/about");
  };

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "How Much Does Hijama Cost in Islamabad?",
      answer:
        "Hijama Cost Range: In Islamabad, the cost of Hijama therapy ranges between PKR 300 to 500 per cup. The price may vary based on the clinic, the expertise of the practitioner, and the specific type of Hijama treatment being administered.",
    },
    {
      question: "Where is the Centre Located in Rawalpindi?",
      answer:
        "Certainly, our centre is conveniently located in the heart of Saddar, Rawalpindi. Please contact us directly for the exact address and directions.",
    },
  ];

  const reviews = [
    {
      name: "Peter Esser",
      reviewText:
        "I was very impressed by Dr Pavel Zwolak. His knowledge of the various treatment methods is extraordinary.",
      profileImage: "doctor.png",
    },
  ];

  return (
    <div className="home">
      <section className="welcome-section">
        <div class="welcome-container">
          <div class="welcome-left">
            <h1>WELCOME TO HIJAMA CLINIC</h1>
            <p>ISO Certified Hijama Alternative Clinic</p>
            <p>
              UG Healing Center is one of the best and hygienic Hijama Clinics
              in Karachi, Pakistan, providing quality health care services and
              Certified Training for Hijama Cupping Therapy.
            </p>
            <h2>MODERN MEDICAL FACILITIES</h2>
            <p>
              UG Healing Center was established by{" "}
              <strong>Mohammad Usman Ghani</strong>. From an early age, he was
              very aware of the energies surrounding us and had that special
              touch to heal and to understand that we are more than just
              physical humans... Usman Ghani had a keen thirst for knowledge and
              unconsciously knew deep in his heart the mission he had to
              accomplish.
            </p>
            <div className="read-more" onClick={handleReadMoreClick}>
              READ MORE
            </div>
          </div>

          <div class="welcome-right">
            <img src={hijama_pic} alt="Hijama" class="welcome-img" />
          </div>
        </div>
      </section>

      <section className="information">
        <h2>Information on Hijama</h2>
        <div className="info-grid">
          <div
            className="feature feature-square"
            onClick={() => navigate("/HijamaInIslam")}
          >
            <img src={hijamainislam} alt="Hijama in Islam" />
            <h3>Hijama in Islam</h3>
            <p>Wet Cupping (Hijama) is one of the remedies from the...</p>
          </div>
          <div
            className="feature feature-square"
            onClick={() => navigate("/knowledge-base")}
          >
            <img src={knowledge_base} alt="Knowledge Base" />
            <h3>Knowledge Base</h3>
            <p>The Backbone of our Clinic</p>
          </div>
          <div
            className="feature feature-square"
            onClick={() => navigate("/products")}
          >
            <img src={ourproduct} alt="Our Products" />
            <h3>Our Products</h3>
            <p>A list of all available</p>
          </div>
          <div className="feature feature-square">
            <img src={ourbranch} alt="Our Branches" />
            <h3>Our Branches</h3>
            <p>All our staff by department</p>
          </div>
        </div>
      </section>
      <section className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div
              className={`faq ${activeIndex === index ? "active" : ""}`}
              key={index}
            >
              <h3 className="faq-title" onClick={() => toggleFaq(index)}>
                {item.question}
              </h3>
              <p className="faq-text">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonial">
        <h2>Testimonials</h2>
        <div className="testimonial-content">
          <video controls>
            <source src={abc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="testimonial-text">
            <blockquote>
              Done with Hijama, Sunnah of our Badshah Hazrat Muhammad PBUH!!!
              MashaAllah feeling so relaxed, all Muslims should do this Sunnah.
              By Dr Usman Ghani
            </blockquote>
            <cite>Agha Shiraz Bin Saeed</cite>
          </div>
        </div>
      </section>

      <div className="appointment">
        <h2>Book an Appointment for Hijama</h2>
        <p>Call Now +92-332-1366246 and book your schedule for Hijama</p>
        <Link to="/therapist-near-you" className="therapist-near-you">
          Therapist Near You
        </Link>
      </div>

      <section className="review-section">
        <h2 className="review-title">Google Reviews</h2>
        <p className="review-subtitle">
          Hear What Our Customers Have to Say - Testimonials
        </p>
        <p className="review-description">
          Our customers are at the heart of everything we do, and we are
          committed to providing them with one of the best possible care and
          service, and that's why platforms like{" "}
          <span className="highlight">UpTopics publish us in top</span>.
        </p>
        <div className="review-content">
          <span className="review-image">
            <img src={reviewimage} alt="review" />
          </span>
          <div className="review-text">
            <blockquote>
              <p>{reviews[0].reviewText}</p>
            </blockquote>
            <p className="review-author">{reviews[0].name}</p>
          </div>
        </div>
        <a
          href="https://www.google.com/search?q=hijama+center+shaheenabad+gujranwala&rlz=1C1CHBD_enPK1106PK1106&oq=hijama+center+shaheenabad+gujranwala&gs_lcrp=EgZjaHJvbWUyCQgAEEUYORigATIHCAEQIRigAdIBCjE0Mzg5ajBqMTWoAgiwAgE&sourceid=chrome&ie=UTF-8#lrd=0x391f29097d0dfc3f:0xb96ce5d67b080359,1,,,,"
          target="_blank"
          rel="noopener noreferrer"
          className="google-review-button"
        >
          All Google Reviews
        </a>
        <p className="google-review-count">Based on 206 Google Reviews</p>
      </section>
    </div>
  );
};

export default Home;
