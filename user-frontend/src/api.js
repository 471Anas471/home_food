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

// Comments API
export const createComment = (commentData) => {
  return axios.post(`${API_URL}/comments`, commentData);
};

export const getOrderComments = (orderId) => {
  return axios.get(`${API_URL}/comments/order/${orderId}`);
};

export const updateComment = (commentId, commentData) => {
  return axios.patch(`${API_URL}/comments/${commentId}`, commentData);
};

export const deleteComment = (commentId, customerEmail) => {
  return axios.delete(`${API_URL}/comments/${commentId}`, {
    data: { customerEmail }
  });
};

export default api;
