module.exports = {
  env: {
    MY_ENV_VAR: process.env.SECRET,
    MONGODB_URI: process.env.MONGODB_URI,
  },
};
