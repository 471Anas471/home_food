import React, { useState, useEffect } from 'react';
import { getItems, addItem, updateItem, deleteItem, toggleStock } from '../api';
import './ItemsManagement.css';

function ItemsManagement() {
  const [items, setItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'Curry',
    price: '',
    image: null
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await getItems();
      setItems(response.data);
    } catch (error) {
      console.error('Error loading items:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      form.append('name', formData.name);
      form.append('description', formData.description);
      form.append('category', formData.category);
      form.append('price', formData.price);
      if (formData.image) {
        form.append('image', formData.image);
      }

      if (editingId) {
        await updateItem(editingId, form);
      } else {
        await addItem(form);
      }

      setFormData({ name: '', description: '', category: 'Curry', price: '', image: null });
      setShowForm(false);
      setEditingId(null);
      loadItems();
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price,
      image: null
    });
    setEditingId(item._id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteItem(id);
        loadItems();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const handleToggleStock = async (id) => {
    try {
      await toggleStock(id);
      loadItems();
    } catch (error) {
      console.error('Error toggling stock:', error);
    }
  };

  return (
    <div className="items-management">
      <div className="items-header">
        <h2>Manage Items</h2>
        <button className="btn-primary" onClick={() => {
          setShowForm(!showForm);
          setEditingId(null);
          setFormData({ name: '', description: '', category: 'Curry', price: '', image: null });
        }}>
          {showForm ? 'Cancel' : '+ Add Item'}
        </button>
      </div>

      {showForm && (
        <form className="item-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <select name="category" value={formData.category} onChange={handleChange}>
            <option>Biryani</option>
            <option>Curry</option>
            <option>Bread</option>
            <option>Rice</option>
            <option>Dessert</option>
            <option>Drinks</option>
            <option>Other</option>
          </select>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Saving...' : editingId ? 'Update Item' : 'Add Item'}
          </button>
        </form>
      )}

      <div className="items-grid">
        {items.map(item => (
          <div key={item._id} className="item-card">
            {item.image && <img src={item.image} alt={item.name} />}
            <h3>{item.name}</h3>
            <p className="category">{item.category}</p>
            <p className="description">{item.description}</p>
            <p className="price">₹{item.price}</p>
            <div className="item-actions">
              <button
                className={`btn-stock ${item.inStock ? 'in-stock' : 'out-of-stock'}`}
                onClick={() => handleToggleStock(item._id)}
              >
                {item.inStock ? '✓ In Stock' : '✗ Out of Stock'}
              </button>
              <button className="btn-edit" onClick={() => handleEdit(item)}>Edit</button>
              <button className="btn-delete" onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemsManagement;
