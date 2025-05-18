module.exports = (sequelize, DataTypes) => {
  const Notification = sequelize.define('Notification', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    tableName: 'notifications',
    timestamps: true,
  });

  Notification.associate = (models) => {
    Notification.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

    Notification.hasOne(models.NewListing, {
      foreignKey: 'notif_id',
      as: 'newListing',
    });

    Notification.hasOne(models.ClientRequest, {
      foreignKey: 'notif_id',
      as: 'clientRequest',
    });
  };

  return Notification;
};