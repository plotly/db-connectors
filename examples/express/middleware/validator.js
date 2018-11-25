const {SCHEMAS, DIALECTS} = require('../../../src/index');
const logger = require('winston');
const BAD_REQUEST = 400;
const Validator = require('jsonschema').Validator;
const v = new Validator();


/**
 * The following method will examine incoming parameters and validate them against
 * the defined schema for the dialect
 * @param {object} req - The request object
 * @param {object} req.connection  - The connection object
 * @param {string} req.connection.dialect - The database dialect
 * @param {object} req.connection.attributes - The connection attributes
 * @param {object} res - The response object
 * @param {function} next  - The next function
 * @returns
 */
const validateRequest = function (req, res, next) {

    if (req.url !== '/connect') {
        next();
    } else if (req.url === '/connect' && req.body.connection && req.body.connection.dialect) {
        let schema;
        switch (req.body.connection.dialect) {
            case DIALECTS.MYSQL:
                schema = SCHEMAS.SQL_ATTRIBUTES_SCHEMA;
                break;
            case DIALECTS.MSSQL:
                schema = SCHEMAS.SQL_ATTRIBUTES_SCHEMA;
                break;
            case DIALECTS.MARIADB:
                schema = SCHEMAS.SQL_ATTRIBUTES_SCHEMA;
                break;
            case DIALECTS.IBM_DB2:
                schema = SCHEMAS.SQL_ATTRIBUTES_SCHEMA;
                break;
            case DIALECTS.POSTGRES:
                schema = SCHEMAS.SQL_ATTRIBUTES_SCHEMA;
                break;
            case DIALECTS.REDSHIFT:
                schema = SCHEMAS.SQL_ATTRIBUTES_SCHEMA;
                break;
            default:
                break;

        }

        if (schema) {
            const validationResult = v.validate(req.body.connection, schema);
            if (validationResult.errors.length > 0) {
                return res.status(BAD_REQUEST).send(validationResult.errors[0].message);
            }
            next();
        } else {
            const msg = `Invalid request.  Dialect not support ${req.body.connection.dialect}`;
            logger.error(msg);
            return res.status(BAD_REQUEST).send(msg);
        }
    } else {
        const msg = 'Invalid request.  Missing Connection or Dialect attribute';
        logger.error(msg);
        return res.status(BAD_REQUEST).send(msg);
    }
};

module.exports = {
    validateRequest
};