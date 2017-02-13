'use strict';
let pkg = require('../package.json');

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
    qiniu:{                                                 //七牛图片上传配置
        bucket:'acgo-test',
        accessKey:'7h1BLnvFNImqMR8xWXUOAexEOdvpzfDqynAWvRFH',
        sercetKey:'IqVhcvdxBWVJ_P3gAFR9SNjIYIyV0GiIM27YyDCP'
    },
    mailgun:{                                               //邮件系统配置
        apiKey:'key-4gbycm953yvy11aqupebl9to5u0qapg8',
        domain:'mail.acgo.club'
    },
    //token过期时间
    userTokenExpire:24*60*60,                               //用户token有效时间,可续期(s)
    userResetExpire:30*60,                                  //用户重置token有效时间(s)
    //运营配置
    pageSize:10,                                            //默认列表数
    maxPageSize:150,                                        //最大列表数
    pwSalt:'47579A1306DC',                                  //密码盐
    redisNamespace:'acgo',                                  //redis命名空间
    blockNickName:['admin','管理'],                         //屏蔽的昵称
    //管理员配置
    admins:{
        'admin@test.com':'admin,crawler'
    },
    closeMail:false,                                        //是否关闭邮件发送
    maxInitNum:10                                           //单次最大初始化个数
};
// 启动配置，部署环境变量：dev、test、uat、online
let startupConfig = process.env.CFG_PATH || ('./config-' + (process.env.NODE_ENV || 'dev'));
// 获取环境配置
let config = {};
try {
    global.console.log('启动配置文件：%s', startupConfig);config = require(startupConfig);
} catch(e) {
    global.console.error('未找到启动配置：%s', startupConfig);
}
// 获取当前部署环境对应配置
config = Object.assign({}, defaultConfig, config || {});

module.exports = config;