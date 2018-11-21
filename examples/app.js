
require('./common/log');

const SERVER_PORT = 3000;
const logger = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();


app.use(bodyParser.json({ limit: '5mb' })); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//app.use(express.static(__dirname + '/public'))

//app.use(require('./controllers'))

/*app.listen(SERVER_PORT, function() {
  logger.info(`Listening on port ${SERVER_PORT}...`);
})*/

module.exports = app.listen( SERVER_PORT);