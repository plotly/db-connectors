
const {merge} = require('ramda');

// Returns a function to be used in a Promise chain that asserts a response status
function assertResponseStatus(expectedStatus) {
    // create error here to preserve caller stack trace
    const statusError = new Error();

    return function(response) {
        if (response.status !== expectedStatus) {
            return response.text().then(body => {
                statusError.message = `Expected status: ${expectedStatus}. Status: ${response.status}. Body: ${body}.`;
                throw statusError;
            });
        }

        return response;
    };
}

// Parse a fetch response as JSON; in case of failure include status and body in the error message
function getResponseJson(response) {
    // create error here to preserve caller stack trace
    const jsonError = new Error();

    return response.text().then(text => {
        try {
            return JSON.parse(text);
        } catch (err) {
            jsonError.message = `${err.message}. Status: ${response.status}. Body: ${text}.`;
            throw jsonError;
        }
    });
}




const sqlConnections = {
    username: 'masteruser',
    password: 'connecttoplotly',
    database: 'plotly_datasets',
    port: 5432,
    host: 'readonly-test-postgres.cwwxgcilxwxw.us-west-2.rds.amazonaws.com',
    dialect: 'postgres'
};

const postgresConnection = sqlConnections;
const postgisConnection = merge(
    postgresConnection, {database: 'postgis'}
);
const mysqlConnection = {
    dialect: 'mysql',
    username: 'masteruser',
    password: 'connecttoplotly',
    host: 'readonly-test-mysql.cwwxgcilxwxw.us-west-2.rds.amazonaws.com',
    port: 3306,
    database: 'plotly_datasets'
};
const mariadbConnection = {
    dialect: 'mariadb',
    username: 'masteruser',
    password: 'connecttoplotly',
    host: 'readonly-test-mariadb.cwwxgcilxwxw.us-west-2.rds.amazonaws.com',
    port: 3306,
    database: 'plotly_datasets'
};
const redshiftConnection = {
    dialect: 'redshift',
    username: 'plotly',
    password: 'Qmbdf#3DU]pP8a=CKTK}',
    host: 'sql-connector-test.cfiaqtidutxu.us-east-1.redshift.amazonaws.com',
    port: 5439,
    database: 'plotly_datasets'
};
const mssqlConnection = {
    dialect: 'mssql',
    username: 'masteruser',
    password: 'connecttoplotly',
    host: 'test-mssql.cwwxgcilxwxw.us-west-2.rds.amazonaws.com',
    instanceName: '',
    port: 1433,
    database: 'plotly_datasets',
    encrypt: true
};
const elasticsearchConnections = {
    dialect: 'elasticsearch',
    host: 'https://67a7441549120daa2dbeef8ac4f5bb2e.us-east-1.aws.found.io',
    port: '9243'
};
const publicReadableS3Connections = {
    dialect: 's3',
    bucket: 'plotly-s3-connector-test',
    accessKeyId: 'AKIAIMHMSHTGARJYSKMQ',
    secretAccessKey: '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'
};
const apacheDrillConnections = {
    dialect: 'apache drill',
    host: 'http://ec2-35-164-71-216.us-west-2.compute.amazonaws.com',
    port: 8047,

    bucket: 'plotly-s3-connector-test',
    accessKeyId: 'AKIAIMHMSHTGARJYSKMQ',
    secretAccessKey: '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'
};
const sqliteConnection = {
    dialect: 'sqlite',
    storage: `${__dirname}/plotly_datasets.db`
};
const apacheImpalaConnection = {
    dialect: 'apache impala',
    host: 'impala.test.plotly.host',
    port: 21000,
    database: 'plotly'
};
const dataWorldConnection = {
    url: 'https://data.world/falcon/test-dataset',
    token: 'token'
};

// TODO - Add sqlite here
// TODO - Add postgis in here

const testConnections = [
    postgresConnection,
    mysqlConnection,
    mariadbConnection,
    redshiftConnection,
    mssqlConnection,
    sqliteConnection,
    elasticsearchConnections,
    publicReadableS3Connections,
    apacheDrillConnections,
    apacheImpalaConnection
];

const testSqlConnections = [
    postgresConnection,
    mysqlConnection,
    mariadbConnection,
    redshiftConnection,
    mssqlConnection,
    apacheImpalaConnection
];


/* eslint-enable max-len */

class MockedServerCA {

    constructor() {
        this.port = 9494;
        this.count = 0;
        this.server = restify.createServer({});

        this.countUp = this.countUp.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }

