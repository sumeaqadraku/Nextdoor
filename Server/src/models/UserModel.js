module.exports = (sequelize, DataTypes) => {
  return sequelize.define("User", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.ENUM("buyer", "seller", "agent", "admin"), allowNull: false, defaultValue: "buyer" },
  });
};




