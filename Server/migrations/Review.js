module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('reviews');
    if (!tableInfo.agentId) {
      await queryInterface.addColumn('reviews', 'agentId', {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'users', key: 'id' },
        onDelete: 'CASCADE',
      });
    }
    if (!tableInfo.title) {
      await queryInterface.addColumn('reviews', 'title', {
        type: Sequelize.STRING,
        allowNull: false,
      });
    }
    if (!tableInfo.propertyId.allowNull) {
      await queryInterface.changeColumn('reviews', 'propertyId', {
        type: Sequelize.INTEGER,
        allowNull: true,
      });
    }
  },
  down: async (queryInterface, Sequelize) => {
    const tableInfo = await queryInterface.describeTable('reviews');
    if (tableInfo.agentId) {
      await queryInterface.removeColumn('reviews', 'agentId');
    }
    if (tableInfo.title) {
      await queryInterface.removeColumn('reviews', 'title');
    }
    await queryInterface.changeColumn('reviews', 'propertyId', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });
  },
};