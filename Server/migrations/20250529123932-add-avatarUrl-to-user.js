'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'avatarUrl', {
      type: Sequelize.STRING,
      allowNull: true,  
      after: 'email'   
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('properties', 'avatarUrl');
  }
};
