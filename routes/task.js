const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/TaskController');


router.post('/', TaskController.createTask)
router.get('/', TaskController.getTasks)
router.get('/:id', TaskController.getTaskById)
router.put('/:id', TaskController.updateTaskById)
router.patch('/:id', TaskController.updateStatusTaskById)
router.delete('/:id', TaskController.deleteTaskById)


module.exports = router;