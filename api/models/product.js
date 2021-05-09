export default (sequelize, DataTypes, Model) => {
  class Product extends Model {
    static associate(models) {
      this.hasMany(models.image, {
        foreignKey: 'resourceId',
        constraints: false,
        scope: {
          resourceName: 'product'
        }
      });
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'product',
  });
  return Product;
};
