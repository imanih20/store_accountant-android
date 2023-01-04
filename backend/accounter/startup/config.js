const config = require('config');
const logger = require('../utils/logger');
module.exports = function() {
    if (!config.get('jwtPrivateKey')){
        logger.error('jwt private key not provided.');
        process.exit(1);
    }
}