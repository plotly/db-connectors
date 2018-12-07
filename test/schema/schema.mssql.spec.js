// do not use import, otherwise other test units won't be able to reactivate nock
const {assert,expect} = require('chai');
const {SCHEMAS} = require('../../src/common/constants');
const Validator = require('jsonschema').Validator;
let v;

describe('MSSQL Schema:', function () {

    before(function() {
        v = new Validator();
    });

    it('should validate a valid object agasint the schema', function() {
        const msSQLConnection = {
            username: 'root',
            password: '12345',
            host: '127.0.0.1',
            port: 5432,
            database:'plotly.db',
            instanceName: 'test',
            encrypt: true,
            connectTimeout: 15000,
            requestTimeout: 15000
        }
        let rst = v.validate( msSQLConnection, SCHEMAS.MSSQL_ATTRIBUTES_SCHEMA);
        assert(rst.valid);
    });

    it('should fail to validate mssql connection because missing username', function() {
        const msSQLConnection = {
            password: '12345',
            host: '127.0.0.1',
            port: 5432,
            database:'plotly.db',
            instanceName: 'test',
            encrypt: true,
            connectTimeout: 15000,
            requestTimeout: 15000
        }

        let rst;
        try{
            rst = v.validate( msSQLConnection, SCHEMAS.MSSQL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "username"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail to validate mssql connection because missing username', function() {
        const msSQLConnection = {
            username: 'root',
            host: '127.0.0.1',
            port: 5432,
            database:'plotly.db',
            instanceName: 'test',
            encrypt: true,
            connectTimeout: 15000,
            requestTimeout: 15000
        }

        let rst;
        try{
            rst = v.validate( msSQLConnection, SCHEMAS.MSSQL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "password"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail to validate mssql connection because missing host', function() {
        const msSQLConnection = {
            username: 'root',
            password: '12345',
            port: 5432,
            database:'plotly.db',
            instanceName: 'test',
            encrypt: true,
            connectTimeout: 15000,
            requestTimeout: 15000
        }

        let rst;
        try{
            rst = v.validate( msSQLConnection, SCHEMAS.MSSQL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "host"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail to validate mssql connection because missing port', function() {
        const msSQLConnection = {
            username: 'root',
            password: '12345',
            host: '127.0.0.1',
            database:'plotly.db',
            instanceName: 'test',
            encrypt: true,
            connectTimeout: 15000,
            requestTimeout: 15000
        }

        let rst;
        try{
            rst = v.validate( msSQLConnection, SCHEMAS.MSSQL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "port"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail to validate mssql connection because missing database', function() {
        const msSQLConnection = {
            username: 'root',
            password: '12345',
            host: '127.0.0.1',
            port: 5433,
            instanceName: 'test',
            encrypt: true,
            connectTimeout: 15000,
            requestTimeout: 15000
        }

        let rst;
        try{
            rst = v.validate( msSQLConnection, SCHEMAS.MSSQL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "database"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail to validate mssql connection because missing instanceName', function() {
        const msSQLConnection = {
            username: 'root',
            password: '12345',
            host: '127.0.0.1',
            port: 5433,
            database: 'plot.db',
            encrypt: true,
            connectTimeout: 15000,
            requestTimeout: 15000
        }

        let rst;
        try{
            rst = v.validate( msSQLConnection, SCHEMAS.MSSQL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "instanceName"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail to validate mssql connection because missing connectTimeout', function() {
        const msSQLConnection = {
            username: 'root',
            password: '12345',
            host: '127.0.0.1',
            port: 5433,
            database: 'plot.db',
            encrypt: true,
            instanceName:'test',
            requestTimeout: 15000
        }

        let rst;
        try{
            rst = v.validate( msSQLConnection, SCHEMAS.MSSQL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "connectTimeout"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail to validate mssql connection because missing crequestTimeout', function() {
        const msSQLConnection = {
            username: 'root',
            password: '12345',
            host: '127.0.0.1',
            port: 5433,
            database: 'plot.db',
            encrypt: true,
            instanceName:'test',
            connectTimeout: 15000
        }

        let rst;
        try{
            rst = v.validate( msSQLConnection, SCHEMAS.MSSQL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "requestTimeout"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });
});
