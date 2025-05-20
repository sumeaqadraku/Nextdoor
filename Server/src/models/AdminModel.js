module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      
    },
    accessLevel: {
      type: DataTypes.STRING,
      defaultValue: 'super', // or 'moderator', 'support' etc.
    },
  }, {
    tableName: 'admins',
    timestamps: true,
  });

  Admin.associate = (models) => {
    Admin.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Admin;
};