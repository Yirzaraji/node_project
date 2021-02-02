const db = require("../models");

class ProductService {
  //Find all Product
  static readAllProduct() {
    return db.Product.findAll();
  }
  //Create a product
  static createProduct(productBody) {
    return db.Product.create(productBody);
  }
  //read a product
  static readProduct(id) {
    return db.Product.findOne({ where: { id } });
  }
  //Update a Product
  static updateProduct(productBody, id) {
    return db.Product.update(productBody, { where: { id } });
  }
  //Delete a product
  static deleteProduct(id) {
    return db.Product.destroy({ where: { id } });
  }
}

module.exports = ProductService;
