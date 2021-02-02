const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.Association = models.Product.hasMany(models.Ingredient);
    }
  }
  Product.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      priceWithoutVAT: { type: DataTypes.INTEGER, allowNull: false },
      description: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
