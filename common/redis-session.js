'use strict';
let pkg = require('../package.json');
let _=require('lodash');
let sessionName=pkg.name; //session名称
sessionName=sessionName.replace(/^([\w\.]+)\.\w+\.\w+$/,'$1'); //读取域名前缀作为session名称，为区分其他后端项目，统一增加node标识
let config = {
    SECRET: pkg.name+'sessionsecret',   //加密盐
    sessionKey: sessionName +'-sid',   //session 名称
    maxAge: 30 * 60 *1000,              //cookie时间(毫秒)
    redisExpire: 24 * 60 * 60,          //Redis 过期时间
    path: "/",                          //cookie存储路径
    httpOnly: true,                     //是否只适用于http请求
    refreshSession:true                 //是否每次请求刷新cookie过期时间
};
let crypto = require('crypto');
let Redis = require('ioredis');
// 创建redis集群
let redisCluster = new Redis.Cluster(CONFIG.redisNodes);
let notConn = false;
redisCluster.on('error', function (err) {
    LOG.error('redisCluster error');
    LOG.error(err);
    notConn = true;
});
redisCluster.on('connect', function (err) {
    LOG.info('redisCluster connect');
    notConn = false;
});

let sessionIdKeyPrefix = pkg.name+'-';
let sign = function (val, secret) {
    return val + '.' + crypto
            .createHmac('sha1', secret)
            .update(val)
            .digest('base64')
            .replace(/[\/\+=]/g, '');
};
let generate = function (id) {
    let session = {};
    if (id) {
        session.id = id;
    } else {
        session.id = (new Date()).getTime() + Math.random().toString();
        session.id = sessionIdKeyPrefix + sign(session.id, config.SECRET);
    }
    return session;
};
let writeHead = function (req, res) {
    res.cookie(config.sessionKey, req.session.id,serialize(config));
};
let serialize = function (opt) {
    let options={};
    if(opt.maxAge) options.maxAge=opt.maxAge;
    if(opt.domain) options.domain=opt.domain;
    if(opt.path) options.path=opt.path;
    if(opt.httpOnly) options.httpOnly=opt.httpOnly;
    if(opt.secure) options.secure=opt.secure;
    return options;
};

module.exports = function session(options) {
    _.extend(config, options || {});
    return function session(req, res, next) {
        let id = req.cookies[config.sessionKey];
        if (!id) {
            req.session = generate();
            next();
        } else if (notConn) {
            if (!req.session) {
                req.session = generate(id);
            }
            next();
        } else {
            redisCluster.hget(id, 'session', function (err, reply) {
                if (err) {
                    LOG.error(err);
                }
                if (reply) {
                    let session = JSON.parse(reply);
                    req.session = session;
                    if(config.refreshSession) writeHead(req, res);
                    return next();
                }
                redisCluster.hdel(id, 'session');
                req.session = generate();
                next();
            });
        }
    };
};

module.exports.save = function (req, res, callback) {
    if (notConn) {
        if (callback) {
            callback();
        }
        return false;
    }
    let id = req.session.id;
    if (!id) {
        if (callback) {
            callback();
        }
        return false;
    }
    let json = JSON.stringify(req.session);
    redisCluster.hset(id, 'session', json,
        function (err, reply) {
            if (err) {
                LOG.error('session save error');
                LOG.error(err);
            } else {
                redisCluster.expire(id, config.redisExpire, function (err) {
                    if (err) {
                        LOG.error('redis expire error');
                        LOG.error(err);
                    }
                });
            }
            writeHead(req, res);
            if (callback) {
                callback(err);
            }
        });
};

module.exports.del = function (req, res, callback) {
    if (notConn) {
        if (callback) {
            callback();
        }
        return false;
    }
    let id = req.cookies[config.sessionKey];
    if (!id) {
        if (callback) {
            callback();
        }
        return false;
    }
    redisCluster.del(id,function(err){
        if (err) {
            LOG.error('redis delete error');
            LOG.error(err);
        }
        res.clearCookie(config.sessionKey);
        callback(err);
    })
};

module.exports.Cluster = redisCluster;