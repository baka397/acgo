'use strict';
const Orc=require('orc-engine');
const config = require('../../config/');
let orcClient=new Orc({
    name:config.redisNamespace+':orc',
    redis:config.redis,
    dimensionWeight:config.dimensionWeight
});
orcClient.redis.on('error', function (err) {
    global.LOG.error('Orc-engine Redis connect error',config.redis.host+':'+config.redis.port);
    global.LOG.error(err);
});
orcClient.redis.on('connect', function () {
    global.LOG.info('Orc-engine Redis connect succeed',config.redis.host+':'+config.redis.port);
});
module.exports=orcClient;