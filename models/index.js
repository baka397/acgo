var mongoose = require('mongoose');
var config   = require('../config');
mongoose.Promise = require('bluebird');
mongoose.connect(config.db, {
  server: {poolSize: 20}
}, function (err) {
  if (err) {
    LOG.error('connect to %s error: ', config.db, err.message);
    process.exit(1);
  }
});

// models
require('./app');
exports.App = mongoose.model('App');