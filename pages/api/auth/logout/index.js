import nc from 'next-connect';
import bcrypt from 'bcrypt';
import User from '../../../../src/models/User';
import dbConnect from '../../../../src/db/mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

const handler = nc()
  .use(async (req, res, next) => {
    await session({
      store: new MongoStore({ url: process.env.MONGODB_URI }),
      secret: 'iaintneverseentwoprettybestfriends',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    });
    next();
  })
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .delete(async (req, res) => {
    if (!req.session.currentUser)
      return res.status(401).json({
        message: 'No user to log out!',
      });
    req.session.destroy((err) => {
      if (err)
        return res.status(500).json({
          message: 'Something went wrong. Please try again.',
        });
      res.sendStatus(200);
    });
  });

export default handler;
