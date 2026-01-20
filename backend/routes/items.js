const express = require('express');
const Item = require('../models/Item');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Multer configuration for image upload
const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Invalid file type'));
  }
});

// Get all items (public)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single item (public)
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add item (admin only)
router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price } = req.body;

    if (!name || !description || !category || !price) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const item = new Item({
      name,
      description,
      category,
      price,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    await item.save();
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update item (admin only)
router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const { name, description, category, price, inStock } = req.body;
    
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (name) item.name = name;
    if (description) item.description = description;
    if (category) item.category = category;
    if (price) item.price = price;
    if (inStock !== undefined) item.inStock = inStock;
    if (req.file) item.image = `/uploads/${req.file.filename}`;

    item.updatedAt = Date.now();
    await item.save();

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete item (admin only)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Toggle stock status (admin only)
router.patch('/:id/stock', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    item.inStock = !item.inStock;
    await item.save();
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
