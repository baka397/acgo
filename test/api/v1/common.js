'use strict';
const STATUS_CODE = require('../../../enums/status_code');
const apiTool = require('../tool');
module.exports=function(app){
    let path = '/api/v1/common/';
    let apiTokenParams;
    describe('/common/', function(){
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
        //Start
        it('Get /common/', function (done) {
            app.get(path)
            .set(apiTokenParams)
            .expect(404)
            .expect(apiTool.apiTokenError)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.NOT_FOUND) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            })
        })
        //Error test
        it('Get /common/ with empty', function (done) {
            app.get(path+'appid/')
            .expect(403)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.FORBIDDEN) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            })
        })
        it('Get /common/ with wrong appid', function (done) {
            app.get(path)
            .set(apiTool.getTokenParams('58297d95e7aaf218604a8d0f','test'))
            .expect(403)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.FORBIDDEN) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            })
        })
    })
}