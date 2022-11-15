const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');


router.post('/parent/login', AuthController.login);
router.post('/parent/register', AuthController.register);


module.exports = router;