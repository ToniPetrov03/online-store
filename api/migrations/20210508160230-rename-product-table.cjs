'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('Products', 'products');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('products', 'Products');
  }
};
