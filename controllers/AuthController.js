const Response = require('../util/response');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const bcrypt = require('bcrypt')


const AuthController = {
    login: async (req, res, next) => {
        const { email, password } = req.body;
        const response = new Response();
        try {
            const user = await User.findOne({ where: { email } });
            
            if (user) {
                const isValid = bcrypt.compareSync(password, user.password);
                if (isValid) {
                    const access_token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
                    response.setBody({
                        access_token
                    });
                    response.send(res);
                } else {
                    next({ name: 'InvalidEmailPassword' });
                }
            } else {
                next({ name: 'InvalidEmailPassword' });
            }
        } catch (error) {
            next(error);
        }

    },
    register: async (req, res, next) => {
        const response = new Response();
        try {
            const { email, password, names } = req.body;

            const user = await User.findOne({ where: { email: email } });

            if (user) {
                response.setBody({
                    message: 'Email already exists'
                }).setStatusCode(400).send(res);
            }
            const hash = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                email: email,
                password: hash,
                names: names,
            });
            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            response.setBody({
                message: 'User created successfully',
                data: {
                    token: token
                }
            }).setStatusCode(201).send(res);
        } catch (error) {
            next(error);
        }
    },
}

module.exports = AuthController;