module.exports = (sequelize, type) => {
    return sequelize.define('datasources-attributes', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        datasource_id:{
            allowNull: false,
            references: {
              model: 'datasources',
              key: 'id'
            }
        },
        attributes: DataTypes.JSONB,
    },{
        tableName: 'datasources_attributes',
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
    )
}