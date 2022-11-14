const Response = require('../../util/response');
const jwt = require('jsonwebtoken');

module.exports = AuthMiddleware = (req, res, next) => {
    const authorization = req.headers['authorization'];
    const token = authorization && authorization.split(' ')[1]
    const response = new Response();

    if (!token) {
        response.setBody({
            message: 'Token is required'
        }).setStatusCode(401).send(res);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        
        response.setBody({
            message: 'Invalid token'
        }).setStatusCode(401).send(res);
    }
    req.user = decoded;
    next(); 

}