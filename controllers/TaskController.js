const { Task } = require('../models')
const Response = require('../util/response')


const TaskController = {
    createTask: async (req, res, next) => {
        const response = new Response()
        try {
            const { name, description, points } = req.body
            const task = await Task.create({
                name,
                description,
                user_id: req.user.id,
                points: points || 0
            });

            response.setBody({
                message: 'Task created successfully',
                data: task
            }).setStatusCode(201).send(res)
        } catch (error) {
            next(error)
        }
    },
    getTasks: async (req, res, next) => {
        const response = new Response()
        try {
            const tasks = await Task.findAll({
                where: {
                    user_id: req.user.id
                },
                order: [
                    ['id', 'DESC']
                ],
                attributes: ['id', 'name', 'description', 'points']
            })

            response.setBody({
                message: 'Tasks retrieved successfully',
                data: tasks
            }).send(res)
        } catch (error) {
            next(error)
        }
    },
    getTaskById: async (req, res, next) => {
        const response = new Response()
        try {
            const task = await Task.findOne({
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                },
                attributes: ['id', 'name', 'description', 'points']
            });
            if (!task) {
                response.setBody({
                    message: 'Tarea No Encontrada'
                }).setStatusCode(404).send(res)
            } else {
                response.setBody({
                    message: 'Tarea Encontrada',
                    data: task
                }).send(res)
            }
        } catch (error) {
            next(error)
        }
    },
    updateTaskById: async (req, res, next) => {
        const response = new Response()
        try {
            const task = await Task.findOne({
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }
            });
            if (!task) {
                response.setBody({
                    message: 'Tarea No Encontrada'
                }).setStatusCode(404).send(res)

            } else {
                const { name, description, points } = req.body
                await task.update({
                    name,
                    description,
                    points
                });
                response.setBody({
                    message: 'Tarea Actualizada',
                    data: task
                }).send(res)
            }
        } catch (error) {
            next(error)
        }
    },
    deleteTaskById: async (req, res, next) => {
        const response = new Response()
        try {
            const task = await Task
                .findOne({
                    where: {
                        id: req.params.id,
                        user_id: req.user.id
                    }
                });
            if (!task) {
                response.setBody({
                    message: 'Tarea No Encontrada'
                }).setStatusCode(404).send(res)
            } else {
                await task.destroy();
                response.setBody({
                    message: 'Tarea Eliminada'
                }).send(res)
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TaskController