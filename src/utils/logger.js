const { createLogger, format, transports } = require("winston");

const logLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
  trace: 5,
};

const logger = createLogger({
  levels: logLevels,
  format: format.combine(format.errors({ stack: true }), format.timestamp(), format.json()),
  transports: [new transports.Console({})]
});
const profiler = logger.startTimer();

setTimeout(() => {
  // End the timer and log the duration
  profiler.done({ message: "Logging message" });
}, 1000);

module.exports = logger;
