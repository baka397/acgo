'use strict';
const Redis = require('ioredis');
const config = require('../config/');
let redisClient = new Redis(config.redis);
module.exports = redisClient;