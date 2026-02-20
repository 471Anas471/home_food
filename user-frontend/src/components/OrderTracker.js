import React, { useState } from 'react';
import ReviewSection from './ReviewSection';
import './OrderTracker.css';

function OrderTracker({ orders, onClose, onCancelOrder }) {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const statusSteps = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered'];

  const getStatusIndex = (status) => {
    return statusSteps.indexOf(status);
  };

  const canCancelOrder = (status) => {
    return !['Delivered', 'Cancelled'].includes(status);
  };

  const handleCommentAdded = () => {
    // Refresh the component data
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="order-tracker-modal">
      <div className="tracker-overlay" onClick={onClose}></div>
      <div className="tracker-container">
        <div className="tracker-header">
          <h2>📦 Order Tracking</h2>
          <button className="btn-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet. 🍽️</p>
          </div>
        ) : (
          <div className="orders-container">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div
                  className="order-header"
                  onClick={() => setExpandedOrderId(
                    expandedOrderId === order._id ? null : order._id
                  )}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="order-summary">
                    <h3>Order #{order._id.substring(0, 8)}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  <div className="order-status-badge">
                    <span className={`status-badge status-${order.status.toLowerCase().replace(/ /g, '-')}`}>
                      {order.status}
                    </span>
                    <span className="toggle-icon">
                      {expandedOrderId === order._id ? '▼' : '▶'}
                    </span>
                  </div>
                </div>

                {expandedOrderId === order._id && (
                  <div className="order-details">
                    {/* Status Progress */}
                    <div className="status-progress">
                      <h4>Progress</h4>
                      <div className="progress-bar">
                        {statusSteps.map((step, index) => (
                          <div key={step} className="progress-step">
                            <div className={`step-dot ${index <= getStatusIndex(order.status) ? 'completed' : ''}`}>
                              {index < getStatusIndex(order.status) ? '✓' : ''}
                            </div>
                            <span className={`step-label ${index <= getStatusIndex(order.status) ? 'active' : ''}`}>
                              {step}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="order-items">
                      <h4>Items</h4>
                      <div className="items-list">
                        {order.items.map((item, index) => (
                          <div key={index} className="order-item">
                            <span className="item-name">{item.name}</span>
                            <span className="item-qty">x{item.quantity}</span>
                            <span className="item-price">EGP {(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Info */}
                    <div className="delivery-info">
                      <h4>Delivery Details</h4>
                      <div className="info-row">
                        <span className="label">Address:</span>
                        <span className="value">{order.customerAddress}</span>
                      </div>
                      <div className="info-row">
                        <span className="label">Phone:</span>
                        <span className="value">{order.customerPhone}</span>
                      </div>
                      {order.specialNotes && (
                        <div className="info-row">
                          <span className="label">Notes:</span>
                          <span className="value">{order.specialNotes}</span>
                        </div>
                      )}
                    </div>

                    {/* Total Price */}
                    <div className="order-total">
                      <span className="label">Total:</span>
                      <span className="total-amount">EGP {order.totalPrice.toFixed(2)}</span>
                    </div>

                    {/* Cancel Button */}
                    {canCancelOrder(order.status) && (
                      <button
                        className="btn-cancel-order"
                        onClick={() => onCancelOrder(order._id)}
                      >
                        ✕ Cancel Order
                      </button>
                    )}

                    {/* Review Section */}
                    <ReviewSection
                      key={`${order._id}-${refreshKey}`}
                      orderId={order._id}
                      customerEmail={order.customerEmail}
                      customerName={order.customerName}
                      onCommentAdded={handleCommentAdded}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderTracker;
