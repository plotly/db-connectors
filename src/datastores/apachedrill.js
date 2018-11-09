const fetch = require('node-fetch');
const S3 = require('./s3.js');


function connect(connection) {
    const {host, port} = connection;
    const url = `${host}:${port}/query.json`;
    return fetch(url);
}

function query(queryStatement, connection) {
    const {host, port} = connection;
    const url = `${host}:${port}/query.json`;

    return new Promise((resolve, reject) => {
        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                queryType: 'SQL',
                query: queryStatement
            })
        })
        .then(response => response.json())
        .then(json => {
            const {errorMessage, rows, columns} = json;
            if (errorMessage) {
                reject({message: errorMessage});
            } else {
                resolve({
                    rows: rows.map(row => columns.map(c => row[c])),
                    columnnames: columns
                });
            }
        })
        .catch(reject);
    });

}

function storage(connection) {
    const {host, port} = connection;
    const url = `${host}:${port}/storage.json`;
    return fetch(url).then(res => res.json());
}

// TODO - Make this more flexible?
function listS3Files(connection) {
    return S3.files({
        bucket: connection.bucket,
        accessKeyId: connection.accessKeyId,
        secretAccessKey: connection.secretAccessKey
    });
}


module.exports = {
    connect,
    listS3Files,
    query,
    storage
};