import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  note: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
