
require('./common/log');

const SERVER_PORT = 3000;
const logger = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const connectionController = require('./controllers/connection');


app.use(bodyParser.json({ limit: '5mb' })); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//app.use(express.static(__dirname + '/public'))

connectionController(app);

module.exports = app.listen( SERVER_PORT);