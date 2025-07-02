'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.createTable('ligjerata', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      lectureName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lecturerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ligjeruesi', key: 'id' },
        onDelete: 'CASCADE'
      },
    });
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('ligjerata');
  }
};
