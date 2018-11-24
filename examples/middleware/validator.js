const {SCHEMAS,DIALECTS} = require('../../src/index');

/**
 * The following method will examine incoming parameters and validate them against
 * the defined schema for the dialect
 * @param {object} req
 * @param {object} req.connection  - The connection object
 * @param {string} req.connection.dialect - The database dialect
 * @param {object} req.connection.attributes - The connection attributes
 * @param {object} res 
 * @param {function} next 
 */
const validateRequest = function (req,res,next){

};

module.exports = {
    validateRequest
};