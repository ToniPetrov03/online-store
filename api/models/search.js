export default (sequelize, DataTypes, Model) => {
  class Search extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Search.init({
    term: DataTypes.STRING,
    count: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Search',
  });

  return Search;
};
