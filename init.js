//初始化运营数据
'use strict';
const nock = require('nock');
nock.enableNetConnect(); // 允许真实的网络连接
const app = require('./app');
const request = require('supertest');
let client = request(app);
//创建爬虫应用
client.post('/app/')
.send({
    "projectName":"爬虫应用",
    "projectAlias":"crawler",
    "userName":"baka",
    "userEmail":"cqggff@live.com"
})
.expect(200)
.expect(function(res){
    if(res.body.code!==200) throw new Error(res.body.msg);
    console.log('创建应用成功,应用KEY:',res.body.data._id,'应用名:',res.body.data.project_alias);
})
.end(function(err,res){
    if(err){
        console.log('创建应用失败',err.message);
    }
});

client.post('/code/')
.expect(200)
.expect(function(res){
    if(res.body.code!==200) throw new Error(res.body.msg);
    console.log('创建邀请码成功:',res.body.data._id);
})
.end(function(err,res){
    if(err){
        console.log('创建应用失败',err.message);
    }
});