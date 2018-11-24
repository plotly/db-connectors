// Require the dev-dependencies
const chai = require('chai');
const {validateRequest} = require('../../middleware/validator');
const {DIALECTS} = require('../../../src');
const expect = chai.expect;

describe('Validator Request  ', () => {
    const errorRes = {
        status: (httpStatus)=>{
            console.log( 'Checking status', httpStatus);
            expect(httpStatus).to.equal(400);
            return {
                send: (errorMsg) => {
                    throw errorMsg;
                }
            };
        }
    };
    it('it should verify that validate request exists', async (done) => {
        try {
            expect(validateRequest).to.exist;
            done();
        } catch (err) {
            done(err);
        }
    });

    it('it should fail to validate req because missing connection', async (done) => {
        try {
            let req;

            try{
                validateRequest(req, errorRes);
                done('Should have failed validation');
            }catch(err){
                expect(err).to.equal(`Invalid request.  Missing Connection or Dialect attribute`);
                done();
            }
        } catch (err) {
            done(err);
        }
    });

    it('it should fail to validate req because missing dialect', async (done) => {
        try {
            let req = {
                connection:{}
            };

            try{
                validateRequest(req, errorRes);
                done('Should have failed validation');
            }catch(err){
                expect(err).to.equal(`Invalid request.  Missing Connection or Dialect attribute`);
                done();
            }
        } catch (err) {
            done(err);
        }
    });

    it('it should fail to validate req because not supported dialect', async (done) => {
        try {
            let req = {
                connection:{
                    dialect : 'bad_dialect'
                }
            };

            try{
                validateRequest(req, errorRes);
                done('Should have failed validation');
            }catch(err){
                expect(err).to.equal(`Invalid request.  Dialect not support bad_dialect`);
                done();
            }
        } catch (err) {
            done(err);
        }
    });
});