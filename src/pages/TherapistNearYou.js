import React, { useState } from 'react';
import './TherapistNearYou.css';

const clinics = [
  {
    name: "Abu Abdullah",
    address: "Abdullah Alhijama Islamia Markaz Kasi Road Haji Ghibi Chowk, Quetta, Balochistan, 87300",
    phone: "+923357551490",
    timings: "9:00 AM - 8:00 PM",
    days: "Sun, Mon, Tues, Wed, Thur, Fri, Sat",
    position: { lat: 30.1798, lng: 66.975 }
  },
  {
    name: "Ata Ullah Shakoor",
    address: "House# S36/45-B Street # 11 Bukhari Colony, Nawan Shaher, Multan, Punjab, 60000",
    phone: "+923009634302",
    timings: "9:00 AM - 8:00 PM",
    days: "Sun, Mon, Tues, Wed, Thur, Fri, Sat",
    position: { lat: 30.1575, lng: 71.5249 }
  },
  {
    name: "Dr. Imran",
    address: "Dr. Asif Memorial Hospital, E60/2, Opp. Saint Paul School, Near Hyderi Chowk, Satellite Town, Rawalpindi, Punjab, 46000",
    phone: "+923335729253",
    timings: "9:00 AM - 8:00 PM",
    days: "Sun, Mon, Tues, Wed, Thur, Fri, Sat",
    position: { lat: 33.6844, lng: 73.0479 }
  },
  {
    name: "Dr. Junaid Khan (Ph.D)",
    address: "#63,65,66 First Floor, Mosque Road, Frazer Town, Bangalore, 560005",
    phone: "+919886822737",
    timings: "9:00 AM - 8:00 PM",
    days: "Sun, Mon, Tues, Wed, Thur, Fri, Sat",
    position: { lat: 12.9848, lng: 77.6058 }
  },
];

const TherapistNearYou = () => {
  const [selectedClinic, setSelectedClinic] = useState(null);

  return (
    <div className="therapist-near-you">
      <header>
        <h1>THERAPIST NEAR YOU</h1>
        <p>Find a Hijama Clinic near you</p>
      </header>
      <nav>
        <ul>
          <li>PAKISTAN</li>
          <li>AFGHANISTAN</li>
          <li>AMERICA</li>
          <li>KUWAIT</li>
          <li>CANADA</li>
          <li>INDIA</li>
          <li>FRANCE</li>
        </ul>
      </nav>
      <section className="location-search">
        <input type="text" placeholder="Search Location" />
        <button>Locate</button>
      </section>
      <div className="map-container">
        <div className="map-title">Clinic Location</div>
        <div id="map">
          <iframe
            src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${selectedClinic ? `${selectedClinic.position.lat},${selectedClinic.position.lng}` : 'Karachi,Pakistan'}`}
            title="Clinic Location Map"
            allowFullScreen
          ></iframe>
        </div>
        <div className="clinic-list">
          {clinics.map((clinic, index) => (
            <div
              key={index}
              className={`clinic-item ${selectedClinic === clinic ? 'active' : ''}`}
              onClick={() => setSelectedClinic(clinic)}
            >
              <h3>{clinic.name}</h3>
              <p>{clinic.address}</p>
              <p>{clinic.phone}</p>
              <p>{clinic.timings}</p>
              <p>{clinic.days}</p>
              <p><a href={`https://www.google.com/maps/dir/?api=1&destination=${clinic.position.lat},${clinic.position.lng}`} target="_blank" rel="noopener noreferrer">Directions</a></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TherapistNearYou;
