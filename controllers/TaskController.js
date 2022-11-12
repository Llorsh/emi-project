const { Task } = require('../models')

class TaskController {
    static createTask(req, res, next) {
        const { title, description, status, due_date } = req.body
        const UserId = req.currentUserId
        Task.create({
            title,
            description,
            status,
            due_date,
            UserId
        })
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getTasks(req, res, next) {
        Task.findAll()
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }

    static getTaskById(req, res, next) {
        const id = req.params.id
        Task.findByPk(id)
            .then(data => {
                if (data) {
                    res.status(200).json(data)
                } else {
                    next({ name: 'NotFound' })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateTaskById(req, res, next) {
        const id = req.params.id
        const { title, description, status, due_date } = req.body
        Task.update({
            title,
            description,
            status,
            due_date
        }, {
            where: { id },
            returning: true
        })
            .then(data => {
                if (data[0] === 0) {
                    next({ name: 'NotFound' })
                } else {
                    res.status(200).json(data[1][0])
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static deleteTaskById(req, res, next) {
        const id = req.params.id
        Task.destroy({
            where: { id }
        })
            .then(data => {
                if (data) {
                    res.status(200).json({ message: 'Task success to delete' })
                } else {
                    next({ name: 'NotFound' })
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static updateStatusTaskById(req, res, next) {
        const id = req.params.id
        const { status } = req.body
        Task.update({
            status
        }, {
            where: { id },
            returning: true
        })
            .then(data => {
                if (data[0] === 0) {
                    next({ name: 'NotFound' })
                } else {
                    res.status(200).json(data[1][0])
                }
            })
            .catch(err => {
                next(err)
            })
    }
}


module.exports = TaskController