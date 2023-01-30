const client = require("../db/redis");
const logger = require("./logger");

module.exports = {
  setToken: async (token, data) => {
    try {
      await client.set(token, JSON.stringify({ _id: data._id, email: data.email, name: data.name }), "EX", process.env.JWT_EXPIRATION || 86400);
    } catch (error) {
      logger.error(error);
    }
  },
  deleteToken: async (token = "") => {
    try {
      await client.del(token);
    } catch (error) {
      logger.error(error);
    }
  },
  // eslint-disable-next-line consistent-return
  get: async (key = "") => {
    try {
      return await client.get(key);
    } catch (error) {
      logger.error(error);
    }
  },
  setExp: async (token = "", data = "", expiration = 10) => {
    try {
      await client.set(token, data, "EX", expiration);
    } catch (error) {
      logger.error(error);
    }
  },
};
