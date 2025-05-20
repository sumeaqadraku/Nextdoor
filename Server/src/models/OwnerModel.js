module.exports = (sequelize, DataTypes) => {
  const Owner = sequelize.define('Owner', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ownedPropertiesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    tableName: 'owners',
    timestamps: true,
  });

  Owner.associate = (models) => {
    Owner.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Owner;
};