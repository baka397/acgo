'use strict';
let config = require('../config');
let Redis = require('ioredis');
let logger = require('./logger');

let client = new Redis({
  port: config.redis_port,
  host: config.redis_host,
  db: config.redis_db,
});

client.on('error', function (err) {
  if (err) {
    logger.error('connect to redis error, check your redis config', err);
    process.exit(1);
  }
})

module.exports = client;