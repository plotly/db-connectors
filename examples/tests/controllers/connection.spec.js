// Require the dev-dependencies
const chai = require('chai');
const supertest = require('supertest');
const server = require('../../app');
const expect = chai.expect;
const request = supertest(server);

describe('/POST Connection ', () => {
    it('it should successfully connect to a datasource', async (done) => {
        try {
            const res = await request.post('/connect');
            expect(res.status).to.equal(200);
            res.body.should.be.a('object');
            done();
        } catch (err) {
            done(err);
        }
    });
});