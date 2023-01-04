const mongoose  = require('mongoose');
const logger = require('../utils/logger');
const config = require('config');

module.exports = function() {
    const db = config.get('db');
    mongoose.connect(db)
        .then(()=> {logger.info(`connected to ${db}.`)});
}