import React, { useState } from 'react';
import './TherapistNearYou.css';

const therapists = [
  {
    name: 'Abu Abdullah',
    address: 'Abdullah Alhjama Islamia Markaz Kasi Road Haji Ghibli Chowk Quetta, Balochistan, 87300',
    phone: '+923357551490',
    hours: '9:00 AM - 8:00 PM',
    days: 'Sun, Mon, Tues, Wed, Thur, Fri, Sat',
    position: { lat: 30.1798, lng: 66.975 }
  },
  {
    name: 'Ata Ullah Shakoor',
    address: 'House# 536/45-B Street # 11 Bukhari Colony, Nawan Shaher, Multan, Punjab, 60000',
    phone: '+923009632402',
    hours: '9:00 AM - 8:00 PM',
    days: 'Sun, Mon, Tues, Wed, Thur, Fri, Sat',
    position: { lat: 30.1575, lng: 71.5249 }
  },
  {
    name: 'Dr. Imran',
    address: 'Dr. Asif Memorial Hospital, E60/2, Opp. Saint Paul School, Near Hyderi Chowk, Satellite Town, Rawalpindi, Punjab, 46000',
    phone: '+923335729253',
    hours: '9:00 AM - 8:00 PM',
    days: 'Sun, Mon, Tues, Wed, Thur, Fri, Sat',
    position: { lat: 33.6844, lng: 73.0479 }
  },
  {
    name: 'Dr. Junaid Khan (Ph.D)',
    address: '#63, 65, 66 First Floor, Mosque Road, Saddar, Karachi, Sindh, 74200',
    phone: '+923213742583',
    hours: '9:00 AM - 8:00 PM',
    days: 'Sun, Mon, Tues, Wed, Thur, Fri, Sat',
    position: { lat: 24.8615, lng: 67.0099 }
  },
  {
    name: 'Dr. Khalid Mahmood',
    address: 'Khalid Plaza, Near City Hospital, Faisalabad, Punjab, 38000',
    phone: '+923217652830',
    hours: '9:00 AM - 8:00 PM',
    days: 'Sun, Mon, Tues, Wed, Thur, Fri, Sat',
    position: { lat: 31.4504, lng: 73.135 }
  },
];

const TherapistNearYou = () => {
  const [location, setLocation] = useState('');
  const [mapUrl, setMapUrl] = useState("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3648.754469576067!2d90.41111131529768!3d23.810517684564!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b899b7b777ff%3A0xa8f5a1b3a1a4e48a!2sMap%20Embeds!5e0!3m2!1sen!2sbd!4v1646612416842!5m2!1sen!2sbd");

  const handleLocate = () => {
    if (location.trim()) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=YOUR_GOOGLE_MAPS_API_KEY`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'OK') {
            const { lat, lng } = data.results[0].geometry.location;
            setMapUrl(`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${lat},${lng}`);
          } else {
            alert('Location not found. Please enter a valid location.');
          }
        })
        .catch(error => {
          console.error('Error fetching geocoding data:', error);
          alert('There was an error locating the address.');
        });
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapUrl(`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${latitude},${longitude}`);
        },
        (error) => {
          console.error('Error getting current location:', error);
          alert('Unable to retrieve your location. Please try again.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleDirectionsClick = (position) => {
    const { lat, lng } = position;
    setMapUrl(`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${lat},${lng}`);
  };

  return (
    <div className="therapist-near-you-page">
      <div className="map-container">
        <div className="location-search">
          <input
            type="text"
            placeholder="Search Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <div className="button-group">
            <button type="button" onClick={handleLocate}>Locate</button>
            <button type="button" onClick={handleCurrentLocation}>Current Location</button>
          </div>
        </div>
        <div className="map">
          <iframe
            src={mapUrl}
            allowFullScreen=""
            loading="lazy"
            title="Clinic Location"
          ></iframe>
        </div>
      </div>
      <div className="therapist-list">
        {therapists.map((therapist, index) => (
          <div className="therapist-item" key={index}>
            <h3>{therapist.name}</h3>
            <p>{therapist.address}</p>
            <p><strong>Phone:</strong> {therapist.phone}</p>
            <p><strong>Hours:</strong> {therapist.hours}</p>
            <p><strong>Days:</strong> {therapist.days}</p>
            <button className="directions-button" onClick={() => handleDirectionsClick(therapist.position)}>Directions</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistNearYou;
