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

    properties:{
        username:{
            type:'string',
            label: 'Username',
            errorMessage: 'Username is required'
        },
        password:{
            type:'string',
            label: 'Username',
            errorMessage: 'Password is required'
        },
        host:{
            type:'string',
            label: 'Host',
            errorMessage: 'Host is required'
        },
        port:{
            type:'number',
            label: 'Port',
            errorMessage: 'Port is required',
            description: 'Server port number (e.g. 3306)'
        },
        database:{
            type:'string',
            label: 'Database',
            errorMessage: 'Database is required'
        }
    },
    required:['username','password','host','port','database']
    
};

module.exports = {
    DIALECTS,
    SQL_ATTRIBUTES_SCHEMA
};