import Admin from '../models/admin.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, admin: { username: admin.username } });
};

export const registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, password: hashed });
    await newAdmin.save();
    res.status(201).json({ message: 'Admin registered' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating admin' });
  }
};
