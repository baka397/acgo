'use strict';
const STATUS_CODE = require('../../enums/status_code');
module.exports=function(app){
    let addCodeId;
    describe('/code/', function(){
        it('POST /code/', function (done) {
            app.post('/code/')
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                addCodeId = res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /code/', function (done) {
            app.get('/code/')
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('数据列表查询错误');
                if(res.body.data.total!==1) throw new Error('数据列表查询错误');
                if(res.body.data.content[0].status!==0) throw new Error('邀请码状态错误');
                if(res.body.data.content[0].use_user) throw new Error('邀请码使用用户错误');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /code/', function (done) {
            app.put('/code/'+addCodeId)
            .send({
                'status':1,
                'useUser':addCodeId
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /code/ for ban code', function (done) {
            app.put('/code/'+addCodeId)
            .send({
                'status':-1
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /code/ with wrong status', function (done) {
            app.put('/code/'+addCodeId)
            .send({
                'status':3
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /code/ with wrong useUser', function (done) {
            app.put('/code/'+addCodeId)
            .send({
                'status':1
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /code/ with wrong ID', function (done) {
            app.put('/code/58297d95e7aaf218604a8d0f')
            .send({
                'status':-1
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
    })
}