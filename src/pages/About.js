import React from 'react';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-intro">
        <h1>ABOUT</h1>
        <p>We are a modern Hijama Clinic</p>
      </div>
      <div className="about-content">
        <div className="about-paragraph">
          <p>UG Healing Center is one of the leading ISO Certified Hijama Center in Karachi Pakistan which provides quality health care services and Certified Training for Hijama Cupping Therapy...</p>
        </div>
        <div className="about-paragraph">
          <p>UG Healing Center was established by Mohammad Usman Ghani. From an early age, he was very aware of the energies surrounding us and had that special touch to heal and to understand that we are more than just physical humans... Usman Ghani had a keen thirst for knowledge. He unconsciously knew deep in his heart the mission he had to accomplish. Fortunately, by the Grace of Almighty Allah, at the beginning of 2008, his thirst for knowledge led Usman to the path of Alternative Medicine & Mind Sciences, including Cupping Therapy (AL-HIJAMA), Hypnosis, EFT, and Acupressure. These are ways of Spiritual Healing that most people don't know about, although it's their birthright.</p>
        </div>
        <div className="about-paragraph">
          <p>UG Healing Center provides quality health care services and Certified Training for Hijama Cupping Therapy. It provides therapeutic ways to deal with various problems and issues by conducting seminars and workshops for people who need help at any stage or who are suffering from diseases, whether Physical, Emotional, Mental, or Spiritual. We believe that every human being should have a chance to develop and learn about their spiritual sources by coming back to the real self in an Islamic way. The core concept of living should be in a clean energy environment that will lead to perfect harmony and a peaceful surrounding. UG Healing Center provides the chance for the above to happen by providing the door for enlightenment. Being a person with positive energy as a first step is a must, followed by being a great healer with no ego. This is the community we aim to establish not just in Pakistan but in the whole world.</p>
        </div>
        <div className="about-paragraph">
          <p>We are committed to assured quality health service to our patients and compliance to requirements through continual improvement in our Quality Management System.</p>
        </div>
      </div>
      <div className="appointment">
        <h2>Book an Appointment for Hijama</h2>
        <p>Call Now +92-332-1366246 and book your schedule for Hijama</p>
        <button className="therapist-near-you">Therapist Near You</button>
      </div>
    </div>
  );
};

export default About;
