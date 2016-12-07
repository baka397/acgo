'use strict';
const nock = require('nock');
nock.enableNetConnect(); // 允许真实的网络连接
const app = require('../app');
const Model = require('../models');
const webTest = require('./web/');
const request = require('supertest');
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
describe('Clear', function(){
    describe('Drop', function(){
        it('app', function (done) {
            Model.App.remove({}).then(function(result){
                done();
            }).catch(function(err){
                done(err);
            })
        })
    })
});