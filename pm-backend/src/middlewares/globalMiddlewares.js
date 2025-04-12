const cors = require("cors");
const bodyParser = require("body-parser");

const applyGlobalMiddlewares = (app) => {
  app.use(cors());
  app.use(bodyParser.json());
};

module.exports = { applyGlobalMiddlewares };
