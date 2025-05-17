const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('buyer', 'agent', 'owner', 'admin'),
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  // Define associations in this function
  User.associate = (models) => {
    User.hasMany(models.Review, {
      foreignKey: 'userId',
      as: 'reviews',
    });
    User.hasMany(models.Appointment, {
    foreignKey: 'userId',
    as: 'appointments'
    });
  };

  return User;
};