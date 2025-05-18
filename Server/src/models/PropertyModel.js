module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING, // e.g. 'Apartment', 'House'
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('Active', 'Sold', 'Rented'),
      defaultValue: 'Active',
    },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    listingType: {
    type: DataTypes.ENUM('sale', 'rent', 'lease', 'other'),
    allowNull: false,
    defaultValue: 'rent',
},
  }, {
    tableName: 'properties',
    timestamps: true,
  });

  Property.associate = (models) => {

    Property.hasMany(models.PropertyImage, {
      foreignKey: 'propertyId',
      as: 'images',
    });

    Property.hasOne(models.PropertyLocation, {
      foreignKey: 'propertyId',
      as: 'location',
    });

    Property.hasOne(models.PropertyFeature, {
      foreignKey: 'propertyId',
      as: 'features',
    });

    Property.hasMany(models.Appointment, {
    foreignKey: 'propertyId',
    as: 'appointments'
  });
  };

  return Property;
};