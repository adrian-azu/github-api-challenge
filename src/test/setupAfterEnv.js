/* eslint-disable no-undef */
require("dotenv").config();

const sequelize = require("../db/mysql");

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.close();
});
