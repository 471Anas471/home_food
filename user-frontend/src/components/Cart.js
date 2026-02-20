import React, { useState } from 'react';
import './Cart.css';

function Cart({ items, onRemove, onQuantityChange, onCheckout, user }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState(user?.address || '');
  const [notes, setNotes] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [error, setError] = useState('');

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!customerName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!address.trim()) {
      setError('Please enter delivery address');
      return;
    }

    onCheckout({ 
      customerName: customerName.trim(),
      address: address.trim(), 
      notes 
    });
    setShowCheckout(false);
    setCustomerName('');
    setAddress('');
    setNotes('');
  };

  if (items.length === 0) {
    return (
      <div className="cart">
        <h2>Your Cart</h2>
        <div className="empty-cart">
          <p>🛒 Your cart is empty</p>
          <small>Add items to get started!</small>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart ({items.length})</h2>

      <div className="cart-items">
        {items.map((item, index) => (
          <div key={index} className="cart-item">
            {item.image && (
              <img src={item.image} alt={item.name} className="item-image" />
            )}
            <div className="item-info">
              <h4>{item.name}</h4>
              <p className="price">EGP {item.price}</p>
              <div className="quantity-control">
                <button 
                  type="button"
                  onClick={() => onQuantityChange(index, item.quantity - 1)}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button 
                  type="button"
                  onClick={() => onQuantityChange(index, item.quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <div className="item-total">
              <p>EGP {(item.price * item.quantity).toFixed(2)}</p>
              <button 
                className="btn-remove" 
                onClick={() => onRemove(index)}
                type="button"
                aria-label="Remove item"
              >
                ✕ Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>EGP {totalPrice.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Delivery Fee:</span>
          <span>EGP 0</span>
        </div>
        <div className="summary-row">
          <span>Payment Method:</span>
          <span>Cash on Delivery</span>
        </div>
        <div className="summary-row total">
          <span>Total:</span>
          <span>EGP {totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {!showCheckout ? (
        <button 
          className="btn-checkout" 
          onClick={() => setShowCheckout(true)}
          type="button"
        >
          Proceed to Checkout
        </button>
      ) : (
        <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
          {error && <div className="error-message">⚠️ {error}</div>}

          <div className="form-group">
            <label htmlFor="customerName">Full Name *</label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Delivery Address *</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Special Notes (Optional)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special requests or instructions?"
              rows="2"
            />
          </div>

          <div className="payment-info">
            <h4>Payment Method</h4>
            <div className="payment-option">
              <input type="radio" id="cod" name="payment" value="cash" defaultChecked disabled />
              <label htmlFor="cod">💵 Cash on Delivery</label>
            </div>
            <p className="payment-note">Pay when your order arrives</p>
          </div>

          <div className="checkout-buttons">
            <button type="submit" className="btn-place-order">
              Place Order - EGP {totalPrice.toFixed(2)}
            </button>
            <button 
              type="button" 
              className="btn-cancel" 
              onClick={() => setShowCheckout(false)}
            >
              Back to Cart
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default Cart;
