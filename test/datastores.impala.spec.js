const {assert} = require('chai');

const {apacheImpalaConnection } = require('./utils.js');
const { connect, tables
} = require('../src/index');

// Suppressing ESLint cause Mocha ensures `this` is bound in test functions
/* eslint-disable no-invalid-this */
describe('Apache Impala:', function () {

    it('connect succeeds', function() {
        this.timeout(180 * 1000);
        return connect(apacheImpalaConnection);
    });


    it('tables returns list of tables', function() {
        return tables(apacheImpalaConnection).then(result => {
            const tableName = (apacheImpalaConnection.database) ?
                `${apacheImpalaConnection.database}.ALCOHOL_CONSUMPTION_BY_COUNTRY_2010`.toUpperCase() :
                'ALCOHOL_CONSUMPTION_BY_COUNTRY_2010';

            assert.deepEqual(result, [tableName]);
        });
    });

    // TODO This is failing and needs to be turned back on
    /*it('query returns rows and column names', function() {
        const tableName = (apacheImpalaConnection.database) ?
            `${apacheImpalaConnection.database}.ALCOHOL_CONSUMPTION_BY_COUNTRY_2010`.toUpperCase() :
            'ALCOHOL_CONSUMPTION_BY_COUNTRY_2010';

        return query(`SELECT * FROM ${tableName}\nLIMIT 5`, apacheImpalaConnection).then(results => {
            assert.deepEqual(results.rows, [
                ['Belarus', '17.5'],
                ['Moldova', '16.8'],
                ['Lithuania', '15.4'],
                ['Russia', '15.1'],
                ['Romania', '14.4']
            ]);
            assert.deepEqual(results.columnnames, ['loc', 'alcohol']);
        });
    });*/

    it('connect for invalid credentials fails', function() {
        apacheImpalaConnection.host = 'http://lah-lah.lemons.com';

        return connect(apacheImpalaConnection).catch(err => {
            // reset hostname
            apacheImpalaConnection.host = '35.184.155.127';

            assert.equal(err, ('Error: Error: getaddrinfo ENOTFOUND ' +
                               'http://lah-lah.lemons.com ' +
                               'http://lah-lah.lemons.com:21000'));
        });
    });
});
/* eslint-enable no-invalid-this */
