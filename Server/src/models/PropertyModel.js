module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Property", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    price: { type: DataTypes.FLOAT, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: false },
    state: { type: DataTypes.STRING, allowNull: false },
    zipCode: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.ENUM("house", "apartment", "commercial", "land"), allowNull: false },
    status: { type: DataTypes.ENUM("available", "sold", "rented"), defaultValue: "available" },
  });
};