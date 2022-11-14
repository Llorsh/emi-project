class Response {
    constructor() {
        this.body = {
            message: 'OK',
            data: null,
            timestamp: Date.now()
        };
        this.headers = {};
        this.statusCode = 200;

        console.log(this)
    }

    setBody(body) {
        this.body = { ...this.body, ...body };

        this.body.timestamp = (Date.now() - this.body.timestamp) / 1000;

        return this;
    }

    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    setStatusCode(statusCode) {
        this.statusCode = statusCode;
        return this;
    }

    send(res) {
        res.status(this.statusCode).set(this.headers).json(this.body);
    }
}

module.exports = Response;