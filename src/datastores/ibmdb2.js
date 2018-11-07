const ibmdb = require('ibm_db');
const {parseSQL} = require('../common/parse');
const clients = {};

function getClient(connection) {
    const connectionString = getConnectionString(connection);

    let client = clients[connectionString];
    if (!client) {
        client = new Promise(function(resolve, reject) {
            ibmdb.open(connectionString, function(err, conn) {
                if (err) reject(err);
                else resolve(conn);
            });
        });

        clients[connectionString] = client;
    }

    return client;
}

function getConnectionString(connection) {
    return `DATABASE=${connection.database};UID=${connection.username};PWD=${connection.password};` +
        `HOSTNAME=${connection.host};PORT=${connection.port};PROTOCOL=TCPIP`;
}

function connect(connection) {
    return getClient(connection);
}

function query(queryStmt, connection) {
    return getClient(connection)
        .then(function(client) {
            return new Promise(function(resolve, reject) {
                client.query(queryStmt, function(err, rows) {
                    if (err) reject(err);
                    else resolve(parseSQL(rows));
                });
            });
        });
}

const SYSTEM_SCHEMAS = ['SYSCAT', 'SYSIBM', 'SYSIBMADM', 'SYSPUBLIC', 'SYSSTAT', 'SYSTOOLS'];
const WHERE = SYSTEM_SCHEMAS.map(t => `CREATOR <> '${t}'`).join(' AND ');
const QUERY = `SELECT NAME, CREATOR FROM SYSIBM.SYSTABLES WHERE ${WHERE}`;

function tables(connection) {
    return getClient(connection)
        .then(function(client) {
            return new Promise(function(resolve, reject) {
                client.query(QUERY, function(err, rows) {
                    if (err) reject(err);
                    else resolve(rows.map(row => `${row.CREATOR}.${row.NAME}`));
                });
            });
        });
}

function schemas(connection) {
    return query(
        "SELECT TABNAME, COLNAME, TYPENAME FROM syscat.columns WHERE SUBSTR(TABSCHEMA,1,3) != 'SYS'",
        connection
    );
}

module.exports = {
    connect,
    query,
    schemas,
    tables
};
