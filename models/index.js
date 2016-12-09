'use strict';
const mongoose = require('mongoose');
const config   = require('../config');
mongoose.Promise = Promise;
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
require('./code');
require('./user');
require('./tag');
require('./anime');
require('./anime_group_task');
require('./anime_group_item');
exports.App = mongoose.model('App');
exports.Code = mongoose.model('Code');
exports.User = mongoose.model('User');
exports.Tag = mongoose.model('Tag');
exports.Anime = mongoose.model('Anime');
exports.AnimeGroupTask = mongoose.model('AnimeGroupTask');
exports.AnimeGroupItem = mongoose.model('AnimeGroupItem');