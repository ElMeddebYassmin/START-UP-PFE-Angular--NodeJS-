const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

//const maiService = require ('../services/mailService');

router.post('/login',authController.login);

//router.post('/register',maiService.add);
module.exports = router ;