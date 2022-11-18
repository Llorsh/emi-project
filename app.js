const express = require('express');
const path = require('path');
var cors = require('cors')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
require('dotenv').config()

const returnError = require('./util/error');

const indexRouter = require('./routes/index');

const app = express();

app.use(cors())

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(`/api/${process.env.API_VERSION}`, indexRouter);

app.use(returnError)

module.exports = app;
