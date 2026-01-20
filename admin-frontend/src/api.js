import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL
});

// Add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (username, password) => 
  api.post('/auth/login', { username, password });

// Items
export const getItems = () => api.get('/items');
export const getItem = (id) => api.get(`/items/${id}`);
export const addItem = (formData) => api.post('/items', formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const updateItem = (id, formData) => api.put(`/items/${id}`, formData, {
  headers: { 'Content-Type': 'multipart/form-data' }
});
export const deleteItem = (id) => api.delete(`/items/${id}`);
export const toggleStock = (id) => api.patch(`/items/${id}/stock`);

// Orders
export const getOrders = () => api.get('/orders');
export const getOrder = (id) => api.get(`/orders/${id}`);
export const updateOrderStatus = (id, status) => 
  api.patch(`/orders/${id}/status`, { status });

export default api;
