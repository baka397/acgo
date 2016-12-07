'use strict';
const Redis = require('ioredis');
let redisCluster = new Redis.Cluster(CONFIG.redisNodes);
exports.client = redisCluster;