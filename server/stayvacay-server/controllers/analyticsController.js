import Property from '../models/property.js';
import Visit from '../models/Visit.js';

export const getMostViewedProperties = async (req, res) => {
  const properties = await Property.find({ isDeleted: false }).sort({ views: -1 }).limit(10);
  res.json(properties);
};

export const getDailyVisits = async (req, res) => {
  const visits = await Visit.find().sort({ date: -1 }).limit(30);
  res.json(visits);
};