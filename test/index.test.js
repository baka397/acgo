'use strict';
const nock = require('nock');
nock.enableNetConnect(); // 允许真实的网络连接
const app = require('../app');
const Model = require('../models');
const webTest = require('./web/');
const searchTest = require('./search/');
const apiV1Test = require('./api/v1/');
const request = require('supertest');
const redisClient = require('../common/redis');
const config = require('../config/');
let client =request(app);
describe('Common', function(){
    it('GET 404 Page', function (done) {
        client.get('/404/')
        .expect(404)
        .end(function(err,res){
            done(err);
        });
    })
})
webTest(client);
searchTest();
apiV1Test(client);
describe('Clear', function(){
    describe('MongoDB', function(){
        Object.keys(Model).forEach(function(key){
            it(key, function (done) {
                Model[key].remove({}).then(function(result){
                    done();
                }).catch(function(err){
                    done(err);
                })
            })
        })
    })
    describe('Redis', function(){
        it('Flush', function (done) {
            Promise.all([redisClient.keys(config.redisNamespace+':*'),redisClient.keys('search:*')])
            .then(function(data){
                let keys=[].concat(data[0],data[1]);
                return redisClient.del.apply(redisClient,keys);
            }).then(function(delnum){
                done();
            }).catch(function(err){
                done(err);
            })
        })
    })
});