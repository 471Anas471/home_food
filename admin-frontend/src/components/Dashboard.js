import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>📦 Manage Items</h3>
          <p>Add, edit, remove items and manage inventory</p>
          <a href="/items">Go to Items</a>
        </div>
        <div className="dashboard-card">
          <h3>📋 Orders</h3>
          <p>View all orders and update their status</p>
          <a href="/orders">Go to Orders</a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
