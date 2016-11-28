var mongoose = require('mongoose');
var config = require('../config');
var logger = require('../common/logger');

mongoose.connect(config.db, {
    server: {
        poolSize: 20
    }
}, function(err) {
    if (err) {
        logger.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

// models
require('./user');
require('./log');
require('./menu');
require('./action');
require('./role');
require('./code');

exports.User = mongoose.model('User');
exports.Log = mongoose.model('Log');
exports.Menu = mongoose.model('Menu');
exports.Action = mongoose.model('Action');
exports.Role = mongoose.model('Role');
exports.Code = mongoose.model('Code');