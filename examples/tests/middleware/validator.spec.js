// Require the dev-dependencies
const chai = require('chai');
const {validateRequest} = require('../../middleware/validator');
const {DIALECTS} = require('../../../src');
const expect = chai.expect;

describe('Validator Request  ', () => {
    const errorRes = {
        status: (httpStatus) => {
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
            /* eslint-disable */
            expect(validateRequest).to.exist;
            /* eslint-enable */
            done();
        } catch (err) {
            done(err);
        }
    });

    it('it should fail to validate req because missing connection', async (done) => {
        try {
            let req;

            try {
                validateRequest(req, errorRes);
                done('Should have failed validation');
            } catch (err) {
                expect(err).to.equal('Invalid request.  Missing Connection or Dialect attribute');
                done();
            }
        } catch (err) {
            done(err);
        }
    });

    it('it should fail to validate req because missing dialect', async (done) => {
        try {
            const req = {
                connection: {}
            };

            try {
                validateRequest(req, errorRes);
                done('Should have failed validation');
            } catch (err) {
                expect(err).to.equal('Invalid request.  Missing Connection or Dialect attribute');
                done();
            }
        } catch (err) {
            done(err);
        }
    });

    it('it should fail to validate req because not supported dialect', async (done) => {
        try {
            const req = {
                connection: {
                    dialect: 'bad_dialect'
                }
            };

            try {
                validateRequest(req, errorRes);
            } catch (err) {
                expect(err).to.equal('Invalid request.  Dialect not support bad_dialect');
                done();
            }
        } catch (err) {
            done(err);
        }
    });

    it('it should validate valid mysql connection', async (done) => {
        try {
            const req = {
                connection: {
                    dialect: DIALECTS.MYSQL,
                    attributes: {
                        username: 'root',
                        password: '12345',
                        host: '127.0.0.1',
                        port: 5432,
                        database: 'plotly.db'
                    }
                }
            };

            const res = {};
            const next = function() {
                done();
            };

            try {
                validateRequest(req, res, next);
            } catch (err) {
                done(err);
            }
        } catch (err) {
            done(err);
        }
    });
    

    it('it should validate valid mssql connection', async (done) => {
        try {
            const req = {
                connection: {
                    dialect: DIALECTS.MSSQL,
                    attributes: {
                        username: 'root',
                        password: '12345',
                        host: '127.0.0.1',
                        port: 5432,
                        database: 'plotly.db'
                    }
                }
            };

            const res = {};
            const next = function() {
                done();
            };

            try {
                validateRequest(req, res, next);
            } catch (err) {
                done(err);
            }
        } catch (err) {
            done(err);
        }
    });
});