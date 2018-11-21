'use strict';
const winston = require('winston');

const transports = [
    new (winston.transports.Console)({
        timestamp: true,
        handleExceptions: true
    })
];

winston.configure({
    transports: transports
});