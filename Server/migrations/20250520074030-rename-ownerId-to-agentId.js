'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('properties', 'ownerId', 'agentId');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn('properties', 'agentId', 'ownerId');
  }
};