
const axios = require('axios');

const getDialects = function(url){
    axios.get(`${url}/common/dialects`).then( resp =>{
        // to be completed
    }).catch( err =>{
        // to be completed
    });
}

const getSchema = function(url, dialect){
    axios.get(`${url}/common/schema/${dialect}`).then( resp =>{
        // to be completed
    }).catch( err =>{
        // to be completed
    });
}

/**
 * The following method will execute the query against the server
 * @param {string} url 
 * @param {object} connection 
 * @param {string} queryStatement 
 */
const connect = function( url, connection){
    axios.post(`${url}/connect`, {connection}).then( resp =>{
        // to be completed
    }).catch( err =>{
        // to be completed
    });
}

/**
 * The following method will execute the query against the server
 * @param {string} url 
 * @param {object} connection 
 * @param {string} queryStatement 
 */
const query = function( url, connection, queryStatement){
    axios.post(`${url}/query`, {connection, queryStatement}).then( resp =>{
        // to be completed
    }).catch( err =>{
        // to be completed
    });
}


module.exports = {
    getDialects,
    getSchema,
    query,
    connect
}