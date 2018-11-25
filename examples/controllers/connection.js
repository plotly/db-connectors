
const HTTP_OK = 200, BAD_REQUEST = 400;
// UNEXPECTED_ERROR=500;
const {Datastores} = require('../../src/index');

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

    app.post('/query', function(req, res) {
        const data = {
            status: true
        };
        res.header('Content-Type', 'application/json');
        res.status(HTTP_OK).send(data);
    });

    app.post('/disconnect', function(req, res) {
        const data = {
            status: true
        };

        res.header('Content-Type', 'application/json');
        res.status(HTTP_OK).send(data);
    });
};

module.exports = connectController;