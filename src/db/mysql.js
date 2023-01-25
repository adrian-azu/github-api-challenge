"use strict";
const Sequelize = require("sequelize");
const logger = require("../utils/logger");
const env = process.env.NODE_ENV ?? "development";
const config = require(__dirname + "/../config/config.js")[env];
const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  port: config.port,
  dialect: config.dialect,
  logging: false,
});
sequelize
  .authenticate()
  .then(() => {
    logger.info("Connection has been established successfully.");
    // console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    logger.error("Unable to connect to database", error);
    process.exit(1);
  });

module.exports = sequelize;
