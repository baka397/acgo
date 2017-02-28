'use strict';
const STATUS_CODE = require('../../../enums/status_code');
const apiTool = require('../tool');
const redisClient = require('../../../common/redis');
const config = require('../../../config/');
module.exports=function(app){
    let path = '/api/v1/user-follow/';
    let apiTokenParams;
    let apiLoginTokenParams;
    let apiAdminTokenParams;
    let password = apiTool.getPassword('testpassword');
    let userId;
    let userAdminId;
    let followId;
    let adminFollowId;
    describe('/user-follow/', function(){
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
        //Start
        it('GET /user-follow/follow/:userId', function (done) {
            app.get(path+'follow/'+userId)
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
        it('GET /user-follow/fans/:userId', function (done) {
            app.get(path+'fans/'+userId)
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
        it('POST /user-follow/', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                followUser:userAdminId
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('Confirm with GET /user-follow/follow/:userId', function (done) {
            app.get(path+'follow/'+userId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('与预期结果不符');
                if(res.body.data.content[0].status!==1) throw new Error('与预期结果不符');
                if(res.body.data.content[0].follow_user!==userAdminId) throw new Error('与预期结果不符');
                followId=res.body.data.content[0]._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('Confirm with GET /user-follow/fans/:userId', function (done) {
            app.get(path+'fans/'+userId)
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
        it('POST /user-follow/ with other account', function (done) {
            app.post(path)
            .set(apiAdminTokenParams)
            .send({
                followUser:userId
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('Confirm with GET /user-follow/follow/:userId', function (done) {
            app.get(path+'follow/'+userId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('与预期结果不符');
                if(res.body.data.content[0].status!==2) throw new Error('与预期结果不符');
                if(res.body.data.content[0].follow_user!==userAdminId) throw new Error('与预期结果不符');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('Confirm with GET /user-follow/fans/:userId', function (done) {
            app.get(path+'fans/'+userId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('与预期结果不符');
                if(res.body.data.content[0].status!==2) throw new Error('与预期结果不符');
                if(res.body.data.content[0].create_user!==userAdminId) throw new Error('与预期结果不符');
                adminFollowId=res.body.data.content[0]._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('DELETE /user-follow/:id', function (done) {
            app.delete(path+followId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('Confirm with GET /user-follow/follow/:userId', function (done) {
            app.get(path+'follow/'+userId)
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
        it('Confirm with GET /user-follow/fans/:userId', function (done) {
            app.get(path+'fans/'+userId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('与预期结果不符');
                if(res.body.data.content[0].status!==1) throw new Error('与预期结果不符');
                if(res.body.data.content[0].create_user!==userAdminId) throw new Error('与预期结果不符');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('DELETE /user-follow/:id', function (done) {
            app.delete(path+adminFollowId)
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('DELETE /user-follow/:id with already unfollowed', function (done) {
            app.delete(path+adminFollowId)
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('Confirm with GET /user-follow/follow/:userId', function (done) {
            app.get(path+'follow/'+userId)
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
        it('Confirm with GET /user-follow/fans/:userId', function (done) {
            app.get(path+'fans/'+userId)
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
        it('re POST /user-follow/', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                followUser:userAdminId
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user-follow/relation/:userId', function (done) {
            app.get(path+'relation/'+userAdminId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.length!==2) throw new Error('与预期结果不符');
            })
            .end(function(err,res){
                done(err);
            });
        })
        //Error test
        it('POST /user-follow/ with followed user', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                followUser:userAdminId
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user-follow/ with wrong user', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                followUser:'test'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user-follow/ with self', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                followUser:userId
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user-follow/ with inexistence user', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                followUser:'58297d95e7aaf218604a8d0f'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('DELETE /user-follow/:id with another user', function (done) {
            app.delete(path+adminFollowId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('DELETE /user-follow/:id with wrong id', function (done) {
            app.delete(path+'test')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('DELETE /user-follow/:id with inexistence id', function (done) {
            app.delete(path+'58297d95e7aaf218604a8d0f')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user-follow/follow/:userId with wrong id', function (done) {
            app.get(path+'follow/test')
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
        it('GET /user-follow/fans/:userId with wrong id', function (done) {
            app.get(path+'fans/test')
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
        it('GET /user-follow/relation/:userId with wrong userId', function (done) {
            app.get(path+'relation/test')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user-follow/relation/:userId with self', function (done) {
            app.get(path+'relation/'+userId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user-follow/relation/:userId with inexistence userId', function (done) {
            app.get(path+'relation/58297d95e7aaf218604a8d0f')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.length!==0) throw new Error(new Error('与预期结果不符'));
            })
            .end(function(err,res){
                done(err);
            });
        })
    })
}