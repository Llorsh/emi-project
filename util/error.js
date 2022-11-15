const Response = require('./response');

const returnError = (error, req, res, next) => {

    const response = new Response();
    response.setBody({
        message: error
    }).setStatusCode(error.statusCode
        ? error.statusCode
        : 500).send(res);

}

module.exports = returnError;