module.exports = (sequelize, type) => {
    return sequelize.define('datasources', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING,
        icon: type.STRING
    },
    {
        indexes: [
            {
                unique: true,
                fields: ['name']
            }
        ],
        tableName: 'datasources',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};