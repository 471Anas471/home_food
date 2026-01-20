import React, { useState } from 'react';
import './Cart.css';

function Cart({ items, onRemove, onQuantityChange, onCheckout, user }) {
  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState(user?.address || '');
  const [notes, setNotes] = useState('');

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!address.trim()) {
      alert('Please enter delivery address');
      return;
    }
    onCheckout({ address: address.trim(), notes });
    setShowCheckout(false);
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
                <button onClick={() => onQuantityChange(index, item.quantity - 1)}>−</button>
                <span>{item.quantity}</span>
                <button onClick={() => onQuantityChange(index, item.quantity + 1)}>+</button>
              </div>
            </div>
            <div className="item-total">
              <p>EGP {(item.price * item.quantity).toFixed(2)}</p>
              <button className="btn-remove" onClick={() => onRemove(index)}>
                Remove
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
        <button className="btn-checkout" onClick={() => setShowCheckout(true)}>
          Proceed to Checkout
        </button>
      ) : (
        <form className="checkout-form" onSubmit={handleCheckoutSubmit}>
          <div className="form-group">
            <label>Delivery Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              rows="3"
              required
            />
          </div>

          <div className="form-group">
            <label>Special Notes (Optional)</label>
            <textarea
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
