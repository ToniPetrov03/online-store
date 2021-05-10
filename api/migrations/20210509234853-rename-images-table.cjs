'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('images', 'files');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameTable('files', 'images');
  }
};
