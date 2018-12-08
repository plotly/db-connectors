// do not use import, otherwise other test units won't be able to reactivate nock
const {assert,expect} = require('chai');
const {SCHEMAS} = require('../../src/common/constants');
const Validator = require('jsonschema').Validator;
let v;

describe('Athena Schema:', function () {

    before(function() {
        v = new Validator();
    });
    it('should validate a valid object agasint the schema', function() {
        const athenaConnection = {
            region: 'us-east-1',
            accessKeyId: '123456789',
            secretAccessKey: 'secret',
            bucket: 'plotly-test',
            database: 'plotly',
            queryInterval: 1000
        };
        let rst = v.validate( athenaConnection, SCHEMAS.ATHENA_ATTRIBUTES_SCHEMA);
        assert(rst.valid);
    });

    it('should fail validation because missing region', function() {
        const athenaConnection = {
            accessKeyId: '123456789',
            secretAccessKey: 'secret',
            bucket: 'plotly-test',
            database: 'plotly',
            queryInterval: 1000
        };
        let rst;
        try{
            rst = v.validate( athenaConnection, SCHEMAS.ATHENA_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "region"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing accessKeyId', function() {
        const athenaConnection = {
            region: 'us-east-1',
            secretAccessKey: 'secret',
            bucket: 'plotly-test',
            database: 'plotly',
            queryInterval: 1000
        };
        let rst;
        try{
            rst = v.validate( athenaConnection, SCHEMAS.ATHENA_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "accessKeyId"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });  

    it('should fail validation because missing secretAccessKey', function() {
        const athenaConnection = {
            region: 'us-east-1',
            accessKeyId: '123456789',
            bucket: 'plotly-test',
            database: 'plotly',
            queryInterval: 1000
        };
        let rst;
        try{
            rst = v.validate( athenaConnection, SCHEMAS.ATHENA_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "secretAccessKey"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });  

    it('should fail validation because missing bucket', function() {
        const athenaConnection = {
            region: 'us-east-1',
            accessKeyId: '123456789',
            secretAccessKey: 'secret',
            database: 'plotly',
            queryInterval: 1000
        };
        let rst;
        try{
            rst = v.validate( athenaConnection, SCHEMAS.ATHENA_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "bucket"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing database', function() {
        const athenaConnection = {
            region: 'us-east-1',
            accessKeyId: '123456789',
            secretAccessKey: 'secret',
            bucket: 'plotly-test',
            queryInterval: 1000
        };
        let rst;
        try{
            rst = v.validate( athenaConnection, SCHEMAS.ATHENA_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "database"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

});
