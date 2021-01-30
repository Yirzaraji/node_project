const express = require("express");
const db = require("./models");

const bootServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

  // create new express app and save it as "app"
  const app = express();
  // server configuration
  const PORT = 8080;

  // create a route for the app
  app.get("*", (req, res, next) => {
    console.time("request timer");
    console.log("received request on " + req.path);
    next();
  });

  app.get("/", (req, res, next) => {
    console.log("Quelqu'un requete get la home uesh");
    res.send("on me voit");
    next();
  });

  //  path:  "/banana/12?variety=plantain"
  app.get("/banana/:id", (req, res, next) => {
    console.log({ query: req.query });
    console.log({ params: req.params });
    let queryDb = `SELECT * FROM banana WHERE id=${req.params.id}`;

    if (req.query.variety) {
      queryDb = queryDb + ` AND variety=${req.query.variety}`;
    }

    console.log(queryDb);
    res.send("miam bananan");
    next();
  });

  app.get("*", (req, res) => {
    console.timeEnd("request timer");
  });

  // make the server listen to requests
  const server = app.listen(PORT, () =>
    console.log(`Server running at: http://localhost:${PORT}/`)
  );
};

bootServer().catch(console.error);
