
require('./common/log');

const SERVER_PORT = 3000;
const logger = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const connectionController = require('./controllers/connection');
const {validateRequest, loggerMiddleware} = require('./middleware');
require('./common/db');
const orm = require('./common/orm');

logger.info('Start of DB-Connector Server');

app.use(cors());
app.use(bodyParser.json({ limit: '5mb' })); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use( loggerMiddleware );
app.use( validateRequest );

//app.use(express.static(__dirname + '/public'))

connectionController(app);

logger.info(`DB-Connector Server start on ${SERVER_PORT}`);

/**
 * https://blog.campvanilla.com/jest-expressjs-and-the-eaddrinuse-error-bac39356c33a
 * Support for super test 
 */
if (process.env.NODE_ENV !== 'test') {
    app.listen(SERVER_PORT);
}

module.exports = app;