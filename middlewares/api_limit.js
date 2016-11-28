/**
 * API 限制方法
 */

//载入配置
var config= require('../config');

//加载工具
var redis= require('../common/redis');
var tool= require('../common/tool');
var logger = require('../common/logger');

//ACL每分钟限制
exports.aclLimit = function(req, res , next){
    var ip=tool.getClientIp(req);
    limitDay(ip).then(function(){
        return limitMin(ip);
    }).then(function(){
        next();
    }).catch(function(){
        next({
            status:405,
            msg:'请求过于频繁'
        })
    })
}

//查询是否超过每分钟限制
function limitMin(ip){
    return new Promise(function(resolve, reject){
        var acl_key='api:'+ip+':acl_min';
        var add_time=60;
        redis.get(acl_key,function(cache_err,limit){
            if(cache_err){
                logger.error('查询IP访问限制缓存出错:', cache_err);
                resolve();
                return false;
            }
            if(limit){
                if(config.acl_min_limit&&limit>config.acl_min_limit){
                    setLimitDay(ip).then(function(){
                        reject();
                    }).catch(function(){
                        reject();
                    });
                    return false;
                }
                redis.incr(acl_key);
            }
            else{
                redis.setex(acl_key,add_time,1);
            }
            resolve();
        });
    })
}

//查询是否超过每日限制
function limitDay(ip){
    return new Promise(function(resolve, reject){
        var acl_key='api:'+ip+':acl_day';
        redis.get(acl_key,function(cache_err,limit){
            if(cache_err){
                logger.error('查询IP访问限制缓存出错:', cache_err);
                resolve();
                return false;
            }
            if(limit){
                if(config.acl_day_limit&&limit>config.acl_day_limit){
                    reject();
                    return false;
                }
            }
            resolve();
        });
    });
}

//设置每日限制
function setLimitDay(ip){
    return new Promise(function(resolve, reject){
        var acl_key='api:'+ip+':acl_day';
        var add_time=24*60*60;
        redis.get(acl_key,function(cache_err,limit){
            if(limit){
                redis.incr(acl_key);
            }else{
                redis.setex(acl_key,add_time,1);
            }
            resolve();
        });
    });
}