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
};

/**
 * 生成用户登录token
 * @param  {String} user   用户对象
 * @return {Object}        Promise对象
 */
exports.createLoginToken = function(user){
    let token = md5Hash(user._id+new Date().getTime());
    let key = global.CONFIG.redisNamespace+':key:'+token;
    let userIndexKey = global.CONFIG.redisNamespace+':userTokens:'+user._id;
    let redisPipeline=redisClient.pipeline();
    let redisData = {
        _id:user._id,
        email:user.email
    };
    if(global.CONFIG.admins[user.email]){
        redisData.role=global.CONFIG.admins[user.email];
    }else{
        redisData.role='user';
    }
    redisPipeline.set(key,JSON.stringify(redisData)).expire(key,global.CONFIG.userTokenExpire).sadd(userIndexKey,key);
    return redisPipeline.exec().then(function(){
        return tool.nextPromise(null,{
            'key':token
        });
    });
};

/**
 * 生成用户重置token
 * @param  {String} user   用户对象
 * @return {Object}        Promise对象
 */
exports.createResetToken = function(user){
    let userIndexKey = global.CONFIG.redisNamespace+':userResetTokens:'+user._id;
    return redisClient.get(userIndexKey).then(function(data){
        if(data) throw new Error('已发送邮件,请勿重复提交');
        let token = md5Hash(user._id+new Date().getTime());
        let key = global.CONFIG.redisNamespace+':reset:'+token;
        let redisPipeline=redisClient.pipeline();
        let redisData = {
            _id:user._id,
            email:user.email
        };
        redisPipeline.set(key,JSON.stringify(redisData)).expire(key,global.CONFIG.userResetExpire).set(userIndexKey,key).expire(userIndexKey,global.CONFIG.userResetExpire);
        return redisPipeline.exec().then(function(){
            return tool.nextPromise(null,{
                'key':token
            });
        });
    });
};

exports.removeUserToken = function(userId){
    let userIndexKey = global.CONFIG.redisNamespace+':userTokens:'+userId;
    return redisClient.smembers(userIndexKey).then(function(keys){
        return redisClient.del.apply(redisClient,[userIndexKey].concat(keys));
    });
};

exports.removeLoginToken = function(token){
    let key = global.CONFIG.redisNamespace+':key:'+token;
    return redisClient.del(key);
};

/**
 * 获取用户token
 */
exports.getUserIdByToken = function(token){
    let key = global.CONFIG.redisNamespace+':key:'+token;
    let redisPipeline=redisClient.pipeline();
    return redisPipeline.get(key).expire(key,global.CONFIG.userTokenExpire).exec().then(function(data){
        if(!data[0][1]){
            throw new Error('无效的key');
        }
        return tool.nextPromise(null,data[0][1]);
    });
};

/**
 * 获取用户重置token
 */
exports.getUserIdByResetToken = function(token){
    let key = global.CONFIG.redisNamespace+':reset:'+token;
    return redisClient.get(key).then(function(data){
        if(!data) throw new Error('无效的重置token');
        return tool.nextPromise(null,data);
    });
};

/**
 * 删除用户重置token
 */
exports.removeUserResetToken = function(userId){
    let userIndexKey = global.CONFIG.redisNamespace+':userResetTokens:'+userId;
    return redisClient.get(userIndexKey).then(function(key){
        return redisClient.del.apply(redisClient,[userIndexKey,key]);
    });
};

exports.md5Hash = md5Hash;