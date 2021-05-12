'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const products = await queryInterface.select(null, 'products');
    const images = products.map(product => {
      const { img } = product
      const name = img ? img.slice(img.lastIndexOf('/') + 1) : ''
      return {
        filename: decodeURI(name),
        url: img || '',
        main: true,
        resourceName: 'product',
        resourceId: product.id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })

    const transaction = await queryInterface.sequelize.transaction();

    try {
      if(images.length) {
        await queryInterface.bulkInsert('images', images, { transaction });
      }
      await queryInterface.removeColumn('products', 'img', { transaction });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  down: async (queryInterface, Sequelize) => {
    const images = await queryInterface.select(null, 'images');
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.addColumn('products', 'img', Sequelize.STRING, { transaction });
      await Promise.all(images.map(img => queryInterface.update(queryInterface.sequelize, 'products', { img: img.url }, { id: img.resourceId }, { transaction })));
      await queryInterface.bulkDelete('images', null, { transaction })
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  }
};
