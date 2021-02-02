const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ingredient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //this.Relation = models.Ingredient.hasMany(models.Product);
    }
  }
  Ingredient.init(
    {
      name: DataTypes.STRING,
      allowNull: false,
    },
    {
      sequelize,
      modelName: "Ingredient",
    }
  );
  return Ingredient;
};
