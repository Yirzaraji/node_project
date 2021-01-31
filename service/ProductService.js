const db = require("../models");

class ProductService {
  static async createProduct(productBody) {
    return db.Product.create(productBody);
  }
}

module.exports = ProductService;
