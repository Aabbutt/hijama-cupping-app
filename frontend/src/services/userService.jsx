// src/services/userService.js
import axios from 'axios';

const API_URL = 'https://api.yourservice.com/users';

export const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
