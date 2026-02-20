import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Auth from './components/Auth';
import ItemBrowser from './components/ItemBrowser';
import Cart from './components/Cart';
import OrderTracker from './components/OrderTracker';
import { createOrder, getUserOrders, cancelOrder } from './api';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [showOrderTracker, setShowOrderTracker] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const userEmail = localStorage.getItem('userEmail');
    const userPhone = localStorage.getItem('userPhone');
    const userAddress = localStorage.getItem('userAddress');
    
    if (userEmail && userPhone) {
      setUser({ email: userEmail, phone: userPhone, address: userAddress });
      fetchUserOrders(userEmail);
    }
    setLoading(false);
  }, []);

  const fetchUserOrders = async (email) => {
    try {
      const response = await getUserOrders(email);
      setUserOrders(response.data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const handleAuthSuccess = (userData) => {
    setUser(userData);
    fetchUserOrders(userData.email);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userAddress');
    setUser(null);
    setCartItems([]);
    setUserOrders([]);
  };

  const handleAddToCart = (item) => {
    const existingItem = cartItems.find(i => i._id === item._id);
    
    if (existingItem) {
      setCartItems(cartItems.map(i =>
        i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(cartItems.filter((_, i) => i !== index));
  };

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveFromCart(index);
    } else {
      setCartItems(cartItems.map((item, i) =>
        i === index ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const handleCheckout = async (checkoutData) => {
    try {
      const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

      const orderData = {
        customerName: checkoutData.customerName,
        customerEmail: user.email,
        customerPhone: user.phone,
        customerAddress: checkoutData.address || user.address,
        items: cartItems.map(item => ({
          itemId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        totalPrice,
        specialNotes: checkoutData.notes,
        paymentMethod: 'cash_on_delivery'
      };

      const response = await createOrder(orderData);
      setCartItems([]);
      setUserOrders([...userOrders, response.data]);
      setShowOrderTracker(true);
      alert('✅ Order placed successfully! Order ID: ' + response.data._id);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('❌ Failed to place order: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder(orderId);
        fetchUserOrders(user.email);
        alert('Order cancelled successfully');
      } catch (error) {
        alert('Failed to cancel order');
      }
    }
  };

  if (loading) {
    return <div className="app"><div className="loading">Loading...</div></div>;
  }

  if (!user) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="app">
      <Navbar user={user} onLogout={handleLogout} />
      
      <div className="main-container">
        <ItemBrowser onAddToCart={handleAddToCart} />
        <div className="sidebar">
          <Cart
            items={cartItems}
            onRemove={handleRemoveFromCart}
            onQuantityChange={handleQuantityChange}
            onCheckout={handleCheckout}
            user={user}
          />
          
          {userOrders.length > 0 && (
            <div className="orders-summary">
              <h3>Your Orders ({userOrders.length})</h3>
              <button 
                className="btn-view-orders"
                onClick={() => setShowOrderTracker(true)}
              >
                View All Orders
              </button>
            </div>
          )}
        </div>
      </div>

      {cartItems.length > 0 && (
        <div className="cart-badge">
          {cartItems.length} items
        </div>
      )}

      {showOrderTracker && (
        <OrderTracker 
          orders={userOrders}
          onClose={() => setShowOrderTracker(false)}
          onCancelOrder={handleCancelOrder}
        />
      )}
    </div>
  );
}

export default App;
