'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('ligjeruesi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lecturerName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deparatament: {
        type: Sequelize.STRING,
        allowNull: false,
    
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('ligjeruesi');
  }
};
