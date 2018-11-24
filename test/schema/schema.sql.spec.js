// do not use import, otherwise other test units won't be able to reactivate nock
const {assert,expect} = require('chai');
const {SCHEMAS} = require('../../src/common/constants');
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
        let rst = v.validate( sqlConnection, SCHEMAS.SQL_ATTRIBUTES_SCHEMA);
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
            rst = v.validate( sqlConnection, SCHEMAS.SQL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "username"');
        }catch(err){
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
            rst = v.validate( sqlConnection, SCHEMAS.SQL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "password"');
            
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing host', function() {
        const sqlConnection = {
            username: 'root',
            password: '12345',
            port: 5432,
            database:'plotly.db'
        }
        let rst;
        try{
            rst = v.validate( sqlConnection, SCHEMAS.SQL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "host"');
        }catch(err){
            assert.isOk(rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing database', function() {
        const sqlConnection = {
            username: 'root',
            password: '12345',
            port: 5432,
            database:'plotly.db'
        }
        let rst;
        try{
            rst = v.validate( sqlConnection, SCHEMAS.SQL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "host"');
        }catch(err){
            assert.isOk(rst.valid, 'Test Passed failed validation');
        }
    });
});
