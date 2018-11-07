const winston = require("winston");
const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
  level: "info",
  format: combine(
    label({ label: "===>" }),
    timestamp({
      format: "DD.MM.YYYY HH:mm:ss"
    }),
    myFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "./logs/app.log" })
  ]
});

module.exports = logger;
