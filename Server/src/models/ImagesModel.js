
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("Image", {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    url: { type: DataTypes.STRING, allowNull: false },
    caption: { type: DataTypes.STRING, allowNull: true },
  });
};

