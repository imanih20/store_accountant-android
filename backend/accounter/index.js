const logger = require('./utils/logger');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = require('./app');

require('./startup/config')();
require('./startup/log')();
require('./startup/db')();
require('./startup/routes')(app);
require('./startup/prod')(app);

const port = process.env.PORT || 3000;

module.exports = app.listen(port,() => logger.info(`listening to port ${port}`));

