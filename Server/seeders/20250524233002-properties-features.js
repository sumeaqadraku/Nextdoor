'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const featuresData = [];
  

    for (let propertyId = 1; propertyId <= 10; propertyId++) {
      featuresData.push({
        propertyId,
        size: faker.number.int({ min: 50, max: 300 }).toString(), // e.g. 120
        bedrooms: faker.number.int({ min: 1, max: 5 }),
        
        bathrooms: faker.number.int({ min: 1, max: 3 }),
        certificates: faker.helpers.arrayElement(['Yes', 'No']),
        elevator: faker.helpers.arrayElement(['Yes', 'No']),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('property_features', featuresData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('property_features', null, {});
  }
};
