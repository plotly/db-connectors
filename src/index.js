const {CONNECTION_CONFIG, DIALECTS, SCHEMAS} = require('./common/constants');
const ApacheDrill = require('./datastores/apachedrill');
const ApacheImpala = require('./datastores/impala');
const ApacheLivy = require('./datastores/livy');
const Athena = require('./datastores/athena');
const BigQuery = require('./datastores/bigquery');
const CSV = require('./datastores/csv');
const DataWorld = require('./datastores/dataworld');
const DatastoreMock = require('./datastores/datastoremock');
const Elasticsearch = require('./datastores/elasticsearch');
const IbmDb2 = require('./datastores/ibmdb2');
const Oracle = require('./datastores/oracle.js');
const Sql = require('./datastores/sql.js');
const S3 = require('./datastores/s3');
const Datastores = require('./datastores/index');

module.exports = {
    CONNECTION_CONFIG,
    Datastores,
    DIALECTS,
    SCHEMAS,
    ApacheDrill,
    ApacheImpala,
    ApacheLivy,
    Athena,
    BigQuery,
    CSV,
    DatastoreMock,
    DataWorld,
    Elasticsearch,
    IbmDb2,
    Oracle,
    Sql,
    S3
};
