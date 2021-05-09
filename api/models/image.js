const uppercaseFirst = str => `${str[0].toUpperCase()}${str.substr(1)}`;

export default (sequelize, DataTypes, Model) => {
  class Image extends Model {
    static associate(models) {
      this.belongsTo(models.product, { foreignKey: 'resourceId', constraints: false });
    }

    getResource(options) {
      if (!this.resourceName) return Promise.resolve(null);
      const mixinMethodName = `get${uppercaseFirst(this.resourceName)}`;
      return this[mixinMethodName](options);
    }
  }
  Image.init({
    filename: DataTypes.STRING,
    url: DataTypes.STRING,
    main: DataTypes.BOOLEAN,
    resourceName: DataTypes.STRING,
    resourceId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'image',
  });

  Image.addHook('afterFind', findResult => {
    if (!Array.isArray(findResult)) findResult = [findResult];
    for (const instance of findResult) {
      if (instance.resourceName === 'product' && instance.product) {
        instance.resource = instance.product;
      }

      delete instance.product;
      delete instance.dataValues.product;
    }
  });

  return Image;
};
