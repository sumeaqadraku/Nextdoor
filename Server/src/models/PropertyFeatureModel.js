module.exports = (sequelize, DataTypes) => {
  const PropertyFeature = sequelize.define('PropertyFeature', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
    },
    certificates: {
      type: DataTypes.TEXT,
    },
    size: {
      type: DataTypes.STRING,
    },
    elevator: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'property_features',
    timestamps: true,
  });

  PropertyFeature.associate = (models) => {
    PropertyFeature.belongsTo(models.Property, {
      foreignKey: 'propertyId',
      as: 'property',
    });
  };

  return PropertyFeature;
};