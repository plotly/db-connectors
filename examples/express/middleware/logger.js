const logger = require('winston');

const loggerMiddleware = function(req, res, next) {
    logger.info(`Executing ${req.method} on path ${req.url}`);
    next();
};

module.exports = loggerMiddleware;