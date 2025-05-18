module.exports = (sequelize, DataTypes) => {
  const NewListing = sequelize.define('NewListing', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    notif_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'new_listings',
    timestamps: true,
  });

  NewListing.associate = (models) => {
    NewListing.belongsTo(models.Property, {
      foreignKey: 'propertyId',
      as: 'property',
    });

    NewListing.belongsTo(models.Notification, {
      foreignKey: 'notif_id',
      as: 'notification',
    });
  };

  return NewListing;
};