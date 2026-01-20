const express = require('express');
const User = require('../models/User');
const router = express.Router();

// User signup
router.post('/signup', async (req, res) => {
  try {
    const { email, phone, address } = req.body;

    // Validate Egyptian phone number
    const egyptianPhoneRegex = /^(\+20|0)[0-9]{9,10}$/;
    if (!egyptianPhoneRegex.test(phone)) {
      return res.status(400).json({ 
        message: 'Invalid Egyptian phone number. Format: 01001234567 or +201001234567' 
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ email, phone, address });
    await user.save();

    res.status(201).json({ 
      message: 'Signup successful',
      user: { email: user.email, phone: user.phone }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// User signin
router.post('/signin', async (req, res) => {
  try {
    const { email, phone } = req.body;

    const user = await User.findOne({ email, phone });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or phone' });
    }

    res.json({ 
      message: 'Signin successful',
      user: { email: user.email, phone: user.phone, address: user.address }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;