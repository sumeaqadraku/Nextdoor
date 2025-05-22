module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE'
      },
      propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'properties', key: 'id' },
        onDelete: 'CASCADE'
      },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: { min: 1, max: 5 },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    tableName: 'reviews',
    timestamps: true,
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Review.belongsTo(models.Property, { foreignKey: 'propertyId', as: 'property' });
  };

  return Review;
};