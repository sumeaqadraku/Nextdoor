'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    const mockProperties = [];

    for (let i = 0; i < 10; i++) {
      mockProperties.push({
        title: faker.location.street(),
        description: faker.lorem.sentences(2),
        price: faker.number.int({ min: 100, max: 1000 }),
        type: faker.helpers.arrayElement(['Apartment', 'House']),
        status: 'Active',
        listingTypes: faker.helpers.arrayElement(['Rent', 'Sale']),
        agentId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('properties', mockProperties, {});
    
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.bulkDelete('properties', null, {});
  }
};
