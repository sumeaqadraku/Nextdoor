// Ktu ki me kriju relacionet midis tabelave. (kardinaliteti, entitetet e dobeta etc)

const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Load all models
db.User = require('./UserModel')(sequelize, Sequelize.DataTypes);

// Later: db.Property = require('./PropertyModel')(sequelize, Sequelize.DataTypes);

module.exports = db;