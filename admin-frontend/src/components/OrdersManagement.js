import React, { useState, useEffect } from 'react';
import { getOrders, updateOrderStatus } from '../api';
import './OrdersManagement.css';

function OrdersManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({});

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadOrders();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const statusOptions = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'];

  if (loading) return <div className="loading">Loading orders...</div>;

  return (
    <div className="orders-management">
      <h2>Orders Management</h2>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <h3>Order #{order._id.slice(-8)}</h3>
                <span className={`status status-${order.status.toLowerCase().replace(' ', '-')}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-customer">
                <p><strong>Customer:</strong> {order.customerName}</p>
                <p><strong>Email:</strong> {order.customerEmail}</p>
                <p><strong>Phone:</strong> {order.customerPhone}</p>
                <p><strong>Address:</strong> {order.customerAddress}</p>
              </div>

              <div className="order-items">
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} x{item.quantity} - ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
              </div>

              {order.specialNotes && (
                <div className="order-notes">
                  <p><strong>Notes:</strong> {order.specialNotes}</p>
                </div>
              )}

              <div className="order-footer">
                <p className="total"><strong>Total:</strong> ₹{order.totalPrice}</p>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="status-select"
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OrdersManagement;
