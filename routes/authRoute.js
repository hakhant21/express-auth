const express = require('express');

const router = express.Router();

const User = require('../models/user');
const authController = require('../controllers/authController');

router.post('/signup', authController.signup_post);

router.post('/login', authController.login_post);

module.exports = router;
