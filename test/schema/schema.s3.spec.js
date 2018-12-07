// do not use import, otherwise other test units won't be able to reactivate nock
const {assert,expect} = require('chai');
const {SCHEMAS} = require('../../src/common/constants');
const Validator = require('jsonschema').Validator;
let v;

describe('S3 Schema:', function () {

    before(function() {
        v = new Validator();
    });
    it('should validate a valid object agasint the schema', function() {
        const s3Connection = {
            bucket: 'plotly-test',
            accessKeyId: '123456789',
            secretAccessKey: 'secret',
        }
        let rst = v.validate( s3Connection, SCHEMAS.S3_ATTRIBUTES_SCHEMA);
        assert(rst.valid);
    });

    it('should fail validation because missing bucket', function() {
        const s3Connection= {
            accessKeyId: '123456789',
            secretAccessKey: 'secret',
        };
        let rst;
        try{
            rst = v.validate( s3Connection, SCHEMAS.S3_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "bucket"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing accessKeyId', function() {
        const s3Connection = {
            bucket: 'plotly-test',
            secretAccessKey: 'secret',
        };
        let rst;
        try{
            rst = v.validate( s3Connection, SCHEMAS.S3_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "accessKeyId"');
            
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail validation because missing secretAccessKey', function() {
        const s3Connection = {
            bucket: 'plotly-test',
            accessKeyId: '123456789'
        }
        let rst;
        try{
            rst = v.validate( s3Connection, SCHEMAS.S3_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "secretAccessKey"');
        }catch(err){
            assert.isOk(rst.valid, 'Test Passed failed validation');
        }
    });

});
