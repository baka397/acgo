//初始化运营数据
'use strict';
const nock = require('nock');
nock.enableNetConnect(); // 允许真实的网络连接
const app = require('./app');
const request = require('supertest');
let client = request(app);
switch(process.env.NODE_INIT_CASE){
case 'addapp':
    //创建应用
    client.post('/app/')
    .send({
        'projectName':process.env.NODE_INIT_PNAME,
        'projectAlias':process.env.NODE_INIT_ALIAS,
        'userName':process.env.NODE_INIT_UNAME,
        'userEmail':process.env.NODE_INIT_EMAIL
    })
    .expect(200)
    .expect(function(res){
        if(res.body.code!==200) throw new Error(res.body.msg);
        global.console.log('创建应用成功,应用KEY:',res.body.data._id,'应用名:',res.body.data.project_alias);
    })
    .end(function(err){
        if(err){
            global.console.log('创建应用失败',err.message);
        }
        process.exit(1);
    });
    break;
case 'code':
    client.post('/code/')
    .expect(200)
    .expect(function(res){
        if(res.body.code!==200) throw new Error(res.body.msg);
        global.console.log('创建邀请码成功:',res.body.data._id);
    })
    .end(function(err){
        if(err){
            global.console.log('创建邀请码失败',err.message);
        }
        process.exit(1);
    });
    break;
case 'search':
    client.post('/init/search/')
    .expect(200)
    .expect(function(res){
        if(res.body.code!==200) throw new Error(res.body.msg);
        global.console.log('初始化搜索引擎数据成功');
    })
    .end(function(err){
        if(err){
            global.console.log('初始化搜索引擎数据失败',err.message);
        }
        process.exit(1);
    });
    break;
default:
    global.console.log('无效的命令');
    process.exit(1);
}