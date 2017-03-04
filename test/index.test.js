'use strict';
const nock = require('nock');
nock.enableNetConnect(); // 允许真实的网络连接
const app = require('../app');
const Model = require('../models');
const toolTest = require('./tool/');
const webTest = require('./web/');
const searchTest = require('./search/');
const apiV1Test = require('./api/v1/');
const initTest = require('./init/');
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
toolTest();
searchTest();
webTest(client);
apiV1Test(client);
initTest(client);
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
    initTest(client,true);
    describe('Redis', function(){
        it('Flush', function (done) {
            redisClient.keys(config.redisNamespace+':*')
            .then(function(data){
                return redisClient.del.apply(redisClient,data);
            }).then(function(delnum){
                done();
            }).catch(function(err){
                done(err);
            })
        })
    })
    initTest(client,true);
});