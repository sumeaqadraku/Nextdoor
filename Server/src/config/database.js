//Lidhjen me databaze

const { Sequelize } = require('sequelize');

// Set up the connection to the database
const sequelize = new Sequelize('users', 'root', 'coraline', {
  host: 'localhost',
  dialect: 'mysql',
  logging: true, 
});

module.exports = sequelize;
