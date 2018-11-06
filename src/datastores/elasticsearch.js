const {parseElasticsearch} = require('../common/parse');
const fetch = require('node-fetch');

const KEEP_ALIVE_FOR = '1m'; // minutes
const MAX_RESULTS_SIZE = 10 * 1000;

/**
 * The following method will send a request against ElasticSearch
 * @param {string} relativeUrl URL to ElasticSearch
 * @param {object} connection Connection Parameters
 * @param {object} param2 Additional parametres
 * @returns {Promise} Promise result from ElasticSearch Request
 */
function request(relativeUrl, connection, {body, method, queryStringParams = ''}) {
    const {host, port, username, password} = connection;
    let url;
    if (typeof port !== 'undefined' && port !== '') {
        url = `${host}:${port}/${relativeUrl}?format=json${queryStringParams}`;
    } else {
        url = `${host}/${relativeUrl}?format=json${queryStringParams}`;
    }
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
    if (username && password) {
        headers.Authorization = 'Basic ' + new Buffer(
            username + ':' + password
        ).toString('base64');
    }
    return fetch(url, {
        headers,
        method,
        body: body ? JSON.stringify(body) : null
    });
}

/**
 * The method will open a connection to Elastic Search
 * @param {object} connection Connection parameters
 * @returns {Promise} The connection result
 */
function connect(connection) {
    return request('_cat/indices/', connection, {method: 'GET'});
}

/**
 * The following method will execute the query against
 * @param {string} queryStmt The query statement to execute
 * @param {object} connection The connection object
 * @returns {Promise} The result of the query
 */
function query(queryStmt, connection) {
    const queryObject = JSON.parse(queryStmt);
    const {body, index, type} = queryObject;
    /*
     * If size is not defined or smaller than 10K, keep scroll disabled and
     * let elasticsearch handle it, which it defaults right now to 10.
     * If it is, and it is higher than 10K then enable scroll.
     */
    const scrollEnabled = parseInt(body.size, 10) > MAX_RESULTS_SIZE;
    /*
     * In order to use scrolling, the initial search request should specify
     * the scroll parameter in the query string, which tells Elasticsearch
     * how long it should keep the “search context” alive.
     */
    const scrollParam = scrollEnabled ? `&scroll=${KEEP_ALIVE_FOR}` : '';

    return elasticsearchMappings(connection)
    .then(mappings => {
        const mapping = mappings[index].mappings[type].properties;
        return request(`${index}/${type}/_search`, connection, {
            body,
            method: 'POST',
            queryStringParams: scrollParam
        })
        .then(res => res.json().then(results => {
            if (res.status === 200) {
                return parseElasticsearch(body, results, mapping);
            }
            throw new Error(JSON.stringify(results));
        }));
    });
}

/**
 * The following function will return a list of elastic search mappings
 * @param {object} connection The connection object
 * @returns {Promise} A list of the elastic search mappings
 */
function elasticsearchMappings(connection) {
    return request('_all/_mappings', connection, {method: 'GET'})
    .then(res => res.json());
}

module.exports = {
    connect,
    elasticsearchMappings,
    query
};