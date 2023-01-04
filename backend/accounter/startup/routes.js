const express = require('express');
const transactions = require('../routes/transactions');
const types = require('../routes/type')
const users = require('../routes/users');
const auth = require('../routes/auth');
const statistic = require('../routes/statistic');
const error = require('../middleware/error');

module.exports = function(app) {
    app.use(express.json());
    app.use('/api/transactions',transactions);
    app.use('/api/users',users);
    app.use('/api/auth',auth);
    app.use('/api/type',types);
    app.use('/api/statistic',statistic);
    app.use(error);
}