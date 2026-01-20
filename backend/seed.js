const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const Admin = require('./models/Admin');

dotenv.config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: 'admin' });
    if (existingAdmin) {
      console.log('Admin already exists');
      return;
    }

    // Create default admin
    const admin = new Admin({
      username: 'admin',
      password: 'admin123',
      email: 'admin@homefood.com'
    });

    await admin.save();
    console.log('Admin created successfully');
    console.log('Username: admin');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedAdmin();
