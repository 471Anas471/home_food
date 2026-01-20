import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const adminUsername = localStorage.getItem('adminUsername');

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>🍜 Home Food Admin</h1>
      </div>
      <ul className="navbar-menu">
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/items">Items</a></li>
        <li><a href="/orders">Orders</a></li>
      </ul>
      <div className="navbar-user">
        <span>{adminUsername}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Navbar;
