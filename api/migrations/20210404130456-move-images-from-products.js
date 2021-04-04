'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.createTable('Images', {
    //   id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    //   name: {
    //     type: Sequelize.STRING
    //   },
    //   url: {
    //     type: Sequelize.STRING
    //   },
    //   resourceName: {
    //     type: Sequelize.STRING
    //   },
    //   resourceId: {
    //     type: Sequelize.INTEGER
    //   },
    //   createdAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   },
    //   updatedAt: {
    //     allowNull: false,
    //     type: Sequelize.DATE
    //   }
    // });

    const productsImgs = await queryInterface.rawSelect('Products', {}, ['img']);
    console.log(productsImgs)
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
