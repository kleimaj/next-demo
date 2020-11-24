import mongoose from 'mongoose';

const GrassSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  color: {
    type: String,
  },
  season: {
    type: String,
  },
  vernation: {
    type: String,
  },
  tipShape: {
    type: String,
  },
  bladeWidth: {
    type: String,
  },
  growthHabit: {
    type: String,
  },
});

export default mongoose.models.Grass || mongoose.model('Grass', GrassSchema);
