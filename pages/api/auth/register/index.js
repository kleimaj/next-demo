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
    console.log('session init');
    next();
  })
  .use(async (req, res, next) => {
    await dbConnect();
    console.log('DB connected');
    next();
  })
  .post(async (req, res) => {
    // console.log(req.body);
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        message: 'Please enter a name, email, and password',
      });
    }
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser)
      return res.status(400).json({
        status: 400,
        message: 'A user with that email address already exists!',
      });
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: 'Error in generating salt',
        });

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err)
          return res.status(500).json({
            status: 500,
            message: 'Error hashing password',
          });
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: hash,
        };
        User.create(newUser, (err, savedUser) => {
          if (err) return res.status(500).json({ status: 500, message: err });
          return res.status(200).json({
            status: 200,
            data: { id: savedUser._id, name: savedUser.name },
            message: 'User registered',
          });
        });
      });
    });
  });
export default handler;
