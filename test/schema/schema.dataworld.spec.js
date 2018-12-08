// do not use import, otherwise other test units won't be able to reactivate nock
const {assert,expect} = require('chai');
const {SCHEMAS} = require('../../src/common/constants');
const Validator = require('jsonschema').Validator;
let v;

describe('Dataworld Schema:', function () {

    before(function() {
        v = new Validator();
    });
    it('should validate a valid object agasint Data World', function() {
        const dataworldConnection = {
            url: 'dataworld.com',
            token: 'NOT_REAL_TOKEN'
        };
        let rst = v.validate( dataworldConnection, SCHEMAS.DATAWORLD_ATTRIBUTES_SCHEMA);
        assert(rst.valid);
    });

    it('should fail to validate elasticsearch connection because missing url', function() {
        const dataworldConnection = {
            token: 'NOT_REAL_TOKEN'
        };

        let rst;
        try{
            rst = v.validate( dataworldConnection, SCHEMAS.DATAWORLD_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "url"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });

    it('should fail to validate elasticsearch connection because missing token', function() {
        const dataworldConnection = {
            token: 'NOT_REAL_TOKEN'
        };

        let rst;
        try{
            rst = v.validate( dataworldConnection, SCHEMAS.DATAWORLD_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "token"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });
});
