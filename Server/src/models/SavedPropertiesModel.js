import Buyer from "./BuyerModel";

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
  });

  SavedProperty.associate = (models) => {
    SavedProperty.belongsTo(models.User, {
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
