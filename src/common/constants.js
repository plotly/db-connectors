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

const ORACLE_ATTRIBUTES_SCHEMA = {
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
        connectionString: {
            type: 'string',
            label: 'Connection',
            errorMessage: 'Connection is required',
            description: `
                An Easy Connect string,
                a Net Service Name from a local 'tnsnames.ora' file or an external naming service,
                an SID of a local Oracle database instance,
                or leave empty to connect to the local default database.
                See https://oracle.github.io/node-oracledb/doc/api.html#connectionstrings for examples.
            `
        }
    },
    required: ['username','password', 'connectionString']
};

const SQLITE_ATTRIBUTES_SCHEMA = {
    type: 'object',
    properties:{
        storage: {
            type: 'string',
            label: 'Path to SQLite File',
            description: 'Type URL to a CSV file',
            errorMessage: 'Path is required'
        }
    },
    required: ['storage']
};


const ELASTICSEARCH_ATTRIBUTES_SCHEMA = {
    type: 'object',
    properties:{
        username: {
            type: 'string',
            label: 'Username',
            description: `
            These credentials are used to authenticate Elasticsearch instances
            that are protected with HTTP Basic Auth.
            You can leave this blank if your instance does not have
            HTTP Basic Auth.`,
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
    },
    required: ['host']
};


const S3_ATTRIBUTES_SCHEMA = {
    type: 'object',
    properties:{
        bucket: {
            type: 'string',
            label: 'S3 Bucket',
            description: `
            The S3 connection will import CSV files from any
            directory in your S3 bucket.`,
            errorMessage: 'S3 Bucket is required'
        },
        accessKeyId: {
            type: 'string',
            label: 'S3 Access Key ID',
            errorMessage: 'S3 Access Key ID is required'
        },
        secretAccessKey: {
            type: 'string',
            label: 'S3 Secret Access Key',
            errorMessage: 'S3 Secret Access Key is required'
        }
    },
    required: ['bucket', 'accessKeyId','secretAccessKey']
};


const APACHE_DRILL_ATTRIBUTES_SCHEMA = {
    type: 'object',
    properties:{
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
        bucket: {
            type: 'string',
            label: 'S3 Bucket',
            description: `
            The S3 connection will import CSV files from any
            directory in your S3 bucket.`,
            errorMessage: 'S3 Bucket is required'
        },
        accessKeyId: {
            type: 'string',
            label: 'S3 Access Key ID',
            errorMessage: 'S3 Access Key ID is required'
        },
        secretAccessKey: {
            type: 'string',
            label: 'S3 Secret Access Key',
            errorMessage: 'S3 Secret Access Key is required'
        }
    },
    required: ['host','port','bucket', 'accessKeyId','secretAccessKey']
};

const DATAWORLD_ATTRIBUTES_SCHEMA = {
    type: 'object',
    properties:{
        url: {
            type: 'string',
            label: 'Dataset/Project URL',
            description: `The URL of the dataset or project on data.world`,
            errorMessage: 'Dataset is required'
        },
        token: {
            type: 'string',
            label: 'Read/Write API Token',
            errorMessage: 'S3 Access Key ID is required',
            description: 'Your data.world read/write token. It can be obtained from https://data.world/settings/advanced'
        }
    },
    required: ['url', 'token']
};


const ATHENA_ATTRIBUTES_SCHEMA = {
    type: 'object',
    properties:{
        region: {
            type: 'string',
            label: 'Region',
            description: `The AWS region (i.e. us-east-1) where the database resides`,
            errorMessage: 'Region is required'
        },
        accessKeyId: {
            type: 'string',
            label: 'S3 Access Key ID',
            errorMessage: 'S3 Access Key ID is required'
        },
        secretAccessKey: {
            type: 'string',
            label: 'S3 Secret Access Key',
            errorMessage: 'S3 Secret Access Key is required'
        },
        bucket: {
            type: 'string',
            label: 'S3 Bucket',
            description: `
            The S3 connection will import CSV files from any
            directory in your S3 bucket.`,
            errorMessage: 'S3 Bucket is required'
        },
        database: {
            type: 'string',
            label: 'Database',
            errorMessage: 'S3 Secret Access Key is required'
        },
        queryInterval: {
            type: 'number',
            label: 'Query Interval',
            errorMessage: 'S3 Secret Access Key is required'
        },
    },
    required: ['region','accessKeyId','secretAccessKey','bucket', 'database']
};

const BIGQUERY_ATTRIBUTES_SCHEMA = {
    type: 'object',
    properties:{
        projectId: {
            type: 'string',
            label: 'Google Project Id',
            description: `The Google Cloud Project Id`,
            errorMessage: 'Project Id is required'
        },
        database: {
            type: 'string',
            label: 'Database',
            errorMessage: 'Database is required'
        },
        keyFilename:{
            type: 'string',
            label: 'Key File',
            description: `The location of the Google Service Account Key File`,
            errorMessage: 'Key File is required'
        }
    },
    required: ['projectId', 'database','keyFilename']
};

const SCHEMAS = {
    APACHE_DRILL_ATTRIBUTES_SCHEMA,
    ATHENA_ATTRIBUTES_SCHEMA,
    BIGQUERY_ATTRIBUTES_SCHEMA,
    CSV_ATTRIBUTES_SCHEMA,
    DATAWORLD_ATTRIBUTES_SCHEMA,
    ELASTICSEARCH_ATTRIBUTES_SCHEMA,
    HADOOP_ATTRIBUTES_SCHEMA,
    MSSQL_ATTRIBUTES_SCHEMA,
    ORACLE_ATTRIBUTES_SCHEMA,
    SQL_ATTRIBUTES_SCHEMA,
    SQLITE_ATTRIBUTES_SCHEMA,
    S3_ATTRIBUTES_SCHEMA
};

module.exports = {
    DIALECTS,
    SCHEMAS
};