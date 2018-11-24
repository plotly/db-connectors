// Require the dev-dependencies
const chai = require('chai');
const supertest = require('supertest');
const server = require('../../app');
const expect = chai.expect;
const request = supertest(server);
/* eslint-disable */
const should = chai.should();
/* eslint-enable */
const {DIALECTS} = require('../../../src');

describe('/POST Connection ', () => {
    it('it should successfully connect to a datasource', async (done) => {
        try {
            const data = {
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
            const res = await request.post('/connect').send(data);
            expect(res.status).to.equal(200);
            res.body.should.be.a('object');
            done();
        } catch (err) {
            done(err);
        }
    });

    it('it should successfully query a datasource', async (done) => {
        try {
            const res = await request.post('/query');
            expect(res.status).to.equal(200);
            res.body.should.be.a('object');
            done();
        } catch (err) {
            done(err);
        }
    });

    it('it should successfully disconnect the datasource', async (done) => {
        try {
            const res = await request.post('/disconnect');
            expect(res.status).to.equal(200);
            res.body.should.be.a('object');
            done();
        } catch (err) {
            done(err);
        }
    });
});