const { Sequelize } = require('sequelize');
const sequelize = require('../utils/db').sequelize;

const Cart = sequelize.define(
  'Cart',
  {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
  },
  {
    tableName: 'carts',
  },
);

module.exports = Cart;