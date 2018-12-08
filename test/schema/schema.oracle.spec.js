// do not use import, otherwise other test units won't be able to reactivate nock
const {assert,expect} = require('chai');
const {SCHEMAS} = require('../../src/common/constants');
const Validator = require('jsonschema').Validator;
let v;

describe('Oracle Schema:', function () {

    before(function() {
        v = new Validator();
    });
    it('should validate a valid object agasint the oracle schema', function() {
        const oracleConnection = {
            username: 'root',
            password: '12345',
            connectionString: 'Provider=OraOLEDB.Oracle;dbq=localhost:1521/XE;Database=myDataBase;'
        }
        let rst = v.validate( oracleConnection, SCHEMAS.ORACLE_ATTRIBUTES_SCHEMA);
        assert(rst.valid);
    });

    it('should fail validation because missing username', function() {
        const oracleConnection = {
            password: '12345',
            connectionString: 'Provider=OraOLEDB.Oracle;dbq=localhost:1521/XE;Database=myDataBase;'
        };
        let rst;
        try{
            rst = v.validate( oracleConnection, SCHEMAS.ORACLE_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "username"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing password', function() {
        const oracleConnection = {
            username: 'root',
            connectionString: 'Provider=OraOLEDB.Oracle;dbq=localhost:1521/XE;Database=myDataBase;'
        };
        let rst;
        try{
            rst = v.validate( oracleConnection, SCHEMAS.ORACLE_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "password"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing connectionString', function() {
        const oracleConnection = {
            username: 'root',
            password: '12345'
        };
        let rst;
        try{
            rst = v.validate( oracleConnection, SCHEMAS.ORACLE_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "connectionString"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });
});
