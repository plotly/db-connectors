// do not use import, otherwise other test units won't be able to reactivate nock
const {assert,expect} = require('chai');
const {SCHEMAS} = require('../../src/common/constants');
const Validator = require('jsonschema').Validator;
let v;

describe('Apache Drill Schema:', function () {

    before(function() {
        v = new Validator();
    });
    it('should validate a valid object agasint the schema', function() {
        const apacheDrillConnection = {
            host: 'localhost',
            port: 9000,
            bucket: 'plotly-test',
            accessKeyId: '123456789',
            secretAccessKey: 'secret',
        };
        let rst = v.validate( apacheDrillConnection, SCHEMAS.APACHE_DRILL_ATTRIBUTES_SCHEMA);
        assert(rst.valid);
    });

    it('should fail validation because missing host', function() {
        const apacheDrillConnection = {
            port: 9000,
            bucket: 'plotly-test',
            accessKeyId: '123456789',
            secretAccessKey: 'secret',
        };
        let rst;
        try{
            rst = v.validate( apacheDrillConnection, SCHEMAS.APACHE_DRILL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "host"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing port', function() {
        const apacheDrillConnection = {
            host: 'localhost',
            bucket: 'plotly-test',
            accessKeyId: '123456789',
            secretAccessKey: 'secret',
        };
        let rst;
        try{
            rst = v.validate( apacheDrillConnection, SCHEMAS.APACHE_DRILL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "post"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing bucket', function() {
        const apacheDrillConnection = {
            host: 'localhost',
            port: 9000,
            accessKeyId: '123456789',
            secretAccessKey: 'secret',
        };
        let rst;
        try{
            rst = v.validate( apacheDrillConnection, SCHEMAS.APACHE_DRILL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "bucket"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing accessKeyId', function() {
        const apacheDrillConnection = {
            host: 'localhost',
            port: 9000,
            bucket: 'plotly-test',
            secretAccessKey: 'secret',
        };
        let rst;
        try{
            rst = v.validate( apacheDrillConnection, SCHEMAS.APACHE_DRILL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "accessKeyId"');
            
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing secretAccessKey', function() {
        const apacheDrillConnection = {
            host: 'localhost',
            port: 9000,
            bucket: 'plotly-test',
            accessKeyId: '123456789',
            secretAccessKey: 'secret',
        };
        let rst;
        try{
            rst = v.validate( apacheDrillConnection, SCHEMAS.APACHE_DRILL_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "secretAccessKey"');
        }catch(err){
            assert.isOk(rst.valid, 'Test Passed failed validation');
        }
    });

});
