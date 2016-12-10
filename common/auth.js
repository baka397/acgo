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
 * @param  {String} user   用户对象
 * @return {Object}        Promise对象
 */
exports.createLoginToken = function(user){
    let token = md5Hash(user._id+new Date().getTime());
    let key = CONFIG.redisNamespace+':key:'+token;
    let redisPipeline=redisClient.pipeline();
    let redisData = {
        _id:user._id,
        email:user.email,
        role:user.role
    }
    redisPipeline.set(key,JSON.stringify(redisData)).expire(key,CONFIG.userTokenExpire);
    return redisPipeline.exec().then(function(data){
        return new Promise(function(resolve,reject){
            resolve({
                'key':token
            });
        })
    })
}

/**
 * 获取用户token
 */
exports.getUserIdByToken = function(token){
    let key = CONFIG.redisNamespace+':key:'+token;
    return redisClient.get(key).then(function(data){
        if(!data){
            throw new Error('无效的key');
        }
        return new Promise(function(resolve,reject){
            resolve(data);
        })
    })
}

exports.md5Hash = md5Hash;