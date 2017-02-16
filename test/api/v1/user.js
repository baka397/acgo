'use strict';
const STATUS_CODE = require('../../../enums/status_code');
const apiTool = require('../tool');
const redisClient = require('../../../common/redis');
const config = require('../../../config/');
module.exports=function(app){
    let path = '/api/v1/user/';
    let apiTokenParams;
    let apiLoginTokenParams;
    let apiLogoutTokenParams;
    let apiEmailLoginTokenParams;
    let addCodeId;
    let addCodeIdAdmin;
    let addCodeIdError;
    let addCodeIdEmail;
    let password = apiTool.getPassword('testpassword');
    let newPassword = apiTool.getPassword('testpassword2');
    let apiToken;
    let resetToken;
    let userId;
    describe('/user/', function(){
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
        it('Add a code for register', function (done) {
            app.post('/code/')
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                addCodeId=res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('Add a code for register email test', function (done) {
            app.post('/code/')
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                addCodeIdEmail=res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('Add a code for test admin', function (done) {
            app.post('/code/')
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                addCodeIdAdmin=res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('Add a code for test error', function (done) {
            app.post('/code/')
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                addCodeIdError=res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        //Start
        it('POST /user/', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'test@test.com',
                'nickname':'测试昵称',
                'password':password,
                'code':addCodeId
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'cqggff@live.com',
                'nickname':'测试邮箱注册',
                'password':password,
                'code':addCodeIdEmail
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/login', function (done) {
            app.post(path+'login')
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
            app.post(path+'login')
            .set(apiTokenParams)
            .send({
                'email':'cqggff@live.com',
                'password':password
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(!res.body.data.key) throw new Error('验证不符合预期');
                apiEmailLoginTokenParams=Object.assign({},apiTokenParams,{
                    'x-req-key':res.body.data.key
                });

            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user/me', function (done) {
            app.get(path+'me')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.email!=='test@test.com') throw new Error('验证不符合预期');
                if(res.body.data.role!=='user') throw new Error('验证不符合预期');
                if(res.body.data.nickname!=='测试昵称') throw new Error('验证不符合预期');
                userId=res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /user/me', function (done) {
            app.put(path+'me')
            .set(apiLoginTokenParams)
            .send({
                nickname:'测试昵称2',
                avatar:'5885b320a1763a717629bac3-1485222972574.jpg',
                avatarClip:'1,2,3,5',
                desc:'测试用户介绍'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user/', function (done) {
            app.get(path+'?ids='+userId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                let curClip=[1,2,3,5];
                let validResult=res.body.data.content[0].avatar_clip.every(function(clip,index){
                    return clip===curClip[index];
                })
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].nickname!=='测试昵称2') throw new Error('验证不符合预期');
                if(res.body.data.content[0].avatar!=='5885b320a1763a717629bac3-1485222972574.jpg') throw new Error('验证不符合预期');
                if(!validResult) throw new Error('验证不符合预期');
                if(res.body.data.content[0].desc!=='测试用户介绍') throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /user/me to change password', function (done) {
            app.put(path+'me')
            .set(apiEmailLoginTokenParams)
            .send({
                'oldPassword':password,
                'password':newPassword
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user/ with old token', function (done) {
            app.get(path+'?ids='+userId)
            .set(apiEmailLoginTokenParams)
            .expect(403)
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/login', function (done) {
            app.post(path+'login')
            .set(apiTokenParams)
            .send({
                'email':'cqggff@live.com',
                'password':newPassword
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(!res.body.data.key) throw new Error('验证不符合预期');
                apiEmailLoginTokenParams=Object.assign({},apiTokenParams,{
                    'x-req-key':res.body.data.key
                });
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/send', function (done) {
            app.post(path+'send')
            .set(apiTokenParams)
            .send({
                'email':'cqggff@live.com',
                'backurl':'http://bing.com'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/send again', function (done) {
            app.post(path+'send')
            .set(apiTokenParams)
            .send({
                'email':'cqggff@live.com',
                'backurl':'http://bing.com'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET resetToken', function (done) {
            redisClient.keys(config.redisNamespace+':reset:*').then(function(data){
                resetToken=data[0].replace(config.redisNamespace+':reset:','');
                done();
            });
        })
        it('POST /user/reset', function (done) {
            app.post(path+'reset')
            .set(apiTokenParams)
            .send({
                'password':password,
                'resetToken':resetToken
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user/ with old token again', function (done) {
            app.get(path+'?ids='+userId)
            .set(apiEmailLoginTokenParams)
            .expect(403)
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/login', function (done) {
            app.post(path+'login')
            .set(apiTokenParams)
            .send({
                'email':'cqggff@live.com',
                'password':password
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(!res.body.data.key) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/ with admin user', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'admin@test.com',
                'nickname':'测试用户',
                'password':password,
                'code':addCodeIdAdmin
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/login again to get token', function (done) {
            app.post(path+'login')
            .set(apiTokenParams)
            .send({
                'email':'test@test.com',
                'password':password
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(!res.body.data.key) throw new Error('验证不符合预期');
                apiLogoutTokenParams=Object.assign({},apiTokenParams,{
                    'x-req-key':res.body.data.key
                });
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('DELETE /user/me', function (done) {
            app.delete(path+'me')
            .set(apiLogoutTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        //Error test
        it('POST /user/ with empty', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/ with empty code', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'test@test.com',
                'nickname':'测试昵称',
                'password':password
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/ with wrong code', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'test@test.com',
                'nickname':'测试昵称',
                'password':password,
                'code':'123231321'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/ with empty email', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'nickname':'测试昵称',
                'password':password,
                'code':addCodeIdError
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/ with wrong email', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'test',
                'nickname':'测试昵称',
                'password':password,
                'code':addCodeIdError
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/ with empty nickname', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'test2@test.com',
                'password':password,
                'code':addCodeIdError
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/ with wrong nickname', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'test2@test.com',
                'nickname':'1',
                'password':password,
                'code':addCodeIdError
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/ with block nickname', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'test2@test.com',
                'nickname':'测试管理',
                'password':password,
                'code':addCodeIdError
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/ with empty password', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'test2@test.com',
                'nickname':'测试昵称',
                'code':addCodeIdError
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/ with code again', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'test2@test.com',
                'nickname':'测试昵称2',
                'password':password,
                'code':addCodeId
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/ with email again', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'test@test.com',
                'nickname':'测试昵称2',
                'password':password,
                'code':addCodeIdError
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/ with nickname again', function (done) {
            app.post(path)
            .set(apiTokenParams)
            .send({
                'email':'test2@test.com',
                'nickname':'测试昵称2',
                'password':password,
                'code':addCodeIdError
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/login with empty email', function (done) {
            app.post(path+'login')
            .set(apiTokenParams)
            .send({
                'password':password
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/login with wrong email', function (done) {
            app.post(path+'login')
            .set(apiTokenParams)
            .send({
                'email':'test',
                'password':password
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/login with unreal email', function (done) {
            app.post(path+'login')
            .set(apiTokenParams)
            .send({
                'email':'test3@test.com',
                'password':password
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/login with empty password', function (done) {
            app.post(path+'login')
            .set(apiTokenParams)
            .send({
                'email':'test@test.com'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/login with wrong password', function (done) {
            app.post(path+'login')
            .set(apiTokenParams)
            .send({
                'email':'test@test.com',
                'password':'123456'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user/me with empty token', function (done) {
            app.get(path+'me')
            .set(apiTokenParams)
            .expect(403)
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user/me with wrong token', function (done) {
            app.get(path+'me')
            .set(Object.assign({},apiTokenParams,{
                'x-req-key':'test'
            }))
            .expect(403)
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user/ with empty userId', function (done) {
            app.get(path)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user/ with large userIds', function (done) {
            app.get(path+'?ids=1,2,3,4,5,6')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /user/ with unvalid userId', function (done) {
            app.get(path+'?ids=1')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /user/me with wrong nickname', function (done) {
            app.put(path+'me')
            .set(apiLoginTokenParams)
            .send({
                nickname:'测试 昵称'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /user/me with avatar only', function (done) {
            app.put(path+'me')
            .set(apiLoginTokenParams)
            .send({
                avatar:'5885b320a1763a717629bac3-1485222972574.jpg'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /user/me with wrong', function (done) {
            app.put(path+'me')
            .set(apiLoginTokenParams)
            .send({
                avatar:'测试'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /user/me with wrong avatarClip', function (done) {
            app.put(path+'me')
            .set(apiLoginTokenParams)
            .send({
                avatar:'5885b320a1763a717629bac3-1485222972574.jpg',
                avatarClip:'test',
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /user/me with wrong avatarClip value', function (done) {
            app.put(path+'me')
            .set(apiLoginTokenParams)
            .send({
                avatar:'5885b320a1763a717629bac3-1485222972574.jpg',
                avatarClip:'test,2,3,4',
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /user/me with wrong password', function (done) {
            app.put(path+'me')
            .set(apiLoginTokenParams)
            .send({
                'oldPassword':'123456',
                'password':newPassword
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/send with wrong email', function (done) {
            app.post(path+'send')
            .set(apiTokenParams)
            .send({
                'email':'test',
                'backurl':'http://bing.com'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/send with wrong url', function (done) {
            app.post(path+'send')
            .set(apiTokenParams)
            .send({
                'email':'test@test2.com',
                'backurl':'test'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/send with inexistent email', function (done) {
            app.post(path+'send')
            .set(apiTokenParams)
            .send({
                'email':'test@test2.com',
                'backurl':'http://bing.com'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/reset without token', function (done) {
            app.post(path+'reset')
            .set(apiTokenParams)
            .send({
                'password':password
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/reset without password', function (done) {
            app.post(path+'reset')
            .set(apiTokenParams)
            .send({
                'resetToken':resetToken
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /user/reset with token again', function (done) {
            app.post(path+'reset')
            .set(apiTokenParams)
            .send({
                'password':password,
                'resetToken':resetToken
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
    })
}