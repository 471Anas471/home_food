import React from 'react';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <h1>🍽️ Home Food</h1>
          <p className="tagline">Fresh Food Delivered to Your Door</p>
        </div>
        
        {user && (
          <div className="navbar-user">
            <div className="user-info">
              <p className="user-email">{user.email}</p>
              <p className="user-phone">{user.phone}</p>
            </div>
            <button className="btn-logout" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
