const express = require('express');
const Comment = require('../models/Comment');
const Order = require('../models/Order');
const router = express.Router();

// Create comment/review for an order
router.post('/', async (req, res) => {
  try {
    const { orderId, customerEmail, customerName, rating, comment } = req.body;

    // Validation
    if (!orderId || !customerEmail || !customerName || !rating || !comment) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    if (comment.trim().length < 5) {
      return res.status(400).json({ message: 'Comment must be at least 5 characters' });
    }

    // Check if order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if comment already exists for this order
    const existingComment = await Comment.findOne({ orderId, customerEmail });
    if (existingComment) {
      return res.status(400).json({ message: 'You have already reviewed this order' });
    }

    const newComment = new Comment({
      orderId,
      customerEmail,
      customerName,
      rating,
      comment: comment.trim()
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error('Comment creation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get comments for an order
router.get('/order/:orderId', async (req, res) => {
  try {
    const comments = await Comment.find({ orderId: req.params.orderId })
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('orderId', 'customerName')
      .sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update comment (only by the reviewer)
router.patch('/:commentId', async (req, res) => {
  try {
    const { rating, comment, customerEmail } = req.body;

    const existingComment = await Comment.findById(req.params.commentId);
    if (!existingComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Verify the user is the one who created the comment
    if (existingComment.customerEmail !== customerEmail) {
      return res.status(403).json({ message: 'Not authorized to update this comment' });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    if (comment && comment.trim().length < 5) {
      return res.status(400).json({ message: 'Comment must be at least 5 characters' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.commentId,
      {
        rating: rating || existingComment.rating,
        comment: comment ? comment.trim() : existingComment.comment,
        updatedAt: Date.now()
      },
      { new: true }
    );

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete comment (only by the reviewer)
router.delete('/:commentId', async (req, res) => {
  try {
    const { customerEmail } = req.body;

    const comment = await Comment.findById(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.customerEmail !== customerEmail) {
      return res.status(403).json({ message: 'Not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(req.params.commentId);
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;