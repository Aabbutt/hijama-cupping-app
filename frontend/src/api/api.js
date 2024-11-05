// src/api/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000'; // Update with your backend URL

// User API
export const fetchUsers = () => axios.get(`${API_URL}/users`);
export const addUser = (user) => axios.post(`${API_URL}/users`, user);
export const editUser = (userId, user) => axios.put(`${API_URL}/users/${userId}`, user);
export const deleteUser = (userId) => axios.delete(`${API_URL}/users/${userId}`);

// Appointment API
export const fetchAppointments = () => axios.get(`${API_URL}/appointments`);
export const addAppointment = (appointment) => axios.post(`${API_URL}/appointments`, appointment);
export const editAppointment = (appointmentId, appointment) => axios.put(`${API_URL}/appointments/${appointmentId}`, appointment);
export const deleteAppointment = (appointmentId) => axios.delete(`${API_URL}/appointments/${appointmentId}`);

//session api
export const fetchsession = () => axios.get(`${API_URL}/session`);
export const addsession = (session) => axios.post(`${API_URL}/session`,session);
export const editsession = (sessionid, session) => axios.put(`${API_URL}/session/${sessionid}`, session);
export const deletesession = (sessionid) => axios.delete(`${API_URL}/session/${sessionid}`);

//scheduleapi
export const fetchschedule = () => axios.get(`${API_URL}/schedule `);
export const addschedule  = (schedule ) => axios.post(`${API_URL}/schedule `,schedule );
export const eidtschedule  = (scheduleid, schedule ) => axios.put(`${API_URL}/schedule/${scheduleid}`, schedule);
export const deleteschedule = (scheduleid) => axios.delete(`${API_URL}/schedule/${scheduleid}`);

//review api
export const fetchreview = () => axios.get(`${API_URL}/review `);
export const addreview  = (review ) => axios.post(`${API_URL}/review `,review );
export const eidtreview  = (reviewid, review ) => axios.put(`${API_URL}/review/${reviewid}`, review);
export const deletereview = (review) => axios.delete(`${API_URL}/review/${reviewid}`);

//invoice api
export const fetchinvoice = () => axios.get(`${API_URL}/invoice `);
export const addinvoice  = (invoice ) => axios.post(`${API_URL}/invoice `,invoice );
export const editinvoice  = (invoiceid, invoice ) => axios.put(`${API_URL}/invoice/${invoiceid}`, invoice);
export const deleteinvoice = (invoice) => axios.delete(`${API_URL}/invoice/${invoice}`);

//inventoryapi
export const fetchinventory = () => axios.get(`${API_URL}/inventory `);
export const addinventory  = (invoice ) => axios.post(`${API_URL}/inventory `,inventory );
export const editinventory  = (inventoryid, invoice ) => axios.put(`${API_URL}/inventory/${inventoryid}`,inventory);
export const deleteinventory = (inventory) => axios.delete(`${API_URL}/inventory/${inventory}`);

//appointment api
export const fetchappointment = () => axios.get(`${API_URL}/appointment `);
export const addappointment  = (appointment ) => axios.post(`${API_URL}/appointment `,appointment );
export const editappointment  = (appointmentid, appointment ) => axios.put(`${API_URL}/appointment/${appointmentid}`,appointment);
export const deleteappointment = (appointment) => axios.delete(`${API_URL}/appointment/${appointment}`);
