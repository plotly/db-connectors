// do not use import, otherwise other test units won't be able to reactivate nock
const {assert,expect} = require('chai');
const {SCHEMAS} = require('../../src/common/constants');
const Validator = require('jsonschema').Validator;
let v;

describe('CSV Schema:', function () {

    before(function() {
        v = new Validator();
    });
    it('should validate a valid csv object agasint the schema', function() {
        const csvConnection = {
            file: '/home/usr/plotly/test.csv'
        }
        let rst = v.validate( csvConnection, SCHEMAS.CSV_ATTRIBUTES_SCHEMA);
        assert(rst.valid);
    });

    it('should fail to validate a valid csv object agasint the schema because missing file', function() {
        const csvConnection = {};

        let rst;
        try{
            rst = v.validate( csvConnection, SCHEMAS.CSV_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "file"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });
});
