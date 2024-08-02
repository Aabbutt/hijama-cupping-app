import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await axios.get('/api/profile');
      setProfile(response.data);
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>My Health Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      <p>Health Issues: {profile.healthIssues}</p>
      {/* Add more profile details */}
    </div>
  );
};

export default Profile;
