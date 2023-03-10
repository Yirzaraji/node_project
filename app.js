const express = require("express");
const bodyParser = require("body-parser");
const utils = require("./utils");
const ProductService = require("./service/ProductService");
const db = require("./models");

const bootServer = async () => {
  // create new express app and save it as "app"
  const app = express();
  // server configuration
  const PORT = 8080;

  app.use(bodyParser.json());

  // create a route for the app
  app.use((req, res, next) => {
    let timer = new Date();
    console.log("received request on " + req.path);
    next();
    console.log(`request finished in ${new Date() - timer}ms`);
  });

  //Show all products
  app.get("/product", async (req, res, next) => {
    const allProducts = await ProductService.readAllProduct();
    res.send(allProducts);
  });

  //Create
  app.post("/product", async (req, res, next) => {
    const { name, priceWithoutVAT } = req.body;
    if (!name || !priceWithoutVAT) {
      res.status(400).send("Product creation require `name, priceWithoutVAT` properties");
    }
    await ProductService.createProduct(req.body);
    res.sendStatus(201);
  });

  //Read
  app.get("/product/:id", async (req, res, next) => {
    const { id } = req.params;
    const product = await ProductService.readProduct(id);
    res.send(product);
  });

  //Update
  app.put("/product/:id", async (req, res, next) => {
    try {
      const { id } = req.params;

      const { name, priceWithoutVAT, description } = req.body;
      if (!name && !priceWithoutVAT && !description) {
        res.status(400).send("Product update require a valid property to update");
      }

      const result = await ProductService.updateProduct(req.body, id);
      if (result[0] !== 1) {
        return res.status(404).send("Could not find the Product to update");
      }

      res.sendStatus(200);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  //Delete
  app.delete("/product/:id", async (req, res, next) => {
    const { id } = req.params;
    const rowDeleted = await ProductService.deleteProduct(id);
    if (rowDeleted !== 1) {
      res.status(404).send("Product has not been found");
    }
    res.sendStatus(200);
  });

  app.use((req, res, next) => {
    res.sendStatus(404);
  });

  // make the server listen to requests
  const server = app.listen(PORT, () =>
    console.log(`Server running at: http://localhost:${PORT}/`)
  );
};

bootServer().catch(console.error);
