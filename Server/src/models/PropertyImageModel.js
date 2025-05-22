module.exports = (sequelize, DataTypes) => {
  const PropertyImage = sequelize.define('PropertyImage', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'property_images',
    timestamps: true,
  });

  PropertyImage.associate = (models) => {
    PropertyImage.belongsTo(models.Property, {
      foreignKey: 'propertyId',
      as: 'property',
    });
  };

  return PropertyImage;
};