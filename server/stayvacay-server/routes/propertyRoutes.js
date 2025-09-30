import express from 'express';
import { getAllProperties, addProperty, updateProperty, deleteProperty, getPropertyById } from '../controllers/propertyController.js';
import { protect } from '../middleware/authMiddleware.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.get('/public', getAllProperties);
router.get('/public/:id', getPropertyById);
router.post('/', protect, upload.array('images'), addProperty);
router.put('/:id', protect, upload.array('images'), updateProperty);
router.delete('/:id', protect, deleteProperty);

export default router;
