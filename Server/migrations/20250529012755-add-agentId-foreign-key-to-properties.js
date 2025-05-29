'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('properties', {
      fields: ['agentId'],
      type: 'foreign key',
      references: {
        table: 'agents',
        field: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    });
  },

  down: async (queryInterface) => {
  
    await queryInterface.removeConstraint('properties');
  }
};
