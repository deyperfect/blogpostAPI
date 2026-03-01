const jwt = require('jsonwebtoken');

/**
 * Generate JWT for authenticated user
 */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '1d',
    }
  );
};

module.exports = { generateToken };