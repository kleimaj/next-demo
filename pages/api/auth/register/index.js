import nc from "next-connect";
import bcrypt from "bcrypt";
import User from "../../../../src/models/User";
import dbConnect from "../../../../src/db/mongoose";
import { ironSession } from "next-iron-session";

const session = ironSession({
  cookieName: "MYSITECOOKIE",
  password: "2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false
  }
});

const handler = nc()
  .use(session)
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .post(async (req, res) => {
    console.log("hitting handler");
    console.log(req.body);
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({
        status: 400,
        message: "Please enter a name, email, and password"
      });
    }
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser)
      return res.status(400).json({
        status: 400,
        message: "A user with that email address already exists!"
      });
    bcrypt.genSalt(10, (err, salt) => {
      if (err)
        return res.status(500).json({
          status: 500,
          message: "Error in generating salt"
        });

      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err)
          return res.status(500).json({
            status: 500,
            message: "Error hashing password"
          });
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: hash
        };
        User.create(newUser, (err, savedUser) => {
          if (err) return res.status(500).json({ status: 500, message: err });
          req.session.currentUser = { id: savedUser._id, name: savedUser.name };
          return res.status(200).json({
            status: 200,
            data: { id: savedUser._id, name: savedUser.name },
            message: "User registered"
          });
        });
      });
    });
  });
export default handler;
