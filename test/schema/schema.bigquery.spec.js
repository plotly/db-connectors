// do not use import, otherwise other test units won't be able to reactivate nock
const {assert,expect} = require('chai');
const {SCHEMAS} = require('../../src/common/constants');
const Validator = require('jsonschema').Validator;
let v;

describe('Big Query Schema:', function () {

    before(function() {
        v = new Validator();
    });
    it('should validate a valid object agasint the schema', function() {
        const bigQueryConnection = {
            projectId: 'query-123123',
            database: 'plot.ly',
            keyFilename: '/home/user/test'
        };
        let rst = v.validate( bigQueryConnection, SCHEMAS.BIGQUERY_ATTRIBUTES_SCHEMA);
        assert(rst.valid);
    });

    it('should fail validation because missing project Id', function() {
        const bigQueryConnection = {
            database: 'plot.ly',
            keyFilename: '/home/user/test'
        };
        let rst;
        try{
            rst = v.validate( bigQueryConnection, SCHEMAS.BIGQUERY_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "projectId"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing database', function() {
        const bigQueryConnection = {
            projectId: 'query-123123',
            keyFilename: '/home/user/test'
        };
        let rst;
        try{
            rst = v.validate( bigQueryConnection, SCHEMAS.BIGQUERY_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "database"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing keyFilename', function() {
        const bigQueryConnection = {
            projectId: 'query-123123',
            database: 'plot.ly'
        };
        let rst;
        try{
            rst = v.validate( bigQueryConnection, SCHEMAS.BIGQUERY_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "keyFilename"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });
});
