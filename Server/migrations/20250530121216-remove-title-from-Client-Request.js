'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.removeColumn('client_requests', 'title');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('client_requests', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
