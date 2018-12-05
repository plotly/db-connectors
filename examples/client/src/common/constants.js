const _ = require('lodash');
const DIALECTS = {
    MYSQL: 'mysql',
    MARIADB: 'mariadb',
    ORACLE: 'oracle',
    POSTGRES: 'postgres',
    REDSHIFT: 'redshift',
    ELASTICSEARCH: 'elasticsearch',
    MSSQL: 'mssql',
    SQLITE: 'sqlite',
    S3: 's3',
    IBM_DB2: 'ibm db2',
    APACHE_SPARK: 'apache spark',
    APACHE_IMPALA: 'apache impala',
    APACHE_DRILL: 'apache drill',
    DATA_WORLD: 'data.world',
    ATHENA: 'athena',
    CSV: 'csv',
    BIGQUERY: 'bigquery'
};

const SQL_ATTRIBUTES_SCHEMA = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            label: 'Username',
            errorMessage: 'Username is required'
        },
        password: {
            type: 'string',
            label: 'Password',
            errorMessage: 'Password is required'
        },
        host: {
            type: 'string',
            label: 'Host',
            errorMessage: 'Host is required'
        },
        port: {
            type: 'number',
            label: 'Port',
            errorMessage: 'Port is required',
            description: 'Server port number (e.g. 3306)'
        },
        database: {
            type: 'string',
            label: 'Database',
            errorMessage: 'Database is required'
        }
    },
    required: ['username', 'password', 'host', 'port', 'database']
};

const SCHEMAS = {
    SQL_ATTRIBUTES_SCHEMA
};

/**
 * The following function will return the dialects in an array of 
 * labels and values
 */
const getDialects = function(){
    return _.keys( DIALECTS ).map( k =>{ return {label:k, value: DIALECTS[k] } });
}

/**
 * Returns the schema based on the dialect
 * @param {string} dialect 
 */
const getSchema = function(dialect){

    //SQL only supported
    return SQL_ATTRIBUTES_SCHEMA;
}

/**
 * 
 * @param {object} schemaProperties
 */
const getSchemaAttributes = function(schemaProperties){
    return _.keys( schemaProperties ).map (k => schemaProperties[k]);
}

module.exports = {
    getDialects,
    getSchemaAttributes,
    getSchema,
    DIALECTS,
    SCHEMAS
};