import fs from 'fs';
import path from 'path';
import Property from '../models/property.js';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Helper to delete images from S3
const deleteImagesFromS3 = async (imageUrls) => {
  if (!imageUrls || imageUrls.length === 0) return;

  const objects = imageUrls.map(url => {
    // extract key from full URL
    const key = url.split(`https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/`)[1];
    return { Key: key };
  });

  if (objects.length === 0) return;

  await s3.deleteObjects({
    Bucket: process.env.AWS_BUCKET_NAME,
    Delete: { Objects: objects },
  }).promise();
};

export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get single property by ID (public)
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a new property (admin)
export const addProperty = async (req, res) => {
  try {
    // Save S3 URLs instead of /uploads paths
    const images = req.files ? req.files.map(file => file.location) : [];

    const property = new Property({
      name: req.body.name,
      price: req.body.price,
      location: req.body.location,
      bedrooms: req.body.bedrooms,
      bathrooms: req.body.bathrooms,
      size: req.body.size,
      description: req.body.description,
      images, // <-- full S3 URLs go here
    });

    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    // Keep old images + add new ones if uploaded
    const newImages = req.files ? req.files.map(file => file.location) : [];
    if (newImages.length > 0) {
      property.images = [...property.images, ...newImages];
    }

    property.name = req.body.name || property.name;
    property.price = req.body.price || property.price;
    property.location = req.body.location || property.location;
    property.bedrooms = req.body.bedrooms || property.bedrooms;
    property.bathrooms = req.body.bathrooms || property.bathrooms;
    property.size = req.body.size || property.size;
    property.description = req.body.description || property.description;

    await property.save();
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }
    res.json({ message: 'Property deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};