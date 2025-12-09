import Property from '../models/property.js';
import path from 'path';
import fs from 'fs';

// GET all properties (public)
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find({});
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET property by ID (public)
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD property
export const addProperty = async (req, res) => {
  try {
    const { name, location, price, bedrooms, bathrooms, size, description } = req.body;

    // Handle images
    let images = [];
    if (req.files) {
      images = req.files.map(file => `uploads/${file.filename}`);
    }

    const property = new Property({
      name,
      location,
      price,
      bedrooms,
      bathrooms,
      size,
      description,
      images
    });

    const savedProperty = await property.save();
    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    // Update fields
    Object.keys(req.body).forEach(key => {
      property[key] = req.body[key];
    });

    // Handle new images (optional)
    if (req.files && req.files.length > 0) {
      // Optionally delete old images here if you want
      property.images.push(...req.files.map(file => `uploads/${file.filename}`));
    }

    const updatedProperty = await property.save();
    res.json(updatedProperty);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    // Delete images from server
    if (property.images && property.images.length > 0) {
      property.images.forEach(imgPath => {
        const fullPath = path.join(process.cwd(), imgPath);
        if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
      });
    }

    await property.deleteOne();
    res.json({ message: 'Property deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
