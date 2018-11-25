
const HTTP_OK = 200, BAD_REQUEST = 400;
// UNEXPECTED_ERROR=500;
const {Datastores} = require('../../../src/index');

const connectController = async(app) => {

    app.post('/connect', async (req, res) => {
        try {
            const rst = await Datastores.connect(req.body.connection);
            res.header('Content-Type', 'application/json');
            res.status(HTTP_OK).send(rst);
        } catch (err) {
            return res.status(BAD_REQUEST).send(err);
        }

    });

    app.post('/query', async (req, res) => {
        try {
            const rst = await Datastores.query(req.body.connection);
            res.header('Content-Type', 'application/json');
            res.status(HTTP_OK).send(rst);
        } catch (err) {
            return res.status(BAD_REQUEST).send(err);
        }
    });

    app.post('/disconnect', async (req, res) => {
        try {
            const rst = await Datastores.query(req.body.connection);
            res.header('Content-Type', 'application/json');
            res.status(HTTP_OK).send(rst);
        } catch (err) {
            return res.status(BAD_REQUEST).send(err);
        }
    });
};

module.exports = connectController;