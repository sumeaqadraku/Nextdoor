

module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Favorite", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  });
};