'use strict';
/**
 * Created by jie.ding on 2016/4/26.
 * Updated by jing.zhang on 2016/10/12.
 */
const fs = require('fs');
const path = require('path');
const log4js = require('log4js');
const config = require('./config/');
const tool = require('./common/tool');
let logPath = process.env.LOG_PATH || config.log.path, logType = config.log.type, logLevel = config.log.level;
//同步创建日志目录
try{
	fs.statSync(logPath);
}catch(e){
	fs.mkdirSync(logPath);
}
log4js.configure({
	appenders: [
		{
			type: 'console',
			category: "console"
		}, // 控制台输出
		{
			type: 'file',
			category: 'fileLog',
			filename: path.join(logPath, 'log.log'),
			maxLogSize: 2 * 1024 * 1024 * 1024,
			backups: 7
		} , // 单文件输出
		{
			type: "dateFile",
			category: 'dateFileLog',
			filename: path.join(logPath, 'log'),
			pattern: "-yyyy-MM-dd.log",
			backups: 7,
			alwaysIncludePattern: true

		} // 日期格式文件输出
	],
	replaceConsole: false,   //替换console.log
	levels: {
		console: logLevel,
		fileLog: logLevel,
		dateFileLog: logLevel
	}
});
let logger = log4js.getLogger(logType || 'dateFileLog');

exports.logger = logger;
exports.use = function (app) {
	app.use(log4js.connectLogger(logger, {level: logLevel, format: ':method :url'}));
	//记录传输数据
	app.use(function(req,res,next){
		switch(req.method){
			case 'GET':
				logger.info(tool.filterReqLog(req.query));
				break;
			default:
				logger.info(tool.filterReqLog(req.body));
		}
		next();
	})
};