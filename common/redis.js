'use strict';
const Redis = require('ioredis');
const config = require('../config/');
let redisClient = new Redis(config.redis);
redisClient.on('error', function (err) {
    LOG.error('redisClient error');
    LOG.error(err);
});
redisClient.on('connect', function (err) {
    LOG.info('redisClient connect');
});
module.exports = redisClient;