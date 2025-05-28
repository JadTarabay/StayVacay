import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Admin from './models/Admin.js'; // Adjust path if needed

const MONGO_URI = 'mongodb+srv://jadtarabay19:h7fL188tQNAXXq4h@stayvacay.ubwtedl.mongodb.net/';

async function seedAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    const existingAdmin = await Admin.findOne({ username: 'Saeed' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('StayVacay@25', 10);
    const admin = new Admin({ username: 'Saeed', password: hashedPassword });
    await admin.save();
    console.log('Admin user created');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

seedAdmin();
