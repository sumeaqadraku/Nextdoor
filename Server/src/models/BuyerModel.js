//file is name BuyerModel.js
module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define('Buyer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'buyers',
    timestamps: true,
  });

  Buyer.associate = (models) => {
    Buyer.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Buyer.hasMany(models.SavedProperty, { foreignKey: 'buyerId', as: 'savedProperties' });
  };
  

  return Buyer;
};