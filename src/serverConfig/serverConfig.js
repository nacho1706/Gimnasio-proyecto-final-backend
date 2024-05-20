const express = require("express");

class Server {
  constructor() {
    this.app = express();
  }

  listen() {
    this.app.listen(5000, () => {
      console.log(`server running on port 5000`);
    });
  }
}

module.exports = Server;
