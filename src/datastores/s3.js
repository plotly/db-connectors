const AWS = require('aws-sdk');
const {parseCSV} = require('../common/parse.js');

function createClient(connection) {
    AWS.config.update({
        accessKeyId: connection.accessKeyId,
        secretAccessKey: connection.secretAccessKey
    });
    return new AWS.S3();
}

function connect(connection) {
    const {bucket} = connection;
    const client = createClient(connection);
    return new Promise((resolve, reject) => {
        client.listObjects({Bucket: bucket}, err => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/*
 * Download a (csv) file from S3, parse it
 * and return the results.
 */
function query(key, connection) {
    const {bucket} = connection;
    const client = createClient(connection);
    return new Promise((resolve, reject) => {
        client.getObject({Bucket: bucket, Key: key}, (err, response) => {
            if (err) {
                reject(err);
                return;
            }
            const textData = response.Body.toString();
            // TODO ^ handle binary files too
            parseCSV(textData).then(resolve);
        });
    });
}

/*
 * List all of the files in an S3 bucket
 */
function files(connection) {
    const {bucket} = connection;
    const client = createClient(connection);
    return new Promise((resolve, reject) => {
        client.listObjects({Bucket: bucket}, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data.Contents);
        });
    });
}

module.exports = {
    files,
    query,
    connect
};