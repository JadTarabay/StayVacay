import express from 'express';
import { getAllProperties, addProperty, updateProperty, deleteProperty } from '../controllers/PropertyController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/', protect, getAllProperties);
router.post('/', protect, upload.array('images'), addProperty);
router.put('/:id', protect, upload.array('images'), updateProperty);
router.delete('/:id', protect, deleteProperty);

export default router;