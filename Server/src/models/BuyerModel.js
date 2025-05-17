module.exports = (sequelize, DataTypes) => {
  const Buyer = sequelize.define('Buyer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    preferences: {
      type: DataTypes.TEXT, // JSON or string for simplicity
      allowNull: true,
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
  }, {
    tableName: 'buyers',
    timestamps: true,
  });

  Buyer.associate = (models) => {
    Buyer.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Buyer;
};