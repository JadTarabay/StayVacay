import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import propertyRoutes from './routes/propertyRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import visitMiddleware from './middleware/trackVisit.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Middleware
const allowedOrigins = new Set([
  "http://localhost:3000",
  "http://localhost:3001",
  "https://stayvacay-forntend.onrender.com",
  "https://stayvacay-admin.onrender.com",
  "https://stay-vacay.com",
  "https://www.stay-vacay.com",
  "https://admin.stay-vacay.com",
]);

app.use(cors({
  origin: (origin, cb) => {
    // allow server-to-server / Postman (no Origin header)
    if (!origin) return cb(null, true);
    return cb(null, allowedOrigins.has(origin));
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());
app.use(visitMiddleware);


// Routes
app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/analytics', analyticsRoutes);

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
      console.log('Connected to MongoDB');
    });
  })
  .catch((err) => console.log('DB connection error:', err));
