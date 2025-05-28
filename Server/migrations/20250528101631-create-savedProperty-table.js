'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("SavedProperty", {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        buyerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'buyers',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        propertyId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'Properties',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable("SavedProperty");
  }
};
