'use strict';
/**
 * API 限制方法
 */

//载入配置
var config = require('../config');

var LogProxy = require('../proxy').Log;

//加载工具
var tool = require('../common/tool');
const POST_TYPE = require('../enums/common').POST_TYPE;

//添加访问日志
exports.addLog = function(req, res, next) {
    let post_method = req.method.toUpperCase();
    let method = 0;
    switch(post_method){
        case 'GET':
            method=POST_TYPE.GET;
            break;
        case 'POST':
            method=POST_TYPE.POST;
            break;
        case 'PUT':
            method=POST_TYPE.PUT;
            break;
        case 'DELETE':
            method=POST_TYPE.DELETE;
            break;
        default:
            break;
    }
    let full_url = req.originalUrl;
    LogProxy.newAndSave({
        user_id: req.user ? req.user._id : '',
        ip:tool.getClientIp(req),
        url:full_url,
        status:200,
        method:method
    });
    next();
}

//添加错误日志
exports.addErrorLog = function(err, req, res, next) {
    let status=err.status?err.status:500;
    let full_url = req.originalUrl;
    LogProxy.newAndSave({
        user_id: req.user ? req.user._id : '',
        ip:tool.getClientIp(req),
        url:full_url,
        status:status
    });
    next(err);
}