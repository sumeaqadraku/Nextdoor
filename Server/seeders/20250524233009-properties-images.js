'use strict';

const { faker } = require('@faker-js/faker');

module.exports = {
  async up(queryInterface, Sequelize) {
    const imageData = [];

    // Loop through each propertyId from 1 to 10
    for (let propertyId = 1; propertyId <= 10; propertyId++) {
      for (let i = 0; i < 3; i++) {
        imageData.push({
          propertyId: propertyId,
          imageUrl: faker.image.urlLoremFlickr({ category: 'house', width: 640, height: 480 }),
          isPrimary: i === 0, // First image is primary
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    }

    await queryInterface.bulkInsert('property_images', imageData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('property_images', null, {});
  }
};
