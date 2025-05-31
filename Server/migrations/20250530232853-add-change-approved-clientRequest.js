'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('client_requests', 'approved', {
      type: Sequelize.ENUM('requested', 'approved', 'declined'),
      allowNull: false,
      defaultValue: 'requested',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('client_requests', 'approved', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    });
  }
};
