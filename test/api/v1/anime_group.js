'use strict';
const STATUS_CODE = require('../../../enums/status_code');
const apiTool = require('../tool');
module.exports=function(app){
    let path = '/api/v1/anime-group/';
    let apiTokenParams;
    let apiLoginTokenParams;
    let apiAdminTokenParams;
    let password = apiTool.getPassword('testpassword');
    let userId;
    let animeId;
    let animeGroupId;
    let animeGroupTaskId;
    let animeGroupCacheId;
    let animeGroupItemId;
    let animeGroupItemWatchIds=[];
    describe('/anime-group/', function(){
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
        it('GET /anime/', function (done) {
            app.get('/api/v1/anime/?keyword='+encodeURIComponent('测试'))
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                animeId=res.body.data.content[0]._id;
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
        //start
        it('POST /anime-group/', function (done) {
            app.post(path)
            .send({
                animeId:animeId,
                type:1,
                episodeStart:1,
                episodeTotal:30
            })
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                animeGroupId=res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/', function (done) {
            app.get(path+'?animeId='+animeId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0]._id!==animeGroupId) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/ids/', function (done) {
            app.get(path+'ids/?ids='+animeGroupId)
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.length!==1) throw new Error('验证不符合预期');
                if(res.body.data[0]._id!==animeGroupId) throw new Error('验证不符合预期');
                if(res.body.data[0].episode_cur!==0) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/:id', function (done) {
            app.get(path+animeGroupId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.anime_id!==animeId) throw new Error('验证不符合预期');
                if(res.body.data.type!==1) throw new Error('验证不符合预期');
                if(res.body.data.episode_total!==30) throw new Error('验证不符合预期');
                if(res.body.data.episode_cur!==0) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/task', function (done) {
            app.post(path+'task/')
            .send({
                groupId:animeGroupId,
                url:'http://bangumi.bilibili.com/anime/5523',
                taskPeriod:4
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/task/group/:id', function (done) {
            app.get(path+'task/group/'+animeGroupId)
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.url!=='http://bangumi.bilibili.com/anime/5523') throw new Error('验证不符合预期');
                if(res.body.data.group_id!==animeGroupId) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/task', function (done) {
            app.get(path+'task/?taskPeriod=4')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].url!=='http://bangumi.bilibili.com/anime/5523') throw new Error('验证不符合预期');
                if(res.body.data.content[0].group_id!==animeGroupId) throw new Error('验证不符合预期');
                animeGroupTaskId=res.body.data.content[0]._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/task/:id', function (done) {
            app.get(path+'task/'+animeGroupTaskId)
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.url!=='http://bangumi.bilibili.com/anime/5523') throw new Error('验证不符合预期');
                if(res.body.data.group_id!==animeGroupId) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/:id', function (done) {
            app.put(path+animeGroupId)
            .send({
                episodeStart:2,
                episodeTotal:32,
                episodeCur:1,
                status:-1
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/:id again', function (done) {
            app.get(path+animeGroupId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.anime_id!==animeId) throw new Error('验证不符合预期');
                if(res.body.data.type!==1) throw new Error('验证不符合预期');
                if(res.body.data.episode_start!==2) throw new Error('验证不符合预期');
                if(res.body.data.episode_total!==32) throw new Error('验证不符合预期');
                if(res.body.data.episode_cur!==1) throw new Error('验证不符合预期');
                if(res.body.data.status!==-1) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/task/:id', function (done) {
            app.put(path+'task/'+animeGroupTaskId)
            .send({
                url:'http://bangumi.bilibili.com/anime/5523',
                taskPeriod:4,
                taskStatus:0
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/item', function (done) {
            app.post(path+'item/')
            .send({
                groupId:animeGroupId,
                url:'http://bangumi.bilibili.com/anime/v/96644',
                episodeNo:1,
                episodeName:'桐山零 / 河边的小镇'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/item', function (done) {
            app.get(path+'item/?groupId='+animeGroupId)
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].episode_no!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].episode_name!=='桐山零 / 河边的小镇') throw new Error('验证不符合预期');
                animeGroupItemId=res.body.data.content[0]._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/item/:id', function (done) {
            app.get(path+'item/'+animeGroupItemId)
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.episode_no!==1) throw new Error('验证不符合预期');
                if(res.body.data.episode_name!=='桐山零 / 河边的小镇') throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/:id to comfirm episode_cur', function (done) {
            app.get(path+animeGroupId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.anime_id!==animeId) throw new Error('验证不符合预期');
                if(res.body.data.type!==1) throw new Error('验证不符合预期');
                if(res.body.data.episode_total!==32) throw new Error('验证不符合预期');
                if(res.body.data.episode_cur!==1) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/item/:id', function (done) {
            app.put(path+'item/'+animeGroupItemId)
            .send({
                url:'http://bangumi.bilibili.com/anime/v/96645',
                episodeNo:2,
                episodeName:'桐山零 / 河边的小镇'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/item/:id', function (done) {
            app.put(path+'item/'+animeGroupItemId)
            .send({
                episodeName:'桐山零 / 河边的小镇2'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/item', function (done) {
            app.get(path+'item/?groupId='+animeGroupId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].episode_no!==2) throw new Error('验证不符合预期');
                if(res.body.data.content[0].episode_name!=='桐山零 / 河边的小镇2') throw new Error('验证不符合预期');
                animeGroupItemId=res.body.data.content[0]._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/:id to comfirm episode_cur', function (done) {
            app.get(path+animeGroupId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.anime_id!==animeId) throw new Error('验证不符合预期');
                if(res.body.data.type!==1) throw new Error('验证不符合预期');
                if(res.body.data.episode_total!==32) throw new Error('验证不符合预期');
                if(res.body.data.episode_cur!==2) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/item', function (done) {
            app.post(path+'item/')
            .send({
                groupId:animeGroupId,
                url:'http://bangumi.bilibili.com/anime/v/96646',
                episodeNo:5,
                episodeName:'桐山零 / 河边的小镇'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/:id to comfirm episode_cur', function (done) {
            app.get(path+animeGroupId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.anime_id!==animeId) throw new Error('验证不符合预期');
                if(res.body.data.type!==1) throw new Error('验证不符合预期');
                if(res.body.data.episode_total!==32) throw new Error('验证不符合预期');
                if(res.body.data.episode_cur!==5) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/', function (done) {
            app.post(path)
            .send({
                animeId:animeId,
                type:2,
                episodeTotal:30,
                episodeStart:1
            })
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                animeGroupCacheId=res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/task', function (done) {
            app.post(path+'task/')
            .send({
                groupId:animeGroupCacheId,
                url:'http://www.dilidili.com/anime/selector/',
                taskPeriod:4
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/item', function (done) {
            app.post(path+'item/')
            .send({
                groupId:animeGroupCacheId,
                url:'http://www.dilidili.com/watch/9076/',
                episodeNo:1,
                episodeName:'「这个奇迹让人有些恐惧」'
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
        it('GET /anime-group/item', function (done) {
            app.get(path+'item/?groupId='+animeGroupCacheId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].episode_no!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].episode_name!=='「这个奇迹让人有些恐惧」') throw new Error('验证不符合预期');

            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/', function (done) {
            app.post(path)
            .send({
                animeId:animeId,
                type:3,
                episodeTotal:30,
                episodeStart:1
            })
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                animeGroupCacheId=res.body.data._id;
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/item', function (done) {
            app.post(path+'item/')
            .send({
                groupId:animeGroupCacheId,
                url:'http://www.iqiyi.com/dongman/20121126/02e0cda200ae32bb.html',
                episodeNo:1,
                episodeName:'王子现身'
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
        it('GET /anime-group/item', function (done) {
            app.get(path+'item/?groupId='+animeGroupCacheId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].episode_no!==1) throw new Error('验证不符合预期');
                if(res.body.data.content[0].episode_name!=='王子现身') throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/item', function (done) {
            app.post(path+'item/')
            .send({
                groupId:animeGroupCacheId,
                url:'http://www.iqiyi.com/dongman/20121126/bb1358e9b1ba0c1a.html',
                episodeNo:2,
                episodeName:'武士第二代'
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
        it('GET /anime-group/item', function (done) {
            app.get(path+'item/?groupId='+animeGroupCacheId)
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==2) throw new Error('验证不符合预期');
                res.body.data.content.forEach(function(content){
                    animeGroupItemWatchIds.push(content._id);
                })
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/watch/', function (done) {
            app.post(path+'watch/')
            .send({
                groupId:animeGroupCacheId,
                groupItemId:animeGroupItemWatchIds[0]
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
        it('POST /anime-group/watch/ again', function (done) {
            app.post(path+'watch/')
            .send({
                groupId:animeGroupCacheId,
                groupItemId:animeGroupItemWatchIds[1]
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
        it('POST /anime-group/watch/ with prev groupItemId', function (done) {
            app.post(path+'watch/')
            .send({
                groupId:animeGroupCacheId,
                groupItemId:animeGroupItemWatchIds[0]
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
        it('GET /anime-group/watch/me', function (done) {
            app.get(path+'watch/me')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.length!==1) throw new Error('验证不符合预期');
                if(res.body.data[0].group_id!==animeGroupCacheId) throw new Error('验证不符合预期');
                if(res.body.data[0].watch_ep!==1) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime/sub/:id', function (done) {
            app.put('/api/v1/anime/sub/'+animeId)
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
            app.get('/api/v1/anime/sub/me')
            .set(apiLoginTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.length!==1) throw new Error('验证不符合预期');
                if(res.body.data[0].name!=='测试动画') throw new Error('验证不符合预期');
                if(res.body.data[0].cover!=='5885b320a1763a717629bac3-1485226800898.jpg') throw new Error('验证不符合预期');
                let curClip=[1,2,3,5];
                let validResult=res.body.data[0].cover_clip.every(function(clip,index){
                    return clip===curClip[index];
                })
                if(!validResult) throw new Error('验证不符合预期');
                if(res.body.data[0].show_status!==1) throw new Error('验证不符合预期');
                if(res.body.data[0].public_status!==1) throw new Error('验证不符合预期');
                if(res.body.data[0].groups.length!==2) throw new Error('验证不符合预期');
                if(!res.body.data[0].update_at) throw new Error('验证不符合预期');
                let epNo=[1,2];
                let validGroupResult=res.body.data[0].groups.every(function(group,index){
                    return group.episode_cur===epNo[index];
                });
                if(!validGroupResult) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        //Error test
        it('POST /anime-group/ again', function (done) {
            app.post(path)
            .send({
                animeId:animeId,
                type:1,
                episodeTotal:30,
                episodeStart:1
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
        it('POST /anime-group/ without animeId', function (done) {
            app.post(path)
            .send({
                type:1,
                episodeTotal:30
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
        it('POST /anime-group/ with wrong animeId', function (done) {
            app.post(path)
            .send({
                animeId:'test',
                type:1,
                episodeTotal:30
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
        it('POST /anime-group/ with inexistence animeId', function (done) {
            app.post(path)
            .send({
                animeId:'58297d95e7aaf218604a8d0f',
                type:1,
                episodeTotal:30
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
        it('POST /anime-group/ without type', function (done) {
            app.post(path)
            .send({
                animeId:animeId,
                episodeTotal:30
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
        it('POST /anime-group/ with wrong type', function (done) {
            app.post(path)
            .send({
                animeId:animeId,
                type:'test',
                episodeTotal:30
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
        it('POST /anime-group/ without episodeTotal', function (done) {
            app.post(path)
            .send({
                animeId:animeId,
                type:1
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
        it('POST /anime-group/ with wrong episodeTotal', function (done) {
            app.post(path)
            .send({
                animeId:animeId,
                type:1,
                episodeTotal:-1
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
        it('GET /anime-group/ without animeId', function (done) {
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
        it('GET /anime-group/ with wrong animeId', function (done) {
            app.get(path+'?animeId=test')
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
        it('GET /anime-group/ with inexistence animeId', function (done) {
            app.get(path+'?animeId=58297d95e7aaf218604a8d0f')
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
        it('GET /anime-group/ids/ without ids', function (done) {
            app.get(path+'ids/')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/ids/ with wrong id', function (done) {
            app.get(path+'ids/?ids=test')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/ids/ with inexistence id', function (done) {
            app.get(path+'ids/?ids=58297d95e7aaf218604a8d0f')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.length!==0) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/task again', function (done) {
            app.post(path+'task/')
            .send({
                groupId:animeGroupId,
                url:'http://bangumi.bilibili.com/anime/5524',
                taskPeriod:4
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/task without group id', function (done) {
            app.post(path+'task/')
            .send({
                url:'http://bangumi.bilibili.com/anime/5523',
                taskPeriod:4
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/task with wrong group id', function (done) {
            app.post(path+'task/')
            .send({
                groupId:'test',
                url:'http://bangumi.bilibili.com/anime/5523',
                taskPeriod:4
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/task with inexistence group id', function (done) {
            app.post(path+'task/')
            .send({
                groupId:'58297d95e7aaf218604a8d0f',
                url:'http://bangumi.bilibili.com/anime/5523',
                taskPeriod:4
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/task without url', function (done) {
            app.post(path+'task/')
            .send({
                groupId:animeGroupCacheId,
                taskPeriod:4
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/task with wrong url', function (done) {
            app.post(path+'task/')
            .send({
                groupId:animeGroupCacheId,
                url:'http://bangumi.bilibili.com/anime/test',
                taskPeriod:4
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/task without taskPeriod', function (done) {
            app.post(path+'task/')
            .send({
                groupId:animeGroupId,
                url:'http://bangumi.bilibili.com/anime/5432'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/task with wrong taskPeriod', function (done) {
            app.post(path+'task/')
            .send({
                groupId:animeGroupId,
                url:'http://bangumi.bilibili.com/anime/5432',
                taskPeriod:'test'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/task/group/:id with wrong ID', function (done) {
            app.get(path+'task/group/test')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/task/group/:id with inexistence ID', function (done) {
            app.get(path+'task/group/58297d95e7aaf218604a8d0f')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/task', function (done) {
            app.get(path+'task/?taskPeriod=1')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==0) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/task without taskPeriod', function (done) {
            app.get(path+'task/')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/task with wrong taskPeriod', function (done) {
            app.get(path+'task/?taskPeriod=test')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/task/:id with wrong ID', function (done) {
            app.get(path+'task/test')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/task/:id with inexistence ID', function (done) {
            app.get(path+'task/58297d95e7aaf218604a8d0f')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/:id with wrong status', function (done) {
            app.put(path+animeGroupId)
            .send({
                episodeTotal:32,
                episodeCur:1,
                status:0
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/:id with wrong animeGroupId', function (done) {
            app.put(path+'test')
            .send({
                episodeTotal:32,
                episodeCur:1,
                status:1
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/:id with inexistence animeGroupId', function (done) {
            app.put(path+'58297d95e7aaf218604a8d0f')
            .send({
                episodeTotal:32,
                episodeCur:1,
                status:1
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/:id with wrong id', function (done) {
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
        it('GET /anime-group/:id with inexistence id', function (done) {
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
        it('PUT /anime-group/task/:id with wrong animeGroupTaskId', function (done) {
            app.put(path+'task/test')
            .send({
                taskStatus:1
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/task/:id with inexistence animeGroupTaskId', function (done) {
            app.put(path+'task/58297d95e7aaf218604a8d0f')
            .send({
                taskStatus:1
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/task/:id with wrong taskStatus', function (done) {
            app.put(path+'task/'+animeGroupTaskId)
            .set(apiAdminTokenParams)
            .send({
                url:'http://bangumi.bilibili.com/anime/5523',
                taskPeriod:4,
                taskStatus:7
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
        it('PUT /anime-group/task/:id with wrong taskPeriod', function (done) {
            app.put(path+'task/'+animeGroupTaskId)
            .send({
                url:'http://bangumi.bilibili.com/anime/5523',
                taskPeriod:10,
                taskStatus:1
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/item/:id with wrong ID', function (done) {
            app.get(path+'item/test')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/item/:id with inexistence ID', function (done) {
            app.get(path+'item/58297d95e7aaf218604a8d0f')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/item without groupId', function (done) {
            app.post(path+'item/')
            .send({
                url:'http://bangumi.bilibili.com/anime/v/96644',
                episodeNo:1,
                episodeName:'桐山零 / 河边的小镇'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/item with wrong groupId', function (done) {
            app.post(path+'item/')
            .send({
                groupId:'test',
                url:'http://bangumi.bilibili.com/anime/v/96644',
                episodeNo:1,
                episodeName:'桐山零 / 河边的小镇'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/item with inexistence groupId', function (done) {
            app.post(path+'item/')
            .send({
                groupId:'58297d95e7aaf218604a8d0f',
                url:'http://bangumi.bilibili.com/anime/v/96644',
                episodeNo:1,
                episodeName:'桐山零 / 河边的小镇'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/item with exist groupId & episodeNo', function (done) {
            app.post(path+'item/')
            .send({
                groupId:animeGroupId,
                url:'http://bangumi.bilibili.com/anime/v/96644',
                episodeNo:2,
                episodeName:'桐山零 / 河边的小镇'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/item with wrong url', function (done) {
            app.post(path+'item/')
            .send({
                groupId:animeGroupId,
                url:'http://bangumi.bilibili.com/anime/v/test',
                episodeNo:1,
                episodeName:'桐山零 / 河边的小镇2'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/item with empty epNo', function (done) {
            app.post(path+'item/')
            .send({
                groupId:animeGroupId,
                url:'http://bangumi.bilibili.com/anime/v/96644',
                episodeName:'桐山零 / 河边的小镇'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/item/:id with wrong ID', function (done) {
            app.put(path+'item/test')
            .send({
                url:'http://bangumi.bilibili.com/anime/v/96645',
                episodeName:'桐山零 / 河边的小镇2'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/item/:id with inexistence ID', function (done) {
            app.put(path+'item/58297d95e7aaf218604a8d0f')
            .send({
                url:'http://bangumi.bilibili.com/anime/v/96645',
                episodeName:'桐山零 / 河边的小镇2'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/item/:id with exist epNo', function (done) {
            app.put(path+'item/'+animeGroupItemId)
            .send({
                url:'http://bangumi.bilibili.com/anime/v/96645',
                episodeNo:2,
                episodeName:'桐山零 / 河边的小镇2'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('PUT /anime-group/item/:id with wrong url', function (done) {
            app.put(path+'item/'+animeGroupItemId)
            .send({
                url:'http://bangumi.bilibili.com/anime/v/test'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/item without groupId', function (done) {
            app.get(path+'item/')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/item with wrong groupId', function (done) {
            app.get(path+'item/?groupId=test')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.ERROR) throw new Error('验证不符合预期');
                console.log(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('GET /anime-group/item with inexistence groupId', function (done) {
            app.get(path+'item/?groupId=58297d95e7aaf218604a8d0f')
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
                if(res.body.data.content.length!==0) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/item with wrong episodeNo', function (done) {
            app.post(path+'item/')
            .send({
                groupId:animeGroupId,
                url:'http://bangumi.bilibili.com/anime/v/96645',
                episodeNo:35,
                episodeName:'桐山零 / 河边的小镇3'
            })
            .set(apiAdminTokenParams)
            .expect(200)
            .expect(function(res){
                if(res.body.code!==STATUS_CODE.MONGO_ERROR) throw new Error('验证不符合预期');
            })
            .end(function(err,res){
                done(err);
            });
        })
        it('POST /anime-group/watch/ without groupId', function (done) {
            app.post(path+'watch/')
            .send({
                groupItemId:animeGroupItemWatchIds[1]
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
        it('POST /anime-group/watch/ with wrong groupId', function (done) {
            app.post(path+'watch/')
            .send({
                groupId:'test',
                groupItemId:animeGroupItemWatchIds[1]
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
        it('POST /anime-group/watch/ with inexistence groupId', function (done) {
            app.post(path+'watch/')
            .send({
                groupId:'58297d95e7aaf218604a8d0f',
                groupItemId:animeGroupItemWatchIds[1]
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
        it('POST /anime-group/watch/ without groupItemId', function (done) {
            app.post(path+'watch/')
            .send({
                groupId:animeGroupCacheId
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
        it('POST /anime-group/watch/ with wrong groupId', function (done) {
            app.post(path+'watch/')
            .send({
                groupId:animeGroupCacheId,
                groupItemId:'test'
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
        it('POST /anime-group/watch/ with inexistence groupId', function (done) {
            app.post(path+'watch/')
            .send({
                groupId:animeGroupCacheId,
                groupItemId:'58297d95e7aaf218604a8d0f'
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
        it('POST /anime-group/watch/ with mismatching groupItemId', function (done) {
            app.post(path+'watch/')
            .send({
                groupId:animeGroupId,
                groupItemId:animeGroupItemWatchIds[0]
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
    })
}