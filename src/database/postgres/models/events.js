const { DataTypes } = require('sequelize')

const tableName = 'Events'

const attributes = {
  id: {
    type: DataTypes.STRING(32),
    primaryKey: true,
    allowNull: false,
  },
  key: {
    type: DataTypes.STRING(32),
    allowNull: false,
  },
  payload: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  metadata: {
    type: DataTypes.JSON,
  },
  topic_name: {
    type: DataTypes.STRING(256),
    allowNull: false,
  },
}

const options = {
  tableName,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  underscored: true,
}

function define (database) {
  const model = database.define(
    tableName,
    attributes,
    options,
  )

  return model
}

module.exports = {
  define,
}
