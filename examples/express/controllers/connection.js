
const HTTP_OK = 200, BAD_REQUEST = 400;
// UNEXPECTED_ERROR=500;
const {Datastores} = require('../../../src/index');

const connectController = async(app) => {

    /**
     * The followindg method will validate the connction to the data source.
     *
     * Please consult the DIALECTS object to confirm the expected parameters
     * At a minimum here are the attributes
     * @param {object} req
     * @param {object} req.body
     * @param {object} req.body.connection
     * @param {string} req.body.connection.dialect
     * @param {object} res - The response object
     */
    app.post('/connect', async (req, res) => {
        try {
            const rst = await Datastores.connect(req.body.connection);
            res.header('Content-Type', 'application/json');
            res.status(HTTP_OK).send(rst);
        } catch (err) {
            return res.status(BAD_REQUEST).send(err);
        }

    });

    /**
     * The followindg method will execute the query against the datasource
     *
     * Please consult the DIALECTS object to confirm the expected parameters
     * At a minimum here are the attributes
     * @param {object} req
     * @param {object} req.body
     * @param {object} req.body.connection
     * @param {string} req.body.connection.dialect
     * @param {string|object} req.body.queryStatement
     * @param {object} res - The response object
     */
    app.post('/query', async (req, res) => {
        try {
            const rst = await Datastores.query(req.body.queryStatement, req.body.connection);
            res.header('Content-Type', 'application/json');
            res.status(HTTP_OK).send(rst);
        } catch (err) {
            return res.status(BAD_REQUEST).send(err);
        }
    });

    app.post('/disconnect', async (req, res) => {
        try {
            const rst = await Datastores.disconnect(req.body.connection);
            res.header('Content-Type', 'application/json');
            res.status(HTTP_OK).send(rst);
        } catch (err) {
            return res.status(BAD_REQUEST).send(err);
        }
    });
};

module.exports = connectController;