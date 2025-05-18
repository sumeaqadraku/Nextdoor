'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('properties', 'listingType', {
      type: Sequelize.ENUM('sale', 'rent', 'lease', 'other'),
      allowNull: false,
      defaultValue: 'rent',  
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('properties', 'listingType');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_properties_listingType";');
  }
};