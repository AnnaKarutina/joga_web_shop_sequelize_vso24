const { Sequelize } = require('sequelize');
const sequelize = require('../utils/db').sequelize;

const User = sequelize.define(
  'User',
  {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    }
  },
  {
    tableName: 'users',
  },
);

module.exports = User;