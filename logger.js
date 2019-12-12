var winston = require("winston")

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  level: "info",
  transports: [
    new winston.transports.Console({
      timestamp: function() {
        return new Date().toISOString()
      }
    })
  ]
})

module.exports = logger
