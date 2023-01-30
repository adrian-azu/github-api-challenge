require("events").EventEmitter.defaultMaxListeners = Infinity;

const sequelize = require("./setupTests");

module.exports = async () => {
  await sequelize.close();
};
