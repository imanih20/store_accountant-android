require('express-async-errors');
const logger = require('../utils/logger');
const {transports} = require('winston')
module.exports = function() {
    logger.exceptions.handle(
        new transports.File({
            filename: 'exceptions.log'
        }),
        new transports.Console()
    );

    logger.rejections.handle(
        new transports.File({
            filename: 'rejections.log'
        }),
        new transports.Console()
    );
}