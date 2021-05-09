'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable('images', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        filename: {
          allowNull: false,
          type: Sequelize.STRING
        },
        url: {
          allowNull: false,
          type: Sequelize.STRING
        },
        main: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        resourceName: {
          allowNull: false,
          type: Sequelize.STRING
        },
        resourceId: {
          allowNull: false,
          type: Sequelize.INTEGER
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }, { transaction });

      await queryInterface.addIndex('images', ['resourceName', 'resourceId'], { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('images');
  }
};
