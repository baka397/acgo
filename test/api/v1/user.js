'use strict';
const STATUS_CODE = require('../../../enums/status_code');
const apiTool = require('../tool');
module.exports=function(app){
    let path = '/api/v1/user/';
    let apiTokenParams;
    let addCodeId;
    let addCodeIdError;
    let password = apiTool.getPassword('testpassword');
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
    })
}