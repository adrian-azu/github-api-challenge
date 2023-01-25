const Redis = require("ioredis");
const logger = require("../utils/logger");
const { REDIS_HOST, REDIS_PORT } = process.env;

const client = new Redis({
  host: REDIS_HOST || "localhost",
  port: parseInt(REDIS_PORT) || 6379,
  retryStrategy: (number) => {
    console.log(number);
  },
});
client.on("error", (err) => {
  logger.error("Redis connection error", err);
});
client.on("connect", function () {
  console.log("Redis Connected");
});

module.exports = client;
