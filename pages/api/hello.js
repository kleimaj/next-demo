import dbConnect from '../../src/db/mongoose';
export default async (req, res) => {
  res.statusCode = 200;
  res.json({ msg: 'The Dev team is listening :-)' });
};
