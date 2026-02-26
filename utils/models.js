const { models } = require('../models/index');
const { sequelize, dbSync } = require('./db');

sequelize.models = models;
dbSync()