
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const username = 'Saeed';        // change this if needed
    const plainPassword = 'Saeed123'; // change this to a secure password

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log('⚠️ Admin already exists');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(plainPassword, salt);

    // Create admin
    const newAdmin = new Admin({
      username,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log(`✅ Admin user created successfully: ${username}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Error creating admin:', err.message);
    process.exit(1);
  }
};

createAdmin();
