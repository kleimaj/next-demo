import nc from 'next-connect';
import bcrypt from 'bcrypt';
import User from '../../../../src/models/User';
import dbConnect from '../../../../src/db/mongoose';
// import session from 'express-session';
// import connectMongo from 'connect-mongo';
import { withIronSession, ironSession } from 'next-iron-session';

const session = ironSession({
  password: 'iaintneverseentwoprettybestfriends',
  cookieName: 'user',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
});
// const MongoStore = connectMongo(session);

const handler = nc()
  // .use(async (req, res, next) => {
  //   return session({
  //     store: new MongoStore({ url: process.env.MONGODB_URI }),
  //     secret: 'iaintneverseentwoprettybestfriends',
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: {
  //       maxAge: 1000 * 60 * 60 * 24,
  //     },
  //   })(req, res, next);
  //   // next();
  // })
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .use(session)
  .delete(async (req, res) => {
    // const storedUser = req.session.get('currentUser');
    // console.log(storedUser);
    // if (!storedUser)
    //   return res.status(401).json({
    //     message: 'No user to log out!',
    //   });
    // req.session.destroy((err) => {
    //   if (err)
    //     return res.status(500).json({
    //       message: 'Something went wrong. Please try again.',
    //     });
    //   res.sendStatus(200);
    // });
    // console.log(req.session.get('currentUser'));
    req.session.destroy();
    res.json({ status: 200, message: 'logged out' });
  });

// export default withIronSession(handler, {
//   password: 'iaintneverseentwoprettybestfriends',
//   cookieName: 'user',
//   cookieOptions: {
//     maxAge: 1000 * 60 * 60 * 24,
//   },
// });

export default handler;
