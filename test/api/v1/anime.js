'use strict';
const STATUS_CODE = require('../../../enums/status_code');
const apiTool = require('../tool');
module.exports=function(app){
    let path = '/api/v1/anime/';
    let apiTokenParams;
    let apiLoginTokenParams;
    let password = apiTool.getPassword('testpassword');
    let apiToken;
    let tags=[[],[],[]];
    let animeId;
    let animeEditId;
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
        it('POST /tag/', function (done) {
            app.post('/api/v1/tag')
            .set(apiLoginTokenParams)
            .send({
                type:1,
                name:'测试动画标签'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET tag', function (done) {
            app.get('/api/v1/tag?keyword='+encodeURIComponent('测试')+'&type=1')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                res.body.data.content.forEach(function(item){
                    tags[0].push(item._id);
                })
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST staff tag', function (done) {
            app.post('/api/v1/tag')
            .set(apiLoginTokenParams)
            .send({
                type:2,
                name:'测试动画工作人员'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET staff tag', function (done) {
            app.get('/api/v1/tag?keyword='+encodeURIComponent('测试')+'&type=2')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                res.body.data.content.forEach(function(item){
                    tags[1].push(item._id);
                })
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST cv tag', function (done) {
            app.post('/api/v1/tag')
            .set(apiLoginTokenParams)
            .send({
                type:3,
                name:'测试动画声优'
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET cv tag', function (done) {
            app.get('/api/v1/tag?keyword='+encodeURIComponent('测试')+'&type=3')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                res.body.data.content.forEach(function(item){
                    tags[2].push(item._id);
                })
            })
            .end(function(err,res){
                done(err);
            });
        })
        //Start
        it('POST /anime/', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                showStatus:1,
                desc:'测试描述',
                tag:tags[0].toString(),
                staff:tags[1].toString(),
                cv:tags[2].toString()
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/', function (done) {
            app.get(path+'?keyword='+encodeURIComponent('测试'))
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                let curClip=[1,2,3,4];
                let validResult=res.body.data.content[0].cover_clip.every(function(clip,index){
                    return clip===curClip[index];
                })
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].name!=='测试动画') throw new Error('验证不符合预期');
                if(res.body.data.content[0].cover!=='测试动画封面') throw new Error('验证不符合预期');
                if(!validResult) throw new Error('验证不符合预期');
                if(res.body.data.content[0].show_status!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].public_status!==0) throw new Error('验证不符合预期');
                animeId=res.body.data.content[0]._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/:id', function (done) {
            app.get(path+animeId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                let curClip=[1,2,3,4];
                let validResult=res.body.data.cover_clip.every(function(clip,index){
                    return clip===curClip[index];
                })
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.name!=='测试动画') throw new Error('验证不符合预期');
                if(res.body.data.alias!=='测试动画别名') throw new Error('验证不符合预期');
                if(res.body.data.cover!=='测试动画封面') throw new Error('验证不符合预期');
                if(!validResult) throw new Error('验证不符合预期');
                if(res.body.data.show_status!==1) throw new Error('验证不符合预期');
                if(res.body.data.public_status!==0) throw new Error('验证不符合预期');
                if(res.body.data.desc!=='测试描述') throw new Error('验证不符合预期');
                if(res.body.data.tag.length!==tags[0].length) throw new Error('验证不符合预期');
                if(res.body.data.staff.length!==tags[1].length) throw new Error('验证不符合预期');
                if(res.body.data.cv.length!==tags[2].length) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/audit/', function (done) {
            app.get(path+'audit/?animeId='+animeId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                animeEditId=res.body.data.content[0]._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/audit/ with auditStatus', function (done) {
            app.get(path+'audit/?animeId='+animeId+'&auditStatus=0')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0]._id!==animeEditId) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/audit/:id', function (done) {
            app.get(path+'audit/'+animeEditId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                let curClip=[1,2,3,4];
                let validResult=res.body.data.cover_clip.every(function(clip,index){
                    return clip===curClip[index];
                })
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.alias!=='测试动画别名') throw new Error('验证不符合预期');
                if(res.body.data.cover!=='测试动画封面') throw new Error('验证不符合预期');
                if(!validResult) throw new Error('验证不符合预期');
                if(res.body.data.show_status!==1) throw new Error('验证不符合预期');
                if(res.body.data.desc!=='测试描述') throw new Error('验证不符合预期');
                if(res.body.data.tag.length!==tags[0].length) throw new Error('验证不符合预期');
                if(res.body.data.staff.length!==tags[1].length) throw new Error('验证不符合预期');
                if(res.body.data.cv.length!==tags[2].length) throw new Error('验证不符合预期');
                if(res.body.data.anime_id!==animeId) throw new Error('验证不符合预期');
                if(!res.body.data.edit_user) throw new Error('验证不符合预期');
                if(res.body.data.audit_user) throw new Error('验证不符合预期');
                if(res.body.data.audit_status!==0) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime/audit/:id with rejected status', function (done) {
            app.put(path+'audit/'+animeEditId)
            .send({
                status:-1
            })
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/:id again', function (done) {
            app.get(path+animeId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                let curClip=[1,2,3,4];
                let validResult=res.body.data.cover_clip.every(function(clip,index){
                    return clip===curClip[index];
                })
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.name!=='测试动画') throw new Error('验证不符合预期');
                if(res.body.data.alias!=='测试动画别名') throw new Error('验证不符合预期');
                if(res.body.data.cover!=='测试动画封面') throw new Error('验证不符合预期');
                if(!validResult) throw new Error('验证不符合预期');
                if(res.body.data.show_status!==1) throw new Error('验证不符合预期');
                if(res.body.data.public_status!==0) throw new Error('验证不符合预期');
                if(res.body.data.desc!=='测试描述') throw new Error('验证不符合预期');
                if(res.body.data.tag.length!==tags[0].length) throw new Error('验证不符合预期');
                if(res.body.data.staff.length!==tags[1].length) throw new Error('验证不符合预期');
                if(res.body.data.cv.length!==tags[2].length) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime/', function (done) {
            app.put(path+animeId)
            .set(apiLoginTokenParams)
            .send({
                alias:'测试动画别名3',
                cover:'测试动画封面3',
                coverClip:'1,2,3,5',
                desc:'测试描述4',
                showStatus:1,
                tag:tags[0].toString(),
                staff:tags[1].toString(),
                cv:tags[2].toString()
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/audit/ again', function (done) {
            app.get(path+'audit/?animeId='+animeId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==2) throw new Error('验证不符合预期');
                animeEditId=res.body.data.content[1]._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime/', function (done) {
            app.put(path+animeId)
            .set(apiLoginTokenParams)
            .send({
                alias:'测试动画别名3',
                cover:'测试动画封面3',
                coverClip:'1,2,3,5',
                desc:'测试描述4',
                showStatus:1
            })
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/audit/:id again', function (done) {
            app.get(path+'audit/'+animeEditId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                let curClip=[1,2,3,5];
                let validResult=res.body.data.cover_clip.every(function(clip,index){
                    return clip===curClip[index];
                })
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.alias!=='测试动画别名3') throw new Error('验证不符合预期');
                if(res.body.data.cover!=='测试动画封面3') throw new Error('验证不符合预期');
                if(!validResult) throw new Error('验证不符合预期');
                if(res.body.data.desc!=='测试描述4') throw new Error('验证不符合预期');
                if(res.body.data.anime_id!==animeId) throw new Error('验证不符合预期');
                if(!res.body.data.edit_user) throw new Error('验证不符合预期');
                if(res.body.data.audit_user) throw new Error('验证不符合预期');
                if(res.body.data.audit_status!==0) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime/audit/:id', function (done) {
            app.put(path+'audit/'+animeEditId)
            .send({
                status:1
            })
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/audit/ with approved status', function (done) {
            app.get(path+'audit/?animeId='+animeId+'&auditStatus=1')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].audit_status!==1) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/:id', function (done) {
            app.get(path+animeId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                let curClip=[1,2,3,5];
                let validResult=res.body.data.cover_clip.every(function(clip,index){
                    return clip===curClip[index];
                })
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.name!=='测试动画') throw new Error('验证不符合预期');
                if(res.body.data.alias!=='测试动画别名3') throw new Error('验证不符合预期');
                if(res.body.data.cover!=='测试动画封面3') throw new Error('验证不符合预期');
                if(!validResult) throw new Error('验证不符合预期');
                if(res.body.data.show_status!==1) throw new Error('验证不符合预期');
                if(res.body.data.public_status!==1) throw new Error('验证不符合预期');
                if(res.body.data.desc!=='测试描述4') throw new Error('验证不符合预期');
                if(res.body.data.tag.length!==tags[0].length) throw new Error('验证不符合预期');
                if(res.body.data.staff.length!==tags[1].length) throw new Error('验证不符合预期');
                if(res.body.data.cv.length!==tags[2].length) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime/sub/:id', function (done) {
            app.put(path+'sub/'+animeId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/sub/me', function (done) {
            app.get(path+'sub/me')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].name!=='测试动画') throw new Error('验证不符合预期');
                if(res.body.data.content[0].cover!=='测试动画封面3') throw new Error('验证不符合预期');
                let curClip=[1,2,3,5];
                let validResult=res.body.data.content[0].cover_clip.every(function(clip,index){
                    return clip===curClip[index];
                })
                if(!validResult) throw new Error('验证不符合预期');
                if(res.body.data.content[0].show_status!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].public_status!==1) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime/sub/:id again', function (done) {
            app.put(path+'sub/'+animeId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/sub/me again', function (done) {
            app.get(path+'sub/me')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].name!=='测试动画') throw new Error('验证不符合预期');
                if(res.body.data.content[0].cover!=='测试动画封面3') throw new Error('验证不符合预期');
                let curClip=[1,2,3,5];
                let validResult=res.body.data.content[0].cover_clip.every(function(clip,index){
                    return clip===curClip[index];
                })
                if(!validResult) throw new Error('验证不符合预期');
                if(res.body.data.content[0].show_status!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].public_status!==1) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('DELETE /anime/sub/:id', function (done) {
            app.delete(path+'sub/'+animeId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime/sub/me again', function (done) {
            app.get(path+'sub/me')
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
        //Error test
        it('POST /anime/ with empty cover', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                coverClip:'1,2,3,4',
                showStatus:1,
                desc:'测试描述',
                tag:tags[0].toString(),
                staff:tags[1].toString(),
                cv:tags[2].toString()
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
        it('POST /anime/ with empty coverClip', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                showStatus:1,
                desc:'测试描述',
                tag:tags[0].toString(),
                staff:tags[1].toString(),
                cv:tags[2].toString()
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
        it('POST /anime/ with wrong coverClip', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'test,2,3,4',
                showStatus:1,
                desc:'测试描述',
                tag:tags[0].toString(),
                staff:tags[1].toString(),
                cv:tags[2].toString()
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
        it('POST /anime/ with empty tag', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                showStatus:1,
                desc:'测试描述',
                staff:tags[1].toString(),
                cv:tags[2].toString()
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
        it('POST /anime/ with long tag', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                showStatus:1,
                desc:'测试描述',
                tag:[].concat(tags[0],tags[0],tags[0]).toString(),
                staff:tags[1].toString(),
                cv:tags[2].toString()
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
        it('POST /anime/ with empty staff', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                showStatus:1,
                desc:'测试描述',
                tag:tags[0].toString(),
                cv:tags[2].toString()
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
        it('POST /anime/ with long staff', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                showStatus:1,
                desc:'测试描述',
                tag:tags[0].toString(),
                staff:[].concat(tags[0],tags[0],tags[0]).toString(),
                cv:tags[2].toString()
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
        it('POST /anime/ with empty cv', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                showStatus:1,
                desc:'测试描述',
                tag:tags[0].toString(),
                staff:tags[1].toString()
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
        it('POST /anime/ with empty cv', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                showStatus:1,
                desc:'测试描述',
                tag:tags[0].toString(),
                staff:tags[1].toString(),
                cv:[].concat(tags[0],tags[0],tags[0]).toString()
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
        it('POST /anime/ with wrong tag', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                showStatus:1,
                desc:'测试描述',
                tag:tags[0].toString(),
                staff:tags[1].toString(),
                cv:'test'
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
        it('POST /anime/ with empty showStatus', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                desc:'测试描述',
                tag:tags[0].toString(),
                staff:tags[1].toString(),
                cv:tags[2].toString()
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
        it('POST /anime/ with wrong showStatus', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                showStatus:3,
                desc:'测试描述',
                tag:tags[0].toString(),
                staff:tags[1].toString(),
                cv:tags[2].toString()
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
        it('POST /anime/ with wrong tag id', function (done) {
            app.post(path)
            .set(apiLoginTokenParams)
            .send({
                name:'测试动画',
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                showStatus:1,
                desc:'测试描述',
                tag:tags[1].toString(),
                staff:tags[1].toString(),
                cv:tags[2].toString()
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
        it('GET /anime/ with empty keyword', function (done) {
            app.get(path)
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
        it('GET /anime/ with wrong keyword', function (done) {
            app.get(path+'?keyword=name')
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
        it('GET /anime/audit/ with empty animeId', function (done) {
            app.get(path+'audit/')
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
        it('GET /anime/audit/ with wrong animeId', function (done) {
            app.get(path+'audit/?animeId=132')
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
        it('GET /anime/audit/ with wrong auditStatus', function (done) {
            app.get(path+'audit/?animeId='+animeId+'&auditStatus=4')
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
        it('GET /anime/:id with wrong ID', function (done) {
            app.get(path+'test')
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
        it('GET /anime/:id with inexistence ID', function (done) {
            app.get(path+'58297d95e7aaf218604a8d0f')
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
        it('GET /anime/audit/:id with wrong ID', function (done) {
            app.get(path+'audit/test')
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
        it('GET /anime/audit/:id with inexistence ID', function (done) {
            app.get(path+'audit/58297d95e7aaf218604a8d0f')
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
        it('PUT /anime/ with wrong animeId', function (done) {
            app.put(path+'123')
            .set(apiLoginTokenParams)
            .send({
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                showStatus:1,
                desc:'测试描述',
                tag:tags[0].toString(),
                staff:tags[1].toString(),
                cv:tags[2].toString()
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
        it('PUT /anime/ with inexistence animeId', function (done) {
            app.put(path+'58297d95e7aaf218604a8d0f')
            .set(apiLoginTokenParams)
            .send({
                alias:'测试动画别名',
                cover:'测试动画封面',
                coverClip:'1,2,3,4',
                showStatus:1,
                desc:'测试描述',
                tag:tags[0].toString(),
                staff:tags[1].toString(),
                cv:tags[2].toString()
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
        it('PUT /anime/audit/:id with wrong id', function (done) {
            app.put(path+'audit/'+'test')
            .send({
                status:1
            })
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
        it('PUT /anime/audit/:id with inexistence id', function (done) {
            app.put(path+'audit/'+'58297d95e7aaf218604a8d0f')
            .send({
                status:1
            })
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
        it('PUT /anime/audit/:id with empty status', function (done) {
            app.put(path+'audit/'+animeEditId)
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
        it('PUT /anime/audit/:id with wrong status', function (done) {
            app.put(path+'audit/'+animeEditId)
            .send({
                status:3
            })
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
        it('PUT /anime/sub/:id with wrong id', function (done) {
            app.put(path+'sub/test')
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
        it('PUT /anime/sub/:id with inexistence id', function (done) {
            app.put(path+'sub/58297d95e7aaf218604a8d0f')
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
        it('DELETE /anime/sub/:id with wrong id', function (done) {
            app.delete(path+'sub/test')
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
        it('DELETE /anime/sub/:id with inexistence id', function (done) {
            app.delete(path+'sub/58297d95e7aaf218604a8d0f')
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
    })
}