require("dotenv").config();
require("./databaseConfiguration.js");
const express = require("express");

class Server {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  routes() {
    this.app.use("/api/users", require("../routes/userRoutes"));
  }

  middlewares() {
    this.app.use(express.json()); // Para parsear JSON
    this.app.use(express.urlencoded({ extended: true })); // Para parsear datos de formularios
  }

  listen() {
    this.app.listen(5000, () => {
      console.log(`server running on port 5000`);
    });
  }
}

module.exports = Server;
