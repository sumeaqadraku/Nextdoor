'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('property_features', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      propertyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'properties', key: 'id' },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      certificates: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      size: {
        type: Sequelize.STRING,
        allowNull: true
      },
      elevator: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('property_features');
  }
};
