const Sequelize = require('sequelize');
const db = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite'
});

const DatasourcesModel = db.import('../models/datasources');
const DatasorucesAttributesModel = db.import('../models/datasource-attributes');

DatasorucesAttributesModel.belongsTo(DatasourcesModel, {foreignKey: 'datasource_id' });

module.exports = {
    db
};