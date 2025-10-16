import fs from 'fs';
import path from 'path';
import Property from '../models/property.js';

export const getAllProperties = async (req, res) => {
  const properties = await Property.find({ isDeleted: false });
  res.json(properties);
};

export const addProperty = async (req, res) => {
  const { name, location, price, bedrooms, bathrooms, size, description } = req.body;

  const imagePaths = req.files?.map(file => {
    return `${req.protocol}://${req.get('host')}/uploads/${encodeURIComponent(file.filename)}`;
  }) || [];

  const newProperty = new Property({
    name,
    location,
    price,
    bedrooms,
    bathrooms,
    size,
    description,
    images: imagePaths
  });

  await newProperty.save();
  res.status(201).json(newProperty);
};

export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const updatedData = { ...req.body };

  if (req.files && req.files.length > 0) {
    updatedData.images = req.files.map(file => {
      return `${req.protocol}://${req.get('host')}/uploads/${encodeURIComponent(file.filename)}`;
    });
  }

  const updated = await Property.findByIdAndUpdate(id, updatedData, { new: true });
  res.json(updated);
};


export const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);

    if (!property || property.isDeleted) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Increment views
    property.views = (property.views || 0) + 1;
    await property.save();

    res.json(property);
  } catch (err) {
    console.error('Error fetching property by ID:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProperty = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Delete images from disk
    if (property.images && property.images.length > 0) {
      property.images.forEach(imagePath => {
        const fullPath = path.resolve(imagePath); // Ensure absolute path
        fs.unlink(fullPath, err => {
          if (err) {
            console.error(`Failed to delete file: ${fullPath}`, err);
          }
        });
      });
    }

    // Soft delete property
    await Property.findByIdAndUpdate(id, { isDeleted: true });

    res.json({ message: 'Property soft deleted and images removed from server' });

  } catch (err) {
    console.error('Error deleting property:', err);
    res.status(500).json({ message: 'Server error' });
  }
};