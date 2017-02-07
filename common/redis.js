'use strict';
const Redis = require('ioredis');
const config = require('../config/');
let redisClient = new Redis(config.redis);
redisClient.on('error', function (err) {
    global.LOG.error('Redis connect error',config.redis.host+':'+config.redis.port);
    global.LOG.error(err);
});
redisClient.on('connect', function () {
    global.LOG.info('Redis connect succeed',config.redis.host+':'+config.redis.port);
});
module.exports = redisClient;