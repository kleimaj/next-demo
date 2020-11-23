import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  grass: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Grass',
  },
  isAdmin: {
    type: Boolean,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
