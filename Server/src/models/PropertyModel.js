module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
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
    owner: {
      type: DataTypes.STRING,
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
    agentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    listingTypes: {
    type: DataTypes.ENUM('Sale', 'Rent'),
    allowNull: false,
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

    Property.belongsTo(models.Agent, {
      foreignKey: 'agentId',
      as: 'agent',
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

  Property.hasMany(models.SavedProperty, {
  foreignKey: 'propertyId',
  as: 'savedproperty',
  });

  };

  return Property;
};