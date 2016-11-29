'use strict';
let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let ejs = require('ejs');
let log = require('./log');
let router = require('./router');
let tool = require('./common/tool');

// 全局请求地址前缀
global.__CONTEXT_PATH = '/';
// 日志对象
global.LOG = log.logger;
// 系统配置
global.CONFIG = require('./config/');
// redis集群对象
global.Redis = require('./common/redis-session');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express);
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 设置session
app.use(global.Redis());

// 设置日志记录
log.use(app);
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
	if(err.code!==404) LOG.error(err);
    let code = err.code || err.status || 500;
    let message = err.message || err.stack;
    if (/TIMEDOUT/i.test(code) || err.syscall == 'connect' || err.hasOwnProperty('connect')) {
        code = 408;
        message = '网络异常，请稍候再试~';
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
        }
    }else{
        code=500;
        message = '未知异常，请记录相关地址/操作并联系管理员处理';
    }

	// 返回数据
	let params = {
		title: err.title || code,
		code: code,
		msg: message
	};

	try {
        let reqAjaxInfo=tool.isAjaxRequest(req);
		if (reqAjaxInfo.needJson) { //判定是否需要以json形式返回
			res.send(params);
		} else {
            //设置特殊情况下的http状态码，否则为200
            switch(code){
                case 403:
                case 404:
                case 500:
                    res.status(code);
                    break;
            }
            params.isAjax=reqAjaxInfo.result; //判定是否为ajax请求
            if(code===403) res.render('common/403',params);
			else res.render('common/error',params);
		}
	} catch (e) {
		LOG.error(e);
	}
});

module.exports = app;
