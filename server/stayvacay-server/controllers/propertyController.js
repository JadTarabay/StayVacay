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
  const properties = await Property.find({ isDeleted: false });
  res.json(properties);
};

export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const addProperty = async (req, res) => {
  try {
    const { name, location, price, bedrooms, bathrooms, size, description } = req.body;

    // multer-s3 gives you the full S3 URL in file.location
    const imageUrls = req.files?.map(file => file.location) || [];

    const newProperty = new Property({
      name,
      location,
      price,
      bedrooms,
      bathrooms,
      size,
      description,
      images: imageUrls,
    });

    await newProperty.save();
    res.status(201).json(newProperty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    if (req.files && req.files.length > 0) {
      // Delete old images from S3
      await deleteImagesFromS3(property.images);

      // Set new images
      updates.images = req.files.map(file => file.location);
    }

    const updatedProperty = await Property.findByIdAndUpdate(id, updates, { new: true });
    res.json(updatedProperty);
  } catch (err) {
    console.error('Error updating property:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


export const deleteProperty = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property) return res.status(404).json({ message: 'Property not found' });

    // Delete images from S3
    await deleteImagesFromS3(property.images);

    // Soft delete property
    await Property.findByIdAndUpdate(id, { isDeleted: true });

    res.json({ message: 'Property deleted and images removed from S3' });
  } catch (err) {
    console.error('Error deleting property:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
