
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Transaction", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    transactionDate: { type: DataTypes.DATEONLY, allowNull: false },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
    status: { type: DataTypes.ENUM("pending", "completed", "cancelled"), defaultValue: "pending" },
  });
};