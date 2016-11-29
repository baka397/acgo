'use strict';
let tool = require('../common/tool');
let pkg = require('../package.json');
let _ = require('lodash');

// 默认配置
let defaultConfig = {
    project: {
        port: 5500,                                         // 项目端口
        name: pkg.name,                                     // 项目名称
        version: pkg.version                                // 项目版本
    },
    log: {
        path: './logs/',                                    // 日志路径
        type: 'console',                                    // 日志打印类型：console、fileLog、dateFileLog
        level: 'debug'                                      // 日志打印级别：trace、debug、info、warn、error、fatal
    },
	redisNodes:[]
};
// 启动配置，部署环境变量：dev、test、uat、online
let startupConfig = process.env.CFG_PATH || ('./config-' + (process.env.NODE_ENV || 'dev'));
// 获取环境配置
let config = {};
try {console.log('启动配置文件：%s', startupConfig);config = require(startupConfig);} catch(e) {console.error('未找到启动配置：%s', startupConfig)};
// 获取当前部署环境对应配置
config = _.extend({}, defaultConfig, config || {});

module.exports = config;