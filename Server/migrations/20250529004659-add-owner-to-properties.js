'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('properties', 'owner', {
      type: Sequelize.STRING,  // Adjust the data type if needed
      allowNull: true,         // Set to false if this field should be mandatory later
      after: 'agentId'         // Optional: position the column after 'agentId'
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('properties', 'owner');
  }
};
