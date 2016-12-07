'use strict';
const STATUS_CODE = require('../enums/status_code');
let authTool = require('../common/auth');
let App = require('../proxy/').App;


/**
 * 拦截API请求并验证
 */
exports.checkApi = function(req, res, next) {
    let token = req.header('x-req-token');
    let timestamp = parseInt(req.header('x-req-timestamp'));
    let projectAlias = req.header('x-req-project');
    let expireTime = new Date().getTime() - CONFIG.apiExpireTime*1000;
    if(!projectAlias||!timestamp||!token||timestamp<expireTime){
        let error = new Error('无效的token');
        error.status = STATUS_CODE.FORBIDDEN;
        return next(error);
    }
    App.getByAlias(projectAlias).then(function(app){
        if(!app||!authTool.validApiToken(token,app._id,timestamp)){
            let error = new Error('无效的token');
            error.status = STATUS_CODE.FORBIDDEN;
            return next(error);
        }
        req.appId = app._id;
        next();
    })
}