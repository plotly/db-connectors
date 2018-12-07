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
            label: 'Username',
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

const HADOOP_ATTRIBUTES_SCHEMA = {
    type: 'object',
    properties:{
        host: {
            type: 'string',
            label: 'Host',
            errorMessage: 'Host is required'
        },
        port:{
            type: 'number',
            label: 'Port',
            errorMessage: 'Port is required'
        },
        database:{
            type: 'string',
            label: 'Port',
            errorMessage: 'Database is not defined',
            description: 'Database Name (Optional). If database name is not specified, all tables are returned.'
        },
        timeout:{
            type: 'number',
            label: 'Timeout',
            errorMessage: 'Database is not defined',
            description: 'Number of seconds for a request to timeout.'
        }
    },
    required: ['host', 'port', 'timeout']

};

const CSV_ATTRIBUTES_SCHEMA = {
    type: 'object',
    properties:{
        file: {
            type: 'string',
            label: 'CSV File',
            description: 'Type URL to a CSV file',
            errorMessage: 'CSV File is required'
        }
    },
    required: ['file']
};

const MSSQL_ATTRIBUTES_SCHEMA = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
            label: 'Username',
            errorMessage: 'Username is required'
        },
        password: {
            type: 'string',
            label: 'Username',
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
        },
        instanceName: {
            label: 'Instance Name',
            description: `
                If your SQL Server was configured using an instance name
                instead of a port, then set this option.
                Note that if this option is specified, then the port
                will be ignored.
                For this to work, the SQL Server Browser service
                must be running on the database server
                and UDP port 1444 on the database server must be reachable.
            `,
            type: 'text',
            errorMessage: 'Instance Name is required'
        },
        encrypt: {
            label: 'Encrypt Connection',
            description: `
                If selected, the connection will be encrypted.
                Select this option if you're on Windows Azure.
            `,
            type: 'boolean',
        },
        connectTimeout: {
            label: 'Connection Timeout',
            description: `
                The number of milliseconds before the
                attempt to connect is considered failed
                (default: 15000).
            `,
            type: 'number',
            errorMessage: 'Connection Timeout is required'
        },
        requestTimeout: {
            label: 'Request Timeout',
            description: `
                The number of milliseconds before a request is considered
                failed, or 0 for no timeout (default: 15000).
            `,
            type: 'number',
            errorMessage: 'Request Timeout is required'
        }
    },
    required: ['username', 'password', 'host', 'port', 'database','instanceName', 'connectTimeout', 'requestTimeout']
};

const SCHEMAS = {
    CSV_ATTRIBUTES_SCHEMA,
    HADOOP_ATTRIBUTES_SCHEMA,
    MSSQL_ATTRIBUTES_SCHEMA,
    SQL_ATTRIBUTES_SCHEMA
};

module.exports = {
    DIALECTS,
    SCHEMAS
};