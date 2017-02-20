'use strict';
const STATUS_CODE = require('../../../enums/status_code');
const apiTool = require('../tool');
const redisClient = require('../../../common/redis');
const config = require('../../../config/');
module.exports=function(app){
    let path = '/api/v1/analytics/';
    let apiTokenParams;
    let apiLoginTokenParams;
    let apiAdminTokenParams;
    let userId;
    let adminUserId;
    let password = apiTool.getPassword('testpassword');
    describe('/analytics/', function(){
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
                adminUserId=res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        //Start
        it('GET /analytics/dimension/:id', function (done) {
            app.get(path+'dimension/'+userId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                console.log(res.body);
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(Object.keys(res.body.data).length!==config.dimensionWeight.length) throw new Error('验证不符合预期');
                if(Object.keys(res.body.data).every(function(key){
                    return res.body.data[key].length===0
                })) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /analytics/dimension/:id with admin ID', function (done) {
            app.get(path+'dimension/'+adminUserId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                console.log(res.body);
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(Object.keys(res.body.data).length!==config.dimensionWeight.length) throw new Error('验证不符合预期');
                if(Object.keys(res.body.data).every(function(key){
                    return res.body.data[key].length>0
                })) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        //Error test
        it('GET /analytics/dimension/:id with wrong ID', function (done) {
            app.get(path+'dimension/test')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.REDIS_ERROR) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
    })
}