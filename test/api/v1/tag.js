'use strict';
const STATUS_CODE = require('../../../enums/status_code');
const apiTool = require('../tool');
module.exports=function(app){
    let path = '/api/v1/tag/';
    let apiTokenParams;
    let apiLoginTokenParams;
    let password = apiTool.getPassword('testpassword');
    let apiToken;
    let validTags=[];
    describe('/tag/', function(){
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
        //Start
        it('POST /tag/', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                type:1,
                name:'测试标签',
                alias:'测试标签别名'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /tag/ again', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                type:2,
                name:'测试标签2'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /tag/ again', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                type:1,
                name:'标签名称',
                alias:'测试标签别名3'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /tag/', function (done) {
            app.get(path+'?keyword='+encodeURIComponent('测试')+'&type=2')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].name!=='测试标签2') throw new Error('验证不符合预期');
                res.body.data.content.forEach(function(item){
                    validTags.push(item._id);
                })
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /tag/ with more results', function (done) {
            app.get(path+'?keyword='+encodeURIComponent('标签')+'&type=1')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==2) throw new Error('验证不符合预期');
                if(res.body.data.content[0].name!=='测试标签') throw new Error('验证不符合预期');
                if(res.body.data.content[1].name!=='标签名称') throw new Error('验证不符合预期');
                res.body.data.content.forEach(function(item){
                    validTags.push(item._id);
                })
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /tag/ without type', function (done) {
            app.get(path+'?ids='+validTags.toString())
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==3) throw new Error('验证不符合预期');
                if(res.body.data.content[0].name!=='测试标签') throw new Error('验证不符合预期');
                if(res.body.data.content[1].name!=='测试标签2') throw new Error('验证不符合预期');
                if(res.body.data.content[2].name!=='标签名称') throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /tag/ with type', function (done) {
            app.get(path+'?ids='+validTags.toString()+'&type=1')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==2) throw new Error('验证不符合预期');
                if(res.body.data.content[0].name!=='测试标签') throw new Error('验证不符合预期');
                if(res.body.data.content[1].name!=='标签名称') throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        //Error test
        it('GET /tag/ without keyword or ids', function (done) {
            app.get(path+'?type=1')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /tag/ with wrong tag', function (done) {
            app.get(path+'?keyword=test&type=1')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==0) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /tag/ with same name again', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                type:1,
                name:'测试标签',
                alias:'测试标签别名'
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
        it('POST /tag/ with wrong type', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试标签',
                alias:'测试标签别名'
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
        it('POST /tag/ with empty name', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                type:1,
                alias:'测试标签别名'
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
        it('POST /tag/ with wrong name', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                type:1,
                name:'测试|-标签',
                alias:'测试标签别名'
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
        it('GET /tag/ with empty type', function (done) {
            app.get(path+'?keyword=test')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /tag/ with wrong ids', function (done) {
            app.get(path+'?ids=test')
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
        it('GET /tag/ with inexistence ids', function (done) {
            app.get(path+'?ids=58297d95e7aaf218604a8d0f')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error('验证不符合预期');
                if(res.body.data.content.length!==0) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
    })
}