'use strict';
const crypto = require('crypto');
const redisClient = require('../common/redis');

function md5Hash(str){
    let hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex').toUpperCase();
}

/**
 * 验证API token是否有效
 */
exports.validApiToken = function(token,appId,timestamp){
    return token===md5Hash(appId+timestamp);
}

/**
 * 生成用户登录token
 * @param  {String} userId 用户ID
 * @return {Object}        Promise对象
 */
exports.createLoginToken = function(userId){
    let token = md5Hash(userId+new Date().getTime());
    let key = CONFIG.redisNamespace+':key:'+token;
    let redisPipeline=redisClient.pipeline();
    redisPipeline.set(key,userId).expire(key,CONFIG.userTokenExpire);
    return redisPipeline.exec().then(function(data){
        return new Promise(function(resolve,reject){
            resolve({
                'key':token
            });
        })
    })
}

exports.md5Hash = md5Hash;