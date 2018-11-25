const {validateRequest} = require('./validator');
const loggerMiddleware = require('./logger');

module.exports = {
    validateRequest,
    loggerMiddleware
};