    countUp() {
        this.count += 1;
    }

    start(returnStatus, returnContent) {
        const that = this;
        const server = this.server;
        server.use(restify.queryParser());
        server.use(restify.bodyParser({mapParams: true}));

        /*
         * CORS doesn't quite work by default in restify,
         * see https://github.com/restify/node-restify/issues/664
         */
        const headers = [
            'authorization',
            'withcredentials',
            'x-requested-with',
            'x-forwarded-for',
            'x-real-ip',
            'x-customheader',
            'user-agent',
            'keep-alive',
            'host',
            'accept',
            'connection',
            'upgrade',
            'content-type',
            'dnt',
            'if-modified-since',
            'cache-control'
        ];
        server.use(restify.CORS({
            origins: ['*'],
            headers: headers
        }));
        headers.forEach(header => restify.CORS.ALLOW_HEADERS.push(header));
        server.opts(/.*/, function (req, res) {
            res.header(
                'Access-Control-Allow-Headers',
                restify.CORS.ALLOW_HEADERS.join(', ')
            );
            res.header(
                'Access-Control-Allow-Methods',
                'POST, GET, DELETE, OPTIONS'
            );
            res.send(204);
        });

        server.listen(this.port);

        server.post('/certificate', function pingHandler(req, res) {
            that.countUp();
            res.json(returnStatus, returnContent);
        });
    }

    stop() {
        const server = this.server;
        server.close();
    }
}


const apacheDrillStorage = [
  {
    'name': 'cp',
    'config': {
      'type': 'file',
      'enabled': false,
      'connection': 'classpath:///',
      'config': null,
      'workspaces': null,
      'formats': {
        'csv': {
          'type': 'text',
          'extensions': [
            'csv'
          ],
          'delimiter': ','
        },
        'tsv': {
          'type': 'text',
          'extensions': [
            'tsv'
          ],
          'delimiter': '\t'
        },
        'json': {
          'type': 'json',
          'extensions': [
            'json'
          ]
        },
        'parquet': {
          'type': 'parquet'
        },
        'avro': {
          'type': 'avro'
        },
        'csvh': {
          'type': 'text',
          'extensions': [
            'csvh'
          ],
          'extractHeader': true,
          'delimiter': ','
        }
      }
    }
  },
  {
    'name': 'dfs',
    'config': {
      'type': 'file',
      'enabled': false,
      'connection': 'file:///',
      'config': null,
      'workspaces': {
        'root': {
          'location': '/',
          'writable': false,
          'defaultInputFormat': null
        },
        'tmp': {
          'location': '/tmp',
          'writable': true,
          'defaultInputFormat': null
        }
      },
      'formats': {
        'psv': {
          'type': 'text',
          'extensions': [
            'tbl'
          ],
          'delimiter': '|'
        },
        'csv': {
          'type': 'text',
          'extensions': [
            'csv'
          ],
          'delimiter': ','
        },
        'tsv': {
          'type': 'text',
          'extensions': [
            'tsv'
          ],
          'delimiter': '\t'
        },
        'parquet': {
          'type': 'parquet'
        },
        'json': {
          'type': 'json',
          'extensions': [
            'json'
          ]
        },
        'avro': {
          'type': 'avro'
        },
        'sequencefile': {
          'type': 'sequencefile',
          'extensions': [
            'seq'
          ]
        },
        'csvh': {
          'type': 'text',
          'extensions': [
            'csvh'
          ],
          'extractHeader': true,
          'delimiter': ','
        }
      }
    }
  },
  {
    'name': 'hbase',
    'config': {
      'type': 'hbase',
      'config': {
        'hbase.zookeeper.quorum': 'localhost',
        'hbase.zookeeper.property.clientPort': '2181'
      },
      'size.calculator.enabled': false,
      'enabled': false
    }
  },
  {
    'name': 'hive',
    'config': {
      'type': 'hive',
      'enabled': false,
      'configProps': {
        'hive.metastore.uris': '',
        'javax.jdo.option.ConnectionURL': 'jdbc:derby:;databaseName=../sample-data/drill_hive_db;create=true',
        'hive.metastore.warehouse.dir': '/tmp/drill_hive_wh',
        'fs.default.name': 'file:///',
        'hive.metastore.sasl.enabled': 'false'
      }
    }
  },
  {
    'name': 'kudu',
    'config': {
      'type': 'kudu',
      'masterAddresses': '1.2.3.4',
      'enabled': false
    }
  },
  {
    'name': 'mongo',
    'config': {
      'type': 'mongo',
      'connection': 'mongodb://localhost:27017/',
      'enabled': false
    }
  },
  {
    'name': 's3',
    'config': {
      'type': 'file',
      'enabled': true,
      'connection': 's3a://plotly-s3-connector-test',
      'config': {
          'fs.s3a.access.key': 'AKIAIMHMSHTGARJYSKMQ',
          'fs.s3a.secret.key': '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'
      },
      'workspaces': {
        'root': {
          'location': '/',
          'writable': true,
          'defaultInputFormat': null
        }
      },
      'formats': {
        'csv': {
          'type': 'text',
          'extensions': [
            'csv'
          ],
          'delimiter': ',',
          'extractHeader': true
        },
        'parquet': {
          'type': 'parquet'
        }
      }
    }
  }
];

