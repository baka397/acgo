'use strict';
const crypto = require('crypto');
const redisClient = require('../common/redis');
const tool = require('./tool');

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
 * @param  {String} user   用户对象
 * @return {Object}        Promise对象
 */
exports.createLoginToken = function(user){
    let token = md5Hash(user._id+new Date().getTime());
    let key = CONFIG.redisNamespace+':key:'+token;
    let userIndexKey = CONFIG.redisNamespace+':userTokens:'+user._id;
    let redisPipeline=redisClient.pipeline();
    let redisData = {
        _id:user._id,
        email:user.email
    }
    if(CONFIG.admins[user.email]){
        redisData.role=CONFIG.admins[user.email];
    }else{
        redisData.role='user';
    }
    redisPipeline.set(key,JSON.stringify(redisData)).expire(key,CONFIG.userTokenExpire).sadd(userIndexKey,key);
    return redisPipeline.exec().then(function(data){
        return tool.nextPromise(null,{
            'key':token
        })
    })
}

exports.removeUserToken = function(userId){
    let userIndexKey = CONFIG.redisNamespace+':userTokens:'+userId;
    return redisClient.smembers(userIndexKey).then(function(keys){
        return redisClient.del.apply(redisClient,[userIndexKey].concat(keys));
    })
}

exports.removeLoginToken = function(token){
    let key = CONFIG.redisNamespace+':key:'+token;
    return redisClient.del(key);
}

/**
 * 获取用户token
 */
exports.getUserIdByToken = function(token){
    let key = CONFIG.redisNamespace+':key:'+token;
    let redisPipeline=redisClient.pipeline();
    return redisPipeline.get(key).expire(key,CONFIG.userTokenExpire).exec().then(function(data){
        if(!data[0][1]){
            throw new Error('无效的key');
        }
        return tool.nextPromise(null,data[0][1]);
    })
}

exports.md5Hash = md5Hash;