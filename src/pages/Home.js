import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([
    {
      name: "Irfan Muddassir",
      profileImage: "profile1.jpg",
      reviewText: "It is really good initiative to connect with healthcare professionals. If you feel a need for help then helpline is there to take care of it. Overall very good experience.",
      rating: 4,
    },
    {
      name: "Umair Ali",
      profileImage: "profile2.jpg",
      reviewText: "I got late on my appointment, but after 10 minutes, the doctor called me and prescribed medicines, which is far better than appointing physically and waiting!",
      rating: 4,
    },
    {
      name: "Misbah Khan",
      profileImage: "profile3.jpg",
      reviewText: "My first appointment today. It was a very smooth experience and the skin specialist was very helpful and professional. The facility is also very good.",
      rating: 5,
    },
    {
      name: "Sara Ahmed",
      profileImage: "profile4.jpg",
      reviewText: "The service at UG Healing Center is top-notch. The staff is very cooperative, and the doctors are highly knowledgeable.",
      rating: 5,
    },
    {
      name: "Faisal Raza",
      profileImage: "profile5.jpg",
      reviewText: "Excellent service. The appointment was quick and the doctor addressed all my concerns. Highly recommended!",
      rating: 5,
    },
    {
      name: "Ayesha Khan",
      profileImage: "profile6.jpg",
      reviewText: "I had a wonderful experience at UG Healing Center. The staff is very friendly and the environment is very welcoming.",
      rating: 5,
    },
    {
      name: "Hamza Ali",
      profileImage: "profile7.jpg",
      reviewText: "Very satisfied with the service. The doctors are very professional and the staff is very helpful.",
      rating: 4,
    },
    {
      name: "Nida Baloch",
      profileImage: "profile8.jpg",
      reviewText: "The best healthcare center I have visited so far. The staff is very courteous and the doctors are very attentive.",
      rating: 5,
    },
    {
      name: "Ahmed Zubair",
      profileImage: "profile9.jpg",
      reviewText: "Great service and very professional staff. The doctors are very knowledgeable and the appointments are always on time.",
      rating: 5,
    },
    {
      name: "Rabia Noor",
      profileImage: "profile10.jpg",
      reviewText: "I am very happy with the service. The doctors are very caring and the staff is very efficient.",
      rating: 5,
    }
  ]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const handleReadMoreClick = () => {
    navigate('/about');
  };

  const handleReviewSubmit = (event) => {
    event.preventDefault();
    const reviewText = event.target.review.value;
    const rating = event.target.rating.value;
    const newReview = { name: "Anonymous", profileImage: "profile_default.jpg", reviewText, rating };
    setReviews([...reviews, newReview]);
    event.target.reset();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); // Change review every 5 seconds

    return () => clearInterval(interval);
  }, [reviews.length]);

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

      <section className="reviews">
        <h2>Reviews</h2>
        <div className="reviews-container">
          <form className="review-form" onSubmit={handleReviewSubmit}>
            <label htmlFor="review">Your Review:</label>
            <textarea id="review" name="review" required></textarea>
            
            <label htmlFor="rating">Rating:</label>
            <select id="rating" name="rating" required>
              <option value="5">5 - Excellent</option>
              <option value="4">4 - Very Good</option>
              <option value="3">3 - Good</option>
              <option value="2">2 - Fair</option>
              <option value="1">1 - Poor</option>
            </select>
            
            <button type="submit">Submit Review</button>
          </form>

          {reviews.length > 0 && (
            <div className="submitted-reviews">
              <div className="review-card">
                <img src={reviews[currentReviewIndex].profileImage} alt={reviews[currentReviewIndex].name} />
                <h3>{reviews[currentReviewIndex].name}</h3>
                <p>{reviews[currentReviewIndex].reviewText}</p>
                <div className="stars">
                  {'★'.repeat(reviews[currentReviewIndex].rating)}
                  {'☆'.repeat(5 - reviews[currentReviewIndex].rating)}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
