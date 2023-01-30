require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const hpp = require("hpp");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const redis = require("./src/db/redis");
const { errorHandler } = require("./src/middlewares/ErrorHandler");
const routes = require("./src/routes");
const logger = require("./src/utils/logger");

const app = express();

app.use(cors());
app.use(hpp());
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(helmet.hidePoweredBy());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(bodyParser.json());

app.use(routes);

app.use((req, res, next) => {
  res.on("finish", () => {
    redis.disconnect();
  });
  next();
});
app.use(errorHandler);
app.listen(process.env.PORT || 3000, () => {
  logger.info("Server started on port 3000");
});
