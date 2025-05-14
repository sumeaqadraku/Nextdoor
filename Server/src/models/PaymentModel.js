
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Payment", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    amount: { type: DataTypes.FLOAT, allowNull: false },
    paymentDate: { type: DataTypes.DATEONLY, allowNull: false },
    method: { type: DataTypes.ENUM("credit_card", "paypal", "bank_transfer", "cash"), allowNull: false },
    status: { type: DataTypes.ENUM("pending", "completed", "failed"), defaultValue: "pending" },
  });
};