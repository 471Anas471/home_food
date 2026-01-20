import React from 'react';
import './OrderTracker.css';

function OrderTracker({ orders, onClose, onCancelOrder }) {
  const statusSteps = ['pending', 'preparing', 'ready_to_receive', 'completed'];

  const getStatusColor = (status) => {
    const colors = {
      pending: '#ff9800',
      preparing: '#2196f3',
      ready_to_receive: '#4caf50',
      completed: '#4caf50',
      cancelled: '#f44336'
    };
    return colors[status] || '#999';
  };

  const getStatusLabel = (status) => {
    const labels = {
      pending: 'Pending',
      preparing: 'Preparing',
      ready_to_receive: 'Ready to Receive',
      completed: 'Completed',
      cancelled: 'Cancelled'
    };
    return labels[status] || status;
  };

  const getCurrentStepIndex = (status) => {
    return statusSteps.indexOf(status) !== -1 ? statusSteps.indexOf(status) : -1;
  };

  return (
    <div className="tracker-overlay">
      <div className="tracker-modal">
        <div className="tracker-header">
          <h2>Your Orders</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <p>No orders yet. Start ordering now!</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const currentStepIndex = getCurrentStepIndex(order.status);
              return (
                <div key={order._id} className="order-card">
                  <div className="order-header">
                    <div>
                      <h3>Order #{order._id.substring(0, 8).toUpperCase()}</h3>
                      <p className="order-date">
                        {new Date(order.createdAt).toLocaleDateString('en-EG', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <span 
                      className="status-badge" 
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusLabel(order.status)}
                    </span>
                  </div>

                  {order.status !== 'cancelled' && order.status !== 'completed' && (
                    <div className="status-timeline">
                      {statusSteps.map((step, index) => (
                        <div
                          key={step}
                          className={`timeline-step ${index <= currentStepIndex ? 'completed' : ''} ${index === currentStepIndex ? 'current' : ''}`}
                        >
                          <div className="step-circle">
                            {index < currentStepIndex && <span>✓</span>}
                            {index === currentStepIndex && <span>●</span>}
                          </div>
                          <p>{getStatusLabel(step)}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="order-details">
                    <div className="detail-row">
                      <span className="label">Total:</span>
                      <span className="value">EGP {order.totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Payment:</span>
                      <span className="value">Cash on Delivery</span>
                    </div>
                    <div className="detail-row">
                      <span className="label">Address:</span>
                      <span className="value">{order.userAddress}</span>
                    </div>

                    <div className="items-list">
                      <p className="items-label">Items:</p>
                      <ul>
                        {order.items.map((item, idx) => (
                          <li key={idx}>
                            {item.name} × {item.quantity} = EGP {(item.price * item.quantity).toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {order.status === 'pending' && (
                    <button 
                      className="btn-cancel-order"
                      onClick={() => onCancelOrder(order._id)}
                    >
                      Cancel Order
                    </button>
                  )}

                  {order.status === 'ready_to_receive' && (
                    <div className="ready-note">
                      ✓ Your order is ready! Please pick it up.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default OrderTracker;
