//加载依赖
var express = require('express');
var bodyParser = require('body-parser'); //body解析
var path = require('path');
//加载配置文件
var config = require('./config');
//加载工具类
var logger = require('./common/logger');
var api_router = require('./api_router');

//加载中间件
var apiLimit = require('./middlewares/api_limit');
var auth = require('./middlewares/auth');
var log = require('./middlewares/log');

//加载controller
var index = require('./controllers/index');

/*创建express项目*/
var app = express();

app.use(apiLimit.aclLimit); //加载访问控制
app.use(auth.authLogin); //加载登录检测
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

//路由
app.use('/api/',log.addLog,function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    next();
},api_router);

//设置静态目录
app.use(express.static(path.join(__dirname, 'public')));

//设置前端页面访问
app.get('*',index.index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = {status:404};
    next(err);
});

app.use(log.addErrorLog); //存储错误日志

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    logger.debug(err);
    res.setHeader('Access-Control-Allow-Origin','*');
    if(!err.msg){
        err.msg='';
    }
    switch(err.status){
        case 101:
            logger.error(err);
            break;
        case 400:
            err.msg='获取数据错误';
            logger.error(err);
            break;
        case 404:
            err.msg='没有这个API';
            break;
        case 500:
            logger.error(err);
            err.msg='未知错误,请联系管理员';
            break;
        default:
            logger.error(err);
            if(!err.status){
                err.status=101;
            }
            err.msg='错误的请求内容';
            break;
    }
    res.send({
        head:{
            status:err.status,
            msg:err.msg
        },
        body:{}
    });
});

module.exports = app;