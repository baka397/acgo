'use strict';
const mongoose = require('mongoose');
const config   = require('../config');
mongoose.Promise = Promise;
mongoose.connect(config.db, {
    server: {poolSize: 20}
}, function (err) {
    if (err) {
        global.LOG.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
    global.LOG.info('MongoDB connect succeed', config.db);
});

// models
require('./app');
require('./code');
require('./user');
require('./user_follow');
require('./tag');
require('./anime');
require('./anime_edit');
require('./anime_sub');
require('./anime_group');
require('./anime_group_task');
require('./anime_group_item');
require('./anime_group_history');
exports.App = mongoose.model('App');
exports.Code = mongoose.model('Code');
exports.User = mongoose.model('User');
exports.UserFollow = mongoose.model('UserFollow');
exports.Tag = mongoose.model('Tag');
exports.Anime = mongoose.model('Anime');
exports.AnimeEdit = mongoose.model('AnimeEdit');
exports.AnimeSub = mongoose.model('AnimeSub');
exports.AnimeGroup = mongoose.model('AnimeGroup');
exports.AnimeGroupTask = mongoose.model('AnimeGroupTask');
exports.AnimeGroupItem = mongoose.model('AnimeGroupItem');
exports.AnimeGroupHistory = mongoose.model('AnimeGroupHistory');