const dataWorldTablesResponse = [
    {
        'fields': [
            {
                'name': 'tableId',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'tableName',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'tableTitle',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'tableDescription',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'owner',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'dataset',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            }
        ]
    },
    {
        'tableId': 'sampletable',
        'tableName': 'sampletable',
        'tableTitle': 'sampletable',
        'tableDescription': null,
        'owner': 'falcon',
        'dataset': 'sample-dataset'
    }
];

const dataWorldQueryResponse = [
    {
        'fields': [
            {
                'name': 'stringcolumn',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'datecolumn',
                'type': 'date',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#date'
            },
            {
                'name': 'decimalcolumn',
                'type': 'decimal',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#decimal'
            }
        ]
    },
    {
        'stringcolumn': 'First column',
        'datecolumn': '2017-05-24',
        'decimalcolumn': 1
    },
    {
        'stringcolumn': 'Second column',
        'datecolumn': '2017-05-25',
        'decimalcolumn': 2
    },
    {
        'stringcolumn': 'Third column',
        'datecolumn': '2017-05-26',
        'decimalcolumn': 3
    },
    {
        'stringcolumn': 'Fourth column',
        'datecolumn': '2017-05-27',
        'decimalcolumn': 4
    },
    {
        'stringcolumn': 'Fifth column',
        'datecolumn': '2017-05-28',
        'decimalcolumn': 5
    }
];

const dataWorldColumnsResponse = [
    {
        'fields': [
            {
                'name': 'tableId',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'tableName',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'columnIndex',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'columnName',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'columnTitle',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'columnDescription',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'columnDatatype',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'columnNullable',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'owner',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            },
            {
                'name': 'dataset',
                'type': 'string',
                'rdfType': 'http://www.w3.org/2001/XMLSchema#string'
            }
        ]
    },
    {
        'tableId': 'sampletable',
        'tableName': 'sampletable',
        'columnIndex': 1,
        'columnName': 'stringcolumn',
        'columnTitle': 'stringcolumn',
        'columnDescription': null,
        'columnDatatype': 'http://www.w3.org/2001/XMLSchema#string',
        'columnNullable': false,
        'owner': 'falcon',
        'dataset': 'test-dataset'
    },
    {
        'tableId': 'sampletable',
        'tableName': 'sampletable',
        'columnIndex': 2,
        'columnName': 'datecolumn',
        'columnTitle': 'datecolumn',
        'columnDescription': null,
        'columnDatatype': 'http://www.w3.org/2001/XMLSchema#date',
        'columnNullable': false,
        'owner': 'falcon',
        'dataset': 'test-dataset'
    },
    {
        'tableId': 'sampletable',
        'tableName': 'sampletable',
        'columnIndex': 3,
        'columnName': 'decimalcolumn',
        'columnTitle': 'decimalcolumn',
        'columnDescription': null,
        'columnDatatype': 'http://www.w3.org/2001/XMLSchema#decimal',
        'columnNullable': false,
        'owner': 'falcon',
        'dataset': 'test-dataset'
    }
];


module.exports = {
    assertResponseStatus,
    getResponseJson,
    sqlConnections,
    postgresConnection,
    postgisConnection,
    mysqlConnection,
    mariadbConnection,
    redshiftConnection,
    mssqlConnection,
    elasticsearchConnections,
    publicReadableS3Connections,
    apacheDrillConnections,
    sqliteConnection,
    apacheImpalaConnection,
    dataWorldConnection,
    dataWorldColumnsResponse,
    dataWorldQueryResponse,
    dataWorldTablesResponse,
    apacheDrillStorage,
    testConnections,
    testSqlConnections,
    MockedServerCA
}