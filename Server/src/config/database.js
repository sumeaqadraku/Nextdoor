const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nextdoor', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;

