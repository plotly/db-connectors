module.exports = (sequelize, type) => {
    return sequelize.define('datasources-attributes', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        datasource_id: {
            type: type.INTEGER,
            allowNull: false,
            references: {
              model: 'datasources',
              key: 'id'
            }
        }
    },
    {
        tableName: 'datasources_attributes',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};