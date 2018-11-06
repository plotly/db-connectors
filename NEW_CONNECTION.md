# Add New Data Source

## New Datastore file
This file should be added in the following location
src/datastores

```javascript

/**
 * The following function will connect to the datasource
 * @param {Object} connection
 * @returns {Promise} that resolves when the connection succeeds
 */ 
function connect(connection);

/**
 * The following function will return a list of schemas.  
 * @param {Object} connection 
 * @returns {Promise} that resolves to { 
 *                    columnnames: [ 'tablename', 'column_name','data_type' ], 
 *                    rows: [[tablename1, columnname1, datatype1], ...]] }
 */
function schemas(connection);

/**
 * The following function will return a list of tables.  
 * The return result should an array of strings
 * @param connection {object}
 * @returns {Promise} that resolves to an array of table names
 */
function tables(connection);

/**
 * The following function will execute a query against the 
 * data source.  The function should return a tuple which contains 
 * two elements.  The first is an array of strings which is the column names
 * The second is a two dimensional array which represents the rows to be displayed
 * @param {string|object} queryObject
 * @param {object} connection
 * @returns {Promise} that resolves to { columnnames, rows }
 */ 
function query(queryObject, connection); 

```

## Updating the Datastores.js 
The following are the instructions for updating the Datastores.js

1. Import the new Data source file
2. Update the function getDatastoreClient
``` javascript
    //The dialect name must match what was specified under
    //app/constants/constants.js for the Dialect name
    } else if (dialect === 'new dialect') {
        return MyNewDialect;
    }
```

