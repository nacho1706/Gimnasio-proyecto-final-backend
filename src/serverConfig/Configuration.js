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
    // this.app.use(isJsonMiddleware); PREGUNTAR
    this.app.use("/api/users", require("../routes/userRoutes"));
    this.app.use("/api", require("../routes/appointmentRoutes.js"));
    this.app.use("/api", require("../routes/branchRoutes.js"));
    this.app.use("/api", require("../routes/activityRoutes.js"));
    this.app.use("/api", require("../routes/shiftRoutes.js"));
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
