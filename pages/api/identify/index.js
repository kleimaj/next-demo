import nc from 'next-connect';
import dbConnect from '../../../src/db/mongoose';
import Grass from '../../../src/models/Grass';
const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .post(async (req, res) => {
    console.log(req.body);
    try {
      const grass = await Grass.findOne(req.body);
      console.log(grass);
      res.status(200).json({ grass });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: err });
    }
  });

export default handler;
