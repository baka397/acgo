'use strict';
const STATUS_CODE = require('../../enums/status_code');
module.exports=function(app){
    let addAppId;
    describe('/app/', function(){
        it('POST /app/', function (done) {
            app.post('/app/')
            .send({
                "projectName":"测试应用",
                "projectAlias":"test",
                "userName":"张竞",
                "userEmail":"jing.zhang02@msxf.com"
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        //Post error test
        it('POST /app/ with exist projectName', function (done) {
            app.post('/app/')
            .send({
                "projectName":"测试应用",
                "projectAlias":"test",
                "userName":"张竞",
                "userEmail":"jing.zhang02@msxf.com"
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==111) throw new Error('测试应用名判断不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /app/ with exist projectAlias', function (done) {
            app.post('/app/')
            .send({
                "projectName":"测试应用2",
                "projectAlias":"test",
                "userName":"张竞",
                "userEmail":"jing.zhang02@msxf.com"
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==111) throw new Error('测试应用别名判断不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /app/ with empty projectName', function (done) {
            app.post('/app/')
            .send({
                "projectName":"",
                "projectAlias":"test2",
                "userName":"张竞",
                "userEmail":"jing.zhang02@msxf.com"
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==111) throw new Error('空值验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /app/ with empty projectAlias', function (done) {
            app.post('/app/')
            .send({
                "projectName":"测试应用2",
                "projectAlias":"",
                "userName":"张竞",
                "userEmail":"jing.zhang02@msxf.com"
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==111) throw new Error('空值验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /app/ with empty userName', function (done) {
            app.post('/app/')
            .send({
                "projectName":"测试应用2",
                "projectAlias":"test2",
                "userName":"",
                "userEmail":"jing.zhang02@msxf.com"
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==111) throw new Error('空值验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /app/ with empty userEmail', function (done) {
            app.post('/app/')
            .send({
                "projectName":"测试应用2",
                "projectAlias":"test2",
                "userName":"张竞",
                "userEmail":""
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==111) throw new Error('空值验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /app/ with wrong userEmail', function (done) {
            app.post('/app/')
            .send({
                "projectName":"测试应用2",
                "projectAlias":"test2",
                "userName":"张竞",
                "userEmail":"test"
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==111) throw new Error('邮箱验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /app/', function (done) {
            app.get('/app/')
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('数据列表查询错误');
                if(res.body.data.total!==1) throw new Error('数据列表查询错误');
                if(res.body.data.content[0].user_email!=='jing.zhang02@msxf.com') throw new Error('管理员邮箱错误');
                if(res.body.data.content[0].user_name!=='张竞') throw new Error('管理员姓名错误');
                if(res.body.data.content[0].project_alias!=='test') throw new Error('应用别名错误');
                if(res.body.data.content[0].project_name!=='测试应用') throw new Error('应用名称错误');
                addAppId = res.body.data.content[0]._id;
            })
            .end(function(err,res){
                done(err);
            })
        })
        it('PUT /app/', function (done) {
            app.put('/app/'+addAppId)
            .send({
                "projectName":"测试应用2",
                "projectAlias":"test2",
                "userName":"张竞",
                "userEmail":"jing.zhang02@msxf.com"
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.user_email!=='jing.zhang02@msxf.com') throw new Error('管理员邮箱错误');
                if(res.body.data.user_name!=='张竞') throw new Error('管理员姓名错误');
                if(res.body.data.project_alias!=='test2') throw new Error('应用别名错误');
                if(res.body.data.project_name!=='测试应用2') throw new Error('应用名称错误');
            })
            .end(function(err,res){
                done(err);
            });
        })
        //PUT Wrong
        it('PUT /app/ with wrong ID', function (done) {
            app.put('/app/58297d95e7aaf218604a8d0f')
            .send({
                "projectName":"测试应用2",
                "projectAlias":"test2",
                "userName":"张竞3",
                "userEmail":"jing.zhang03@msxf.com"
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /app/ with old data', function (done) {
            app.post('/app/')
            .send({
                "projectName":"测试应用",
                "projectAlias":"test",
                "userName":"张竞",
                "userEmail":"jing.zhang02@msxf.com"
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /app/ again', function (done) {
            app.get('/app/')
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==2) throw new Error('数据列表查询错误');
                if(res.body.data.total!==2) throw new Error('数据列表查询错误');
                if(res.body.data.content[1].user_email!=='jing.zhang02@msxf.com') throw new Error('管理员邮箱错误');
                if(res.body.data.content[1].user_name!=='张竞') throw new Error('管理员姓名错误');
                if(res.body.data.content[1].project_alias!=='test') throw new Error('应用别名错误');
                if(res.body.data.content[1].project_name!=='测试应用') throw new Error('应用名称错误');
                addAppId = res.body.data.content[1]._id;
            })
            .end(function(err,res){
                done(err);
            })
        })
        it('DELETE /app/ with new ID', function (done) {
            app.delete('/app/'+addAppId)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        //DELETE eroor
        it('DELETE /app/ with wrong ID', function (done) {
            app.delete('/app/58297d95e7aaf218604a8d0f')
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /app/ third time', function (done) {
            app.get('/app/')
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('数据列表查询错误');
                if(res.body.data.total!==1) throw new Error('数据列表查询错误');
                if(res.body.data.content[0].user_email!=='jing.zhang02@msxf.com') throw new Error('管理员邮箱错误');
                if(res.body.data.content[0].user_name!=='张竞') throw new Error('管理员姓名错误');
                if(res.body.data.content[0].project_alias!=='test2') throw new Error('应用别名错误');
                if(res.body.data.content[0].project_name!=='测试应用2') throw new Error('应用名称错误');
                addAppId = res.body.data.content[0]._id;
            })
            .end(function(err,res){
                done(err);
            })
        })
    })
}