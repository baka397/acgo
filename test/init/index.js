'use strict';
const STATUS_CODE = require('../../enums/status_code');
const redisClient = require('../../common/redis');
const config = require('../../config/');
module.exports=function(app,emptyTest){
    describe('/init/', function(){
        it('GET /search/', function (done) {
            app.get('/init/search/')
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        if(!emptyTest){
            it('Confirm init search result', function (done) {
                redisClient.keys(config.redisNamespace+':search:*')
                .then(function(result){
                    console.info(result);
                    if(result.length===0) throw new Error('搜索索引结果不符合预期');
                    done();
                }).catch(function(err){
                    done(err);
                })
            })
        }else{
            it('Confirm init search result', function (done) {
                redisClient.keys(config.redisNamespace+':search:*')
                .then(function(result){
                    if(result.length!==0) throw new Error('搜索索引结果不符合预期');
                    done();
                }).catch(function(err){
                    done(err);
                })
            })
        }
        it('GET /recommender/', function (done) {
            app.get('/init/recommender/')
            .expect(200)
            .expect(function(res){
                if(res.body.code!==200) throw new Error(res.body.msg);
            })
            .end(function(err,res){
                done(err);
            });
        })
        if(!emptyTest){
            it('Confirm init recommender result', function (done) {
                redisClient.keys(config.redisNamespace+':orc:*')
                .then(function(result){
                    console.info(result);
                    if(result.length===0) throw new Error('搜索索引结果不符合预期');
                    done();
                }).catch(function(err){
                    done(err);
                })
            })
        }else{
            it('Confirm init recommender result', function (done) {
                redisClient.keys(config.redisNamespace+':orc:*')
                .then(function(result){
                    if(result.length!==0) throw new Error('搜索索引结果不符合预期');
                    done();
                }).catch(function(err){
                    done(err);
                })
            })
        }
    })
}