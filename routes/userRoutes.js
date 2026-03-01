const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/protect')
const userController = require('../controllers/userController')

// Register
router.post('/register', userController.register)

// Login
router.post('/login', userController.login)

// Get Details
router.get('/profile', protect, userController.getUserDetails)

module.exports = router;