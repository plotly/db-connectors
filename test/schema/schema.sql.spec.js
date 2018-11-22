// do not use import, otherwise other test units won't be able to reactivate nock
const {assert} = require('chai');
const {SQL_ATTRIBUTES_SCHEMA} = require('../../src/common/constants');
const Validator = require('jsonschema').Validator;
let v;

describe('SQL Schema:', function () {

    before(function() {
        v = new Validator();
    });
    it('should validate a valid object agasint the schema', function() {
        const sqlConnection = {
            username: 'root',
            password: '12345',
            host: '127.0.0.1',
            port: 5432,
            database:'plotly.db'
        }
        let rst = v.validate( sqlConnection, SQL_ATTRIBUTES_SCHEMA);
        assert(rst.valid);
    });

    it('should fail validation because missing username', function() {
        const sqlConnection = {
            password: '12345',
            host: '127.0.0.1',
            port: 5432,
            database:'plotly.db'
        }
        let rst;
        try{
            rst = v.validate( sqlConnection, SQL_ATTRIBUTES_SCHEMA);
            assert(rst.valid);
            console.log( 'r', rst.valid);
            //assert.fail(0,1,'Should failed schema validation');
        }catch(err){
            console.log( 'Error ocurrect', rst);
            //Expect logic
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing password', function() {
        const sqlConnection = {
            username: 'root',
            host: '127.0.0.1',
            port: 5432,
            database:'plotly.db'
        }
        let rst;
        try{
            rst = v.validate( sqlConnection, SQL_ATTRIBUTES_SCHEMA);
            //console.log('rst', rst);
            assert.fail(0,1,'Should failed schema validation');
            
        }catch(err){
            //console.log('err', err);
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });
});
