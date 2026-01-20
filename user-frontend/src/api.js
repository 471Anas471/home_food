import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// User Auth
export const userSignup = (email, phone, address) =>
  api.post('/user/signup', { email, phone, address });

export const userSignin = (email, phone) =>
  api.post('/user/signin', { email, phone });

// Items
export const getItems = () => api.get('/items');
export const getItem = (id) => api.get(`/items/${id}`);

// Orders
export const createOrder = (orderData) => api.post('/orders', orderData);
export const getUserOrders = (email) => api.get(`/orders/user/${email}`);
export const getOrder = (id) => api.get(`/orders/${id}`);
export const cancelOrder = (id) => api.patch(`/orders/${id}/cancel`);

export default api;
