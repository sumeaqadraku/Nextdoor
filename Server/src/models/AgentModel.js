module.exports = (sequelize, DataTypes) => {
  const Agent = sequelize.define('Agent', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    licenseNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    agency: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'agents',
    timestamps: true,
  });

  Agent.associate = (models) => {
    Agent.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Agent;
};