// do not use import, otherwise other test units won't be able to reactivate nock
const {assert,expect} = require('chai');
const {SCHEMAS} = require('../../src/common/constants');
const Validator = require('jsonschema').Validator;
let v;

describe('SQLite Schema:', function () {

    before(function() {
        v = new Validator();
    });
    it('should validate a valid sqlite object agasint the schema', function() {
        const sqliteConnection = {
            storage: '/home/usr/plotly/test.db'
        }
        let rst = v.validate( sqliteConnection, SCHEMAS.SQLITE_ATTRIBUTES_SCHEMA);
        assert(rst.valid);
    });

    it('should fail to validate a valid storage object agasint the schema because missing storage', function() {
        const sqliteConnection = {};

        let rst;
        try{
            rst = v.validate( sqliteConnection, SCHEMAS.SQLITE_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "storage"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });
});
