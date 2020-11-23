import nc from 'next-connect';
import bcrypt from 'bcrypt';
import User from '../../../../src/models/User';
import dbConnect from '../../../../src/db/mongoose';
import session from 'express-session';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);

const handler = nc()
  .use(async (req, res, next) => {
    return session({
      store: new MongoStore({ url: process.env.MONGODB_URI }),
      secret: 'iaintneverseentwoprettybestfriends',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24,
      },
    })(req, res, next);
    // next();
  })
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .post(async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ status: 400, message: 'Please enter your email and password' });
    }
    User.findOne({ email: req.body.email }, (err, foundUser) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: 'Something went wrong. Please try again',
        });

      if (!foundUser) {
        return res
          .status(400)
          .json({ status: 400, message: 'Email or password is incorrect' });
      }

      bcrypt.compare(req.body.password, foundUser.password, (err, isMatch) => {
        if (err)
          return res.status(500).json({
            status: 500,
            message: 'Something went wrong. Please try again',
          });

        if (isMatch) {
          console.log(req.session);
          req.session.currentUser = { id: foundUser._id, name: foundUser.name };
          console.log(req.session);
          return res.status(200).json({
            status: 200,
            message: 'Success',
            id: foundUser._id,
            name: foundUser.name,
          });
        } else {
          return res
            .status(400)
            .json({ status: 400, message: 'Email or password is incorrect' });
        }
      });
    });
  });

export default handler;
