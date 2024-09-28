// src/admin/api/userApi.js
const API_URL = 'https://api.example.com/users'; // Replace with your actual API endpoint

// Fetch users from the API
export const fetchUsers = async () => {
  try {
    const response = await fetch(API_URL);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch users: ' + response.statusText);
    }

    // Return the JSON data
    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error; // Rethrow the error for further handling
  }
};

// You can also add other user-related API functions here, e.g., addUser, deleteUser, updateUser
