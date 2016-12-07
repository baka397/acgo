var STATUS_CODE = require('../enums/status_code');
var authTool = require('../common/auth');
var _ = require('lodash');
var App = require('../proxy/').App;


/**
 * 拦截API请求并验证
 */
exports.checkApi = function(req, res, next) {
    var token = req.query.token;
    var timestamp = parseInt(req.query.timestamp);
    var project_alias = req.query.project;
    var expireTime = new Date().getTime() - CONFIG.apiExpireTime*1000;
    if(!project_alias||!timestamp||!token||timestamp<expireTime){
        var error = new Error('无效的token');
        error.status = STATUS_CODE.FORBIDDEN;
        return next(error);
    }
    App.getByAlias(project_alias).then(function(app){
        if(!app||!authTool.validApiToken(token,app._id,timestamp)){
            var error = new Error('无效的token');
            error.status = STATUS_CODE.FORBIDDEN;
            return next(error);
        }
        req.appId = app._id;
        next();
    })
}