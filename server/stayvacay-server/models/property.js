import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  id: Number,
  name: String,
  location: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  size: Number,

  description: {
    shortDescription: String,
    amenities: [String],
    nearbyPlaces: [String],
    notes: [String],
  },

  images: [String],
  views: { type: Number, default: 0 },
  isDeleted: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Property', propertySchema);
