import dbConnect from '../../src/db/mongoose';
export default async (req, res) => {
  await dbConnect();
  res.statusCode = 200;
  res.json({ name: process.env.MONGODB_URI });
};
