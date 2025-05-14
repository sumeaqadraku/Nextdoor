const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');

// DB Connect
const sequelize = new Sequelize('nextdoor', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, 
});

// Importimi i modeleve
const User = require('./UserModel')(sequelize, DataTypes);
const Property = require('./PropertyModel')(sequelize, DataTypes);
const Listing = require('./ListingModel')(sequelize, DataTypes);
const Transaction = require('./TransactionModel')(sequelize, DataTypes);
const Payment = require('./PaymentModel')(sequelize, DataTypes);
const Favorite = require('./FavoritesModel')(sequelize, DataTypes);
const Image = require('./ImagesModel')(sequelize, DataTypes);

// Lidhjet 

// USER
User.hasMany(Property, { foreignKey: 'ownerId' });
Property.belongsTo(User, { foreignKey: 'ownerId' });

User.hasMany(Listing, { foreignKey: 'agentId' });
Listing.belongsTo(User, { foreignKey: 'agentId' });

User.hasMany(Transaction, { foreignKey: 'buyerId' });
Transaction.belongsTo(User, { foreignKey: 'buyerId' });

User.hasMany(Payment, { foreignKey: 'userId' });
Payment.belongsTo(User, { foreignKey: 'userId' });

User.belongsToMany(Property, { through: Favorite, foreignKey: 'userId', as: 'favorites' });
Property.belongsToMany(User, { through: Favorite, foreignKey: 'propertyId' });

// PROPERTY
Property.hasMany(Listing, { foreignKey: 'propertyId' });
Listing.belongsTo(Property, { foreignKey: 'propertyId' });

Property.hasMany(Transaction, { foreignKey: 'propertyId' });
Transaction.belongsTo(Property, { foreignKey: 'propertyId' });

Property.hasMany(Image, { foreignKey: 'propertyId' });
Image.belongsTo(Property, { foreignKey: 'propertyId' });

// TRANSACTION
Transaction.hasMany(Payment, { foreignKey: 'transactionId' });
Payment.belongsTo(Transaction, { foreignKey: 'transactionId' });

// thirrja e 'tabelave'
module.exports = {
  sequelize,
  User,
  Property,
  Listing,
  Transaction,
  Payment,
  Favorite,
  Image,
};