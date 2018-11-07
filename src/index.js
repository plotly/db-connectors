

const {DIALECTS} = require('./common/constants');
/**

const IbmDb2 = require('./datasources/ibmdb2');
const ApacheLivy = require('./common/livy');
const ApacheImpala = require('./datasources/impala');
const DataWorld = require('./datasources/dataworld');
const DatastoreMock = require('./datasources/datastoremock');
const Athena = require('./datasources/athena');
const BigQuery = require('./datasources/bigquery');
const Oracle = require('./oracle.js');
*/
const ApacheDrill = require('./datastores/apachedrill');
const CSV = require('./datastores/csv');
const DataWorld = require('./datasources/dataworld');
const Elasticsearch = require('./datastores/elasticsearch');
const Sql = require('./datastores/sql.js');
const S3 = require('./datastores/S3');


/*
 * Switchboard to all of the different types of connections
 * that we support.
 *
 * The configuration object provides the necessary settings to initialize
 * a connection and is serializable as JSON and saved in
 * ~/.plotly/connector/connections.
 *
 * The queryObject is a string or object that describes the query.
 * For SQL-like interfaces, this is like `SELECT * FROM ebola_2014 LIMIT 10`.
 * But for other connection like elasticsearch will be an object.
 *
 * The type of connection is specified in "dialect" of the connection object.
 * Add new connection types by creating new files in this folder that export a
 * `query` or `connect` function. Some connections have
 * other functions that are exported too, like getting the s3 keys from a bucket.
 *  Their interfaces are described below.
 */

function getDatastoreClient(connection) {
    // handle test mode:
    /**
     if (connection.mock) {
        return DatastoreMock;
    }
    */

    const {dialect} = connection;

    /**
    if (dialect === 'elasticsearch') {
        return Elasticsearch;
    } else if (dialect === 's3') {
        return S3;
    } else if (dialect === 'apache drill') {
        return ApacheDrill;
    } else if (dialect === 'apache spark') {
        return ApacheLivy;
    } else if (dialect === 'apache impala') {
        return ApacheImpala;
    } else if (dialect === 'ibm db2') {
        return IbmDb2;
    } else if (dialect === 'data.world') {
        return DataWorld;
    } else if (dialect === 'athena') {
        return Athena;
    } else if (dialect === 'oracle') {
        return Oracle;
    } else if (dialect === 'bigquery') {
        return BigQuery;
    }
    return Sql;*/

    if (dialect === DIALECTS.APACHE_DRILL) {
        return ApacheDrill;
    } else if (dialect === DIALECTS.CSV) {
        return CSV;
    } else if (dialect === DIALECTS.ELASTICSEARCH) {
        return Elasticsearch;
    } else if (dialect === DIALECTS.DATA_WORLD) {
        return DataWorld;
    } else if (dialect === DIALECTS.S3) {
        return S3;
    }

    return Sql;
}

/**
 * query makes a query
 * @param {(object|string)} queryStatement Query
 * @param {object}          connection     Connection object
 * @returns {Promise.<object>} that resolves to the results as:
 *   {
 *       columnnames: [...],
 *       rows: [...]
 *   }
 */
function query(queryStatement, connection) {
    return getDatastoreClient(connection).query(queryStatement, connection);
}

/**
 * connect attempts to ping the connection
 * @param {object} connection Connection object
 * @returns {Promise} that resolves when the connection succeeds
 */
function connect(connection) {
    return getDatastoreClient(connection).connect(connection);
}

/**
 * disconnect closes the connection and
 * @param {object} connection Connection object
 * @returns {Promise} that resolves when the connection succeeds
 */
function disconnect(connection) {
    const client = getDatastoreClient(connection);
    return (client.disconnect) ?
        client.disconnect(connection) :
        Promise.resolve(connection);
}

/* SQL-like Connectors */

/**
 * schemas retrieves a list of table names, column names and column data types
 * @param {object} connection Connection object
 * @returns {Promise.<object>} that resolves to the results as:
 *   {
 *       columnnames: [...],
 *       rows: [[table_name, column_name, data_type], ...]
 *   }
 */
function schemas(connection) {
    return getDatastoreClient(connection).schemas(connection);
}

/**
 * tables retrieves a list of table names
 * @param {object} connection Connection object
 * @returns {Promise.<Array>} that resolves to a list of the available tables.
 * This can have flexible meaning for other datastores. E.g.:
 * for elasticsearch, this means return the available "documents" per an "index"
 */
function tables(connection) {
    return getDatastoreClient(connection).tables(connection);
}

/*
 * Return a promise with the files that are available for querying.
 *
 * e.g. for S3 and ApacheDrill, this returns the list of S3 keys.
 * In the future, if we support local file querying, this could include
 * a list of local files
 */
// TODO - I think specificity is better here, just name this to "keys"
// and if we ever add local file stuff, add a new function like "files".
function files(connection) {
    return getDatastoreClient(connection).files(connection);
}


/* Apache Drill specific functions */

/*
 * Return a list of configured Apache Drill storage plugins
 */
function storage(connection) {
    return getDatastoreClient(connection).storage(connection);
}

/*
 * List the S3 files that apache drill is connecting to to make
 * running queries easier for the user.
 * TODO - This should be more generic, should pass in the storage plugin
 * name or the storage connection and then return the available files for
 * that plugin.
 */
function listS3Files(connection) {
    return getDatastoreClient(connection).listS3Files(connection);
}

function elasticsearchMappings(connection) {
    return getDatastoreClient(connection).elasticsearchMappings(connection);
}

module.exports = {
    connect,
    disconnect,
    elasticsearchMappings,
    files,
    listS3Files,
    query,
    schemas,
    storage,
    tables
};
