const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/database'); // ✅
const envConfig = config[env];  

const sequelize = new Sequelize(
  envConfig.database,
  envConfig.username,
  envConfig.password,
  envConfig
);

const db = {};

db.User = require('./UserModel')(sequelize, DataTypes);
db.Buyer = require('./BuyerModel')(sequelize, DataTypes);
db.Agent = require('./AgentModel')(sequelize, DataTypes);
db.Admin = require('./AdminModel')(sequelize, DataTypes);
db.Property = require('./PropertyModel')(sequelize, DataTypes);
db.PropertyImage = require('./PropertyImageModel')(sequelize, DataTypes);
db.PropertyLocation = require('./PropertyLocationModel')(sequelize, DataTypes);
db.PropertyFeature = require('./PropertyFeatureModel')(sequelize, DataTypes);
db.Review = require('./ReviewModel')(sequelize, DataTypes);
db.Appointment = require('./AppointmentModel')(sequelize, DataTypes);
db.ClientRequest = require('./ClientRequestModel')(sequelize, DataTypes);
db.NewListing = require('./NewListingModel')(sequelize, DataTypes);
db.Notification = require('./NotificationModel')(sequelize, DataTypes);
db.SavedProperty = require('./SavedPropertiesModel')(sequelize, DataTypes);

//I krijon qto dyja
db.Ligjeruesi = require('./Ligjeruesi')(sequelize, DataTypes);
db.Ligjerata = require('./LigjerataModel')(sequelize, DataTypes);



// ✅ Setup associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;