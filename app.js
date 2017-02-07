'use strict';
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let bodyParser = require('body-parser');
let log = require('./log');
let router = require('./router');
let STATUS_CODE = require('./enums/status_code');
let apiAuth = require('./middlewares/api_auth');

// 全局请求地址前缀
global.__CONTEXT_PATH = '/';
// 日志对象
global.LOG = log.logger;
// 系统配置
global.CONFIG = require('./config/');

let app = express();

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/cert/',favicon(path.join(__dirname, 'favicon.ico')));
app.use('/cert/',express.static(path.join(__dirname, 'cert')));

// 设置日志记录
log.use(app);
//API拦截
app.use('/api/*',apiAuth.checkApi,apiAuth.checkApiUser);
// 加载系统路由
router(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('ERROR NO PAGE FOUND');
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    if(err.code!==404||err.status!==404) global.LOG.error(err);
    let code = err.code || err.status || 500;
    let message = err.message || err.stack;
    if (/TIMEDOUT/i.test(code) || err.syscall == 'connect' || err.hasOwnProperty('connect')) {
        code = 408;
        message = '网络异常，请稍候再试';
    }else if(/^\d+$/.test(code)){
        switch(code){
        case 404:
            message = '找不到当前页面';
            break;
        case 500:
            message = '系统错误';
            break;
        case 502:
            message = '数据访问异常，请稍后重试';
            break;
        case STATUS_CODE.MONGO_ERROR:
            if(err.errors){
                let errorName = Object.keys(err.errors)[0];
                if(err.errors[errorName].name==='CastError') message = '参数类型错误';
                else message = err.errors[errorName].message;
            }
            break;
        case STATUS_CODE.MONGO_UNIQUE_ERROR:
            code = STATUS_CODE.MONGO_ERROR;
            message = message.replace(/^[\S\s]+\"([\S\s]+)\"[\S\s]+$/,'$1') + '已被占用';
            break;
        }
    }else{
        code=500;
        message = '未知异常，请记录相关地址/操作并联系管理员处理';
    }

    // 返回数据
    let params = {
        code: code,
        msg: message
    };

    switch(code){
    case 403:
    case 404:
    case 500:
        res.status(code);
        break;
    }

    try {
        res.send(params);
    } catch (e) {
        global.LOG.error(e);
        next(e);
    }
});

module.exports = app;
