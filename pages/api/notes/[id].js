import nc from 'next-connect';
import dbConnect from '../../../src/db/mongoose';
import Note from '../../../src/models/Note';

const handler = nc()
  .get(async (req, res) => {
    const {
      query: { id },
    } = req;
    await dbConnect();
    try {
      const note = await Note.findById(id);
      if (!note) {
        return res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: note });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  .put(async (req, res) => {
    const {
      query: { id },
    } = req;
    await dbConnect();
    try {
      const note = await Note.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!note) {
        return res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: note });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  .delete(async (req, res) => {
    const {
      query: { id },
    } = req;
    await dbConnect();
    try {
      const deletedNote = await Note.deleteOne({ _id: id });
      if (!deletedNote) {
        return res.status(400).json({ success: false });
      }
      res.status(200).json({ success: true, data: {} });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

export default handler;
