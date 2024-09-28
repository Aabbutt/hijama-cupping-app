// src/services/appointmentService.js
import axios from 'axios';

export const getAppointments = async () => {
  try {
    const response = await axios.get('/api/appointments');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
};
