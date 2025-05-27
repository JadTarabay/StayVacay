import Property from '../models/property.js';

export const getAllProperties = async (req, res) => {
  const properties = await Property.find({ isDeleted: false });
  res.json(properties);
};

export const addProperty = async (req, res) => {
  const { name, location, price, bedrooms, bathrooms, size } = req.body;
  const imagePaths = req.files?.map(file => file.path) || [];
  const newProperty = new Property({ name, location, price, bedrooms, bathrooms, size, images: imagePaths });
  await newProperty.save();
  res.status(201).json(newProperty);
};

export const updateProperty = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  if (req.files) updatedData.images = req.files.map(file => file.path);
  const updated = await Property.findByIdAndUpdate(id, updatedData, { new: true });
  res.json(updated);
};

export const deleteProperty = async (req, res) => {
  const { id } = req.params;
  await Property.findByIdAndUpdate(id, { isDeleted: true });
  res.json({ message: 'Property soft deleted' });
};

export const getPropertyById = async (req, res) => {
  const { id } = req.params;
  const property = await Property.findById(id);
  if (!property || property.isDeleted) {
    return res.status(404).json({ message: 'Property not found' });
  }
  property.views += 1; // Increment views
  await property.save();
  res.json(property);
};
