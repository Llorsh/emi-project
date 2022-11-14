const express = require('express');
const router = express.Router();

const TaskRouter = require('./task');
const AuthRouter = require('./auth');

router.use('/tasks', TaskRouter);
router.use('/', AuthRouter);

module.exports = router;
