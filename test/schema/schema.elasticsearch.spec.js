// do not use import, otherwise other test units won't be able to reactivate nock
const {assert,expect} = require('chai');
const {SCHEMAS} = require('../../src/common/constants');
const Validator = require('jsonschema').Validator;
let v;

describe('ElasticSearch Schema:', function () {

    before(function() {
        v = new Validator();
    });
    it('should validate a valid object agasint Elastic Search', function() {
        const elasticSearchConnection = {
            host: 'localhost',
            port: 9000,
            username:'elastic',
            password: 'elasticsearch'
        };
        let rst = v.validate( elasticSearchConnection , SCHEMAS.ELASTICSEARCH_ATTRIBUTES_SCHEMA);
        assert(rst.valid);
    });

    it('should fail to validate elasticsearch connection because missing host', function() {
        const elasticSearchConnection = {
            port: 9000,
            username:'elastic',
            password: 'elasticsearch'
        };

        let rst;
        try{
            rst = v.validate( elasticSearchConnection, SCHEMAS.ELASTICSEARCH_ATTRIBUTES_SCHEMA);
            expect(rst.errors[0].message).to.equal('requires property "host"');
        }catch(err){
            assert.isOk(!rst.valid, 'Test Passed failed validation');
        }
    });
});
