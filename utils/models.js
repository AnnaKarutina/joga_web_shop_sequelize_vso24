const { models } = require('../models/index');
const Product = require('../models/product');
const User = require('../models/user');
const { sequelize } = require('./db');

sequelize.models = models;

