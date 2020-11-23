import next from 'next';
import nc from 'next-connect';
import dbConnect from '../../../src/db/mongoose';
import Note from '../../../src/models/Note';

const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .get(async (req, res) => {
    // await dbConnect();
    try {
      const notes = await Note.find({});
      res.status(200).json({ success: true, data: notes });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  })
  .post(async (req, res) => {
    // await dbConnect();

    try {
      console.log(req.body);
      const note = await Note.create(req.body);
      res.status(201).json({ success: true, data: note });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  });

export default handler;
