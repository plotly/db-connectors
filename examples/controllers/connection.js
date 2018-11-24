
const HTTP_OK = 200;
// BAD_REQUEST = 400, UNEXPECTED_ERROR=500;
const logger = require('winston');
// const {Datastores} = require('../../src/index');

const connectController = async(app) => {

    app.post('/connect', function(req, res) {
        const data = {
            status: true
        };

        logger.info(req.method, ' ', req.url, 'Response Sent');
        res.header('Content-Type', 'application/json');
        res.status(HTTP_OK).send(data);
    });

    app.post('/query', function(req, res) {
        const data = {
            status: true
        };

        logger.info(req.method, ' ', req.url, 'Response Sent');
        res.header('Content-Type', 'application/json');
        res.status(HTTP_OK).send(data);
    });

    app.post('/disconnect', function(req, res) {
        const data = {
            status: true
        };

        logger.info(req.method, ' ', req.url, 'Response Sent');
        res.header('Content-Type', 'application/json');
        res.status(HTTP_OK).send(data);
    });
};

module.exports = connectController;