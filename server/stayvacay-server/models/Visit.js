import mongoose from 'mongoose';

const visitSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: () => new Date().setHours(0, 0, 0, 0),
    unique: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

export default mongoose.model('Visit', visitSchema);
