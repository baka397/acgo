'use strict';
let tool = require('../common/tool');
let pkg = require('../package.json');
let _ = require('lodash');

// 默认配置
let defaultConfig = {
    project: {
        port: 8000,                                         // 项目端口
        name: pkg.name,                                     // 项目名称
        version: pkg.version                                // 项目版本
    },
    db:'',                                                  // More info http://mongoosejs.com/docs/api.html#index_Mongoose-createConnection
    log: {
        path: './logs/',                                    // 日志路径
        type: 'console',                                    // 日志打印类型：console、fileLog、dateFileLog
        level: 'debug'                                      // 日志打印级别：trace、debug、info、warn、error、fatal
    },
	redis:{
        port:6379,
        host:'127.0.0.1'
    },
    //运营配置
    pageSize:10,                                            //默认列表数
    maxPageSize:150,                                        //最大列表数
    pwSalt:'47579A1306DC',                                  //密码盐
    userTokenExpire:24*60*60,                               //用户token有效时间,可续期
    redisNamespace:'acgo'                                   //redis命名空间
};
// 启动配置，部署环境变量：dev、test、uat、online
let startupConfig = process.env.CFG_PATH || ('./config-' + (process.env.NODE_ENV || 'dev'));
// 获取环境配置
let config = {};
try {console.log('启动配置文件：%s', startupConfig);config = require(startupConfig);} catch(e) {console.error('未找到启动配置：%s', startupConfig)};
// 获取当前部署环境对应配置
config = _.extend({}, defaultConfig, config || {});

module.exports = config;