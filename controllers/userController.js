const User = require("../models/User");
const { generateToken } = require('../utils/generateToken');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Basic manual validation before hitting the database
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and password.',
      });
    }

    // Check if a user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered.',
      });
    }

    // Password hashing happens automatically via the pre-save hook in User model
    const user = await User.create({ username, email, password });

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error); // Pass to centralized error handler
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password.',
      });
    }

    // Fetch user — password is excluded by default, so we explicitly include it here
    const user = await User.findOne({ email }).select('+password');

    // Use a generic message to avoid revealing whether the email exists
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    return res.status(200).json({
        success: true,
        data: user
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    
  } catch (error) {
    
  }
}


module.exports = {
  register,
  login,
  getUserDetails
};