const {SCHEMAS,DIALECTS} = require('../../src/index');
const logger = require('winston');
const BAD_REQUEST = 400;
const Validator = require('jsonschema').Validator;
const v = new Validator();


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

    if( req && req.connection && req.connection.dialect ){
        let schema;
        switch( req.connection.dialect ){
            case DIALECTS.MYSQL:
                schema = SCHEMAS.SQL_ATTRIBUTES_SCHEMA
                break;
        }
        if( schema ){
            const validationResult = v.validate( req.connection.attributes, schema);
            if( validationResult.errors.length > 0){
                return res.status(BAD_REQUEST).send(validationResult.errors[0].message);
            }
            next();
        }else{
            const msg = `Invalid request.  Dialect not support ${req.connection.dialect}`;
            logger.error(msg);
            return res.status(BAD_REQUEST).send(msg);
        }
    }else{
        const msg = `Invalid request.  Missing Connection or Dialect attribute`;
        logger.error(msg);
        return res.status(BAD_REQUEST).send(msg);
    }
};

module.exports = {
    validateRequest
};