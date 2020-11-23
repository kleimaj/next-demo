import nc from 'next-connect';
import bcrypt from 'bcrypt';
import User from '../../../../src/models/User';
import dbConnect from '../../../../src/db/mongoose';

const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .post(async (req, res) => {});

export default handler;
