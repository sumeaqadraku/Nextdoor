const { faker } = require('@faker-js/faker');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const properties = [
      {
        title: 'Luxury Villa',
        description: 'A beautiful luxury villa in the city center.',
        price: 500000,
        type: 'Residential',
        status: 'Active',
        agentId: 1, // Duhet të ekzistojë në tabelën agents
        owner: 'John Doe',
        listingTypes: 'Sale',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Modern Apartment',
        description: 'A cozy apartment with modern amenities.',
        price: 200000,
        type: 'Residential',
        status: 'Sold',
        agentId: 2, // Duhet të ekzistojë në tabelën agents
        owner: 'Jane Smith',
        listingTypes: 'Sale',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Spacious Office',
        description: 'A spacious office space for rent.',
        price: 1500,
        type: 'Commercial',
        status: 'Active',
        agentId: 3, // Duhet të ekzistojë në tabelën agents
        owner: 'Acme Corp.',
        listingTypes: 'Rent',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('properties', properties, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('properties', null, {});
  },
};
