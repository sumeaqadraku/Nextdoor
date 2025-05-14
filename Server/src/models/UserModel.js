module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM('admin', 'buyer', 'seller'),
      defaultValue: 'buyer'
    }
  });

  return User;
};