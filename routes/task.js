const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../app/middlewares/AuthMiddleware');


const TaskController = require('../controllers/TaskController');


router.post('/', [AuthMiddleware], TaskController.createTask)
router.get('/', [AuthMiddleware], TaskController.getTasks)
router.get('/:id', [AuthMiddleware], TaskController.getTaskById)
router.put('/:id', [AuthMiddleware], TaskController.updateTaskById)
router.patch('/:id', [AuthMiddleware], TaskController.updateStatusTaskById)
router.delete('/:id', [AuthMiddleware], TaskController.deleteTaskById)


module.exports = router;