import nc from 'next-connect';

const handler = nc()
  .get((req, res) => {
    res.statusCode = 200;
    res.json({ message: 'The Dev Team is listening :)' });
  })
  .post((req, res) => {
    res.statusCode = 200;
    res.json({ message: 'POST The Dev Team is listening :)' });
  });
export default handler;
