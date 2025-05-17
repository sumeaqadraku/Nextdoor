module.exports = (sequelize, DataTypes) => {
  const PropertyLocation = sequelize.define('PropertyLocation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 7),
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7),
    },
  }, {
    tableName: 'property_locations',
    timestamps: true,
  });

  PropertyLocation.associate = (models) => {
    PropertyLocation.belongsTo(models.Property, {
      foreignKey: 'propertyId',
      as: 'property',
    });
  };

  return PropertyLocation;
};