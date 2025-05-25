'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const locations = [];

    for (let propertyId = 1; propertyId <= 10; propertyId++) {
      locations.push({
        propertyId,
        city: faker.location.city(),
        address: faker.location.streetAddress(),
        latitude: parseFloat(faker.location.latitude(42.7, 42.3)),
        longitude: parseFloat(faker.location.longitude(20.4, 20.0)),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('property_locations', locations, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('property_locations', null, {});
  }
};
