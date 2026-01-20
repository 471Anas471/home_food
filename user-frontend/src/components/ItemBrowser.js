import React, { useState, useEffect } from 'react';
import { getItems } from '../api';
import './ItemBrowser.css';

function ItemBrowser({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      setLoading(true);
      const response = await getItems();
      setItems(response.data);
    } catch (error) {
      console.error('Error loading items:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'Biryani', 'Curry', 'Bread', 'Rice', 'Dessert', 'Drinks', 'Other'];

  const filteredItems = items.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const searchMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && searchMatch && item.inStock;
  });

  if (loading) return <div className="loading">Loading items...</div>;

  return (
    <div className="item-browser">
      <div className="browser-header">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="category-filter">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="items-grid">
        {filteredItems.length === 0 ? (
          <p>No items available</p>
        ) : (
          filteredItems.map(item => (
            <div key={item._id} className="item-card">
              {item.image && <img src={item.image} alt={item.name} />}
              <h3>{item.name}</h3>
              <p className="category">{item.category}</p>
              <p className="description">{item.description}</p>
              <p className="price">₹{item.price}</p>
              <button
                className="btn-add-to-cart"
                onClick={() => onAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ItemBrowser;
