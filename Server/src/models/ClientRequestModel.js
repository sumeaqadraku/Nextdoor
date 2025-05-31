module.exports = (sequelize, DataTypes) => {
  const ClientRequest = sequelize.define('ClientRequest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    approved: {
      type: DataTypes.ENUM('requested','approved','declined'),
      defaultValue: 'requested',
    },
    notif_id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'client_requests',
    timestamps: true,
  });

  ClientRequest.associate = (models) => {
    ClientRequest.belongsTo(models.Notification, {
      foreignKey: 'notif_id',
      as: 'notification',
    });
    ClientRequest.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    ClientRequest.belongsTo(models.Property, {
      foreignKey: 'propertyId',
      as: 'property',
    });
  };

  return ClientRequest;
};