'use strict';
const STATUS_CODE = require('../../../enums/status_code');
const apiTool = require('../tool');
module.exports=function(app){
    let path = '/api/v1/upload/';
    let apiTokenParams;
    let apiLoginTokenParams;
    let password = apiTool.getPassword('testpassword');
    describe('/anime/', function(){
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
        it('GET /token', function (done) {
            app.get(path+'token')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(!res.body.data.token) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
    })
}