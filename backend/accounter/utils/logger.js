const winston = require('winston');

module.exports = winston.createLogger({
    format: winston.format.json(),
    transports: [
        new winston.transports.File({
            filename: 'combined.log'
        }),
        new winston.transports.Console()
    ],
    exitOnError: true,
})