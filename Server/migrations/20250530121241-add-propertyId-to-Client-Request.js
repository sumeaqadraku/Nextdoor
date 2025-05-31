'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('client_requests', 'propertyId', {
      type: Sequelize.INTEGER,
      allowNull: true, 
      references: {
        model: 'properties',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('client_requests', 'propertyId');
  }
};
