const { Sequelize } = require('sequelize');
const sequelize = require('../utils/db').sequelize;

const CartItem = sequelize.define(
  'CartItem',
  {
    // Model attributes are defined here
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    }
  },
  {
    tableName: 'cartItems',
  },
);

module.exports = CartItem;