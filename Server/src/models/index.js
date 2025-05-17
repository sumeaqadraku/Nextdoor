const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'database.js'))[env];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};

db.User = require('./UserModel')(sequelize, DataTypes);
db.Buyer = require('./BuyerModel')(sequelize, DataTypes);
db.Agent = require('./AgentModel')(sequelize, DataTypes);
db.Owner = require('./OwnerModel')(sequelize, DataTypes);
db.Admin = require('./AdminModel')(sequelize, DataTypes);
db.Property = require('./PropertyModel')(sequelize, DataTypes);
db.PropertyImage = require('./PropertyImageModel')(sequelize, DataTypes);
db.PropertyLocation = require('./PropertyLocationModel')(sequelize, DataTypes);
db.PropertyFeature = require('./PropertyFeatureModel')(sequelize, DataTypes);
db.Review = require('./ReviewModel')(sequelize, DataTypes);
db.Appointment = require('./AppointmentModel')(sequelize, DataTypes);

// ✅ Setup associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;