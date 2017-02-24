'use strict';
const STATUS_CODE = require('../../../enums/status_code');
const apiTool = require('../tool');
const redisClient = require('../../../common/redis');
const config = require('../../../config/');
module.exports=function(app){
    let path = '/api/v1/timeline/';
    let apiTokenParams;
    let apiLoginTokenParams;
    let apiAdminTokenParams;
    let apiEmailTokenParams;
    let password = apiTool.getPassword('testpassword');
    let userId;
    let userAdminId;
    let userEmailId;
    describe('/timeline/', function(){
        //Prepare
        it('Prepare Token', function (done) {
            app.get('/app/')
            .expect(function(res){
                if(res.body.data.content.lenth===0) throw new Error('没有APP');
                apiTokenParams=apiTool.getTokenParams(res.body.data.content[0]._id,res.body.data.content[0].project_alias);
            })
            .end(function(err,res){
                done(err);
            })
        })
        it('POST /user/login', function (done) {
            app.post('/api/v1/user/login')
            .set(apiTokenParams)
            .send({
                'email':'test@test.com',
                'password':password
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(!res.body.data.key) throw new Error('验证不符合预期');
                apiLoginTokenParams=Object.assign({},apiTokenParams,{
                    'x-req-key':res.body.data.key
                });
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/login', function (done) {
            app.post('/api/v1/user/login')
            .set(apiTokenParams)
            .send({
                'email':'admin@test.com',
                'password':password
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(!res.body.data.key) throw new Error('验证不符合预期');
                apiAdminTokenParams=Object.assign({},apiTokenParams,{
                    'x-req-key':res.body.data.key
                });
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/login', function (done) {
            app.post('/api/v1/user/login')
            .set(apiTokenParams)
            .send({
                'email':'cqggff@live.com',
                'password':password
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(!res.body.data.key) throw new Error('验证不符合预期');
                apiEmailTokenParams=Object.assign({},apiTokenParams,{
                    'x-req-key':res.body.data.key
                });
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user/me', function (done) {
            app.get('/api/v1/user/me')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                userId=res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user/me', function (done) {
            app.get('/api/v1/user/me')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                userAdminId=res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user/me', function (done) {
            app.get('/api/v1/user/me')
            .set(apiEmailTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                userEmailId=res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        //Start
        it('GET /timeline/', function (done) {
            app.get(path)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length===0) throw new Error('与预期结果不符');
                if(res.body.data.content[0].sub_user!==userId) throw new Error('与预期结果不符');
                if(res.body.data.content[0].desc!=='测试描述4') throw new Error('与预期结果不符');
                if(res.body.data.content[0].name!=='测试动画') throw new Error('与预期结果不符');
                if(res.body.data.content[0].nickname!=='测试昵称2') throw new Error('与预期结果不符');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /timeline/friend', function (done) {
            app.get(path+'friend')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length===0) throw new Error('与预期结果不符');
                if(res.body.data.content[0].sub_user!==userId) throw new Error('与预期结果不符');
                if(res.body.data.content[0].desc!=='测试描述4') throw new Error('与预期结果不符');
                if(res.body.data.content[0].name!=='测试动画') throw new Error('与预期结果不符');
                if(res.body.data.content[0].nickname!=='测试昵称2') throw new Error('与预期结果不符');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /timeline/friend with empty sub friend', function (done) {
            app.get(path+'friend')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==0) throw new Error('与预期结果不符');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /timeline/friend with none following user', function (done) {
            app.get(path+'friend')
            .set(apiEmailTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==0) throw new Error('与预期结果不符');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /timeline/:id', function (done) {
            app.get(path+userId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length===0) throw new Error('与预期结果不符');
                if(res.body.data.content[0].sub_user!==userId) throw new Error('与预期结果不符');
                if(res.body.data.content[0].desc!=='测试描述4') throw new Error('与预期结果不符');
                if(res.body.data.content[0].name!=='测试动画') throw new Error('与预期结果不符');
                if(res.body.data.content[0].nickname!=='测试昵称2') throw new Error('与预期结果不符');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /timeline/:id', function (done) {
            app.get(path+userAdminId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==0) throw new Error('与预期结果不符');
            })
            .end(function(err,res){
                done(err);
            });
        })
        //Error test
        it('GET /timeline/:id with wrong userID', function (done) {
            app.get(path+'test')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error(res.body.msg);
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
    })
}