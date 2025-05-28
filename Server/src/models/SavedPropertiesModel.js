const Buyer = require('./BuyerModel');

module.exports = (sequelize, DataTypes) => {
  const SavedProperty = sequelize.define("SavedProperty", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    buyerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Buyer,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Properties',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },{
    tableName: 'savedproperty',
    timestamps: false,
  });

  SavedProperty.associate = (models) => {
    SavedProperty.belongsTo(models.Buyer, {
      foreignKey: 'buyerId',
      as: 'buyer',
    });
    SavedProperty.belongsTo(models.Property, {
      foreignKey: 'propertyId',
      as: 'property',
    });
  };

  return SavedProperty;
};
