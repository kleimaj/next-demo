import nc from 'next-connect';
import bcrypt from 'bcrypt';

const handler = nc().post((req, res) => {
  if (!req.body.name || req.body.email || req.body.password) {
    return res.status(400).json({
      status: 400,
      message: 'Please enter a name, email, and password',
    });
  }
});
export default handler;
