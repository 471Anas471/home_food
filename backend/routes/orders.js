const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

// Create order (public)
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, customerPhone, customerAddress, items, specialNotes } = req.body;

    if (!customerName || !customerEmail || !customerPhone || !customerAddress || !items || items.length === 0) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = new Order({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      items,
      totalPrice,
      specialNotes: specialNotes || ''
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all orders (admin only)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find().populate('items.itemId').sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.itemId');
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (admin only)
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Out for Delivery', 'Delivered', 'Cancelled'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    ).populate('items.itemId');

